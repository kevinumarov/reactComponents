import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import { cafePreferenceSankeyData, coffeePreferenceSankeyData, locationVerificationSankeyData, realSurveyData, comprehensiveSurveyFlow } from '../data'

interface SankeyChartProps {
  data: any
  width?: number
  height?: number
  selectedRespondent?: string | null
  onRespondentClick?: (respondent: string | null) => void
}

const SankeyChart = ({ data, width = 900, height = 500, selectedRespondent, onRespondentClick }: SankeyChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  // Respondent → Color map
  const respondentColors: Record<string, string> = {
    '조남철': '#e41a1c',
    '한동주': '#377eb8',
    '이경능': '#4daf4a',
    '김안나': '#984ea3',
    '김민주': '#ff7f00',
    '유케빈': '#ffff33',
    '김영우': '#a65628',
    '하재훈': '#f781bf'
  }

  useEffect(() => {
    if (!svgRef.current) return

    // Clear
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const margin = { top: 60, right: 20, bottom: 20, left: 20 } // Adequate top margin for question headers only
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Sankey generator with proper node width for visibility
    const sankeyGenerator = sankey()
      .nodeWidth(20) // Wider nodes for better visibility and connection
      .nodePadding(12) // Balanced padding
      .extent([[10, 10], [chartWidth - 10, chartHeight - 10]]) // Better margins for connections
      .iterations(64) // More iterations for better layout

    // Map ids
    const nodeMap = new Map()
    data.nodes.forEach((node: any, i: number) => {
      nodeMap.set(node.id, i)
    })

    const processedData = {
      nodes: data.nodes.map((d: any) => ({ ...d })),
      links: data.links.map((d: any) => ({
        source: nodeMap.get(d.source),
        target: nodeMap.get(d.target),
        value: d.value,
        respondent: d.respondent // 👈 ensure dataset carries respondent field
      }))
    }

    const graph = sankeyGenerator(processedData)
    
    // Ensure all links have proper source and target coordinates for curves
    graph.links.forEach((link: any) => {
      if (!link.source.x1 || !link.target.x0) {
        console.warn('Link missing proper coordinates:', link)
      }
    })

    // Add question headers if available
    if (data.questionHeaders) {
      // Calculate column center positions based on all nodes in each category
      const columnCenters = new Map()
      const categoryNodes = new Map()
      
      // Group nodes by category
      graph.nodes.forEach((node: any) => {
        const category = data.nodes.find((n: any) => n.id === node.id)?.category
        if (category) {
          if (!categoryNodes.has(category)) {
            categoryNodes.set(category, [])
          }
          categoryNodes.get(category).push(node)
        }
      })
      
      // Calculate center position for each category column
      categoryNodes.forEach((nodes, category) => {
        if (nodes.length > 0) {
          // Use the center of the node width for proper alignment
          const centerX = nodes[0].x0 + (nodes[0].x1 - nodes[0].x0) / 2
          columnCenters.set(category, centerX)
        }
      })

      // Map categories to positions
      const categoryToPosition = {
        'respondent': 0,
        'cafe': 1,
        'location': 2,
        'coffee': 3,
        'dessert': 4
      }

      // Draw question headers
      data.questionHeaders.forEach((header: any) => {
        const category = Object.keys(categoryToPosition).find(key => 
          categoryToPosition[key as keyof typeof categoryToPosition] === header.position
        )
        
        if (category && columnCenters.has(category)) {
          const centerX = columnCenters.get(category)
          
          // Main question title only (no subtitle)
          g.append('text')
            .attr('x', centerX) // Center on column
            .attr('y', -25) // Positioned closer since no subtitle
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('font-weight', '600')
            .style('fill', '#333')
            .text(header.title.length > 30 ? header.title.substring(0, 30) + '...' : header.title)
        }
      })
    }

    // Calculate link overlap counts for opacity adjustment
    const linkOverlapCounts = new Map()
    graph.links.forEach((link: any) => {
      const key = `${link.source.id}-${link.target.id}`
      linkOverlapCounts.set(key, (linkOverlapCounts.get(key) || 0) + 1)
    })

    // Use the standard Sankey link generator for traditional straight connections
    const linkGenerator = sankeyLinkHorizontal()

    // First draw background Sankey structure in neutral color
    g.append('g')
      .selectAll('path.background-link')
      .data(graph.links)
      .join('path')
      .attr('class', 'background-link')
      .attr('d', linkGenerator)
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', (d: any) => Math.max(1, d.width))
      .attr('stroke-opacity', 0.4)
      .attr('fill', 'none')
      .style('cursor', 'pointer')
      .on('mouseover', function(_event: any, d: any) {
        // Highlight the respondent's complete flow on hover
        if (d.respondent) {
          g.selectAll(`.respondent-${d.respondent}`)
            .attr('stroke-opacity', 0.9)
            .attr('stroke-width', (linkData: any) => Math.max(4, linkData.width + 1))
        }
      })
      .on('mouseout', function(_event: any, d: any) {
        // Reset all respondent flows
        if (d.respondent) {
          g.selectAll(`.respondent-${d.respondent}`)
            .attr('stroke-opacity', selectedRespondent ? 
              (selectedRespondent === d.respondent ? 0.9 : 0.1) : 0.7)
            .attr('stroke-width', (linkData: any) => Math.max(3, linkData.width))
        }
      })

    // Draw individual respondent flows with proper Sankey thickness
    Object.keys(respondentColors).forEach(respondent => {
      if (data.journeys && data.journeys[respondent]) {
        const respondentLinks = graph.links.filter((link: any) => link.respondent === respondent)
        const respondentColor = respondentColors[respondent]
        
        // Draw each link with proper thickness
        respondentLinks.forEach((link: any) => {
          g.append('path')
            .attr('class', `respondent-link respondent-${respondent}`)
            .attr('d', linkGenerator(link))
            .attr('stroke', respondentColor)
            .attr('stroke-width', Math.max(2, link.width)) // Use the actual link width
            .attr('stroke-opacity', selectedRespondent ? 
              (selectedRespondent === respondent ? 0.8 : 0.1) : 0.6)
            .attr('fill', 'none')
            .style('pointer-events', 'none')
        })
      }
    })

    // Update flow visibility based on selection
    const updateFlowVisibility = () => {
      Object.keys(respondentColors).forEach(respondent => {
        g.selectAll(`.respondent-${respondent}`)
          .attr('stroke-opacity', selectedRespondent ? 
            (selectedRespondent === respondent ? 0.9 : 0.1) : 0.7)
      })
    }

    // Call update function
    updateFlowVisibility()

    // --- CONNECTION TRACING (30% opacity line) ---
    if (selectedRespondent && data.journeys && data.journeys[selectedRespondent]) {
      const respondentColor = respondentColors[selectedRespondent]
      
      if (respondentColor) {
        // Find the actual links for this respondent's journey
        const journeyLinks = graph.links.filter((link: any) => 
          link.respondent === selectedRespondent
        )
        
        // Draw tracing lines using the same link generator
        journeyLinks.forEach((link: any) => {
          // Draw the tracing line following the exact Sankey curve
          g.append('path')
            .datum(link)
            .attr('class', 'connection-trace')
            .attr('d', linkGenerator)
            .attr('stroke', respondentColor)
            .attr('stroke-opacity', 0.3) // Tracing line opacity
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .style('pointer-events', 'none')
            .style('stroke-dasharray', '5,3') // Dashed line for distinction
        })
      }
    }

    // --- NODES ---
    g.append('g')
      .selectAll('rect')
      .data(graph.nodes)
      .join('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('rx', 3) // Rounded corners for modern look
      .attr('ry', 3)
      .attr('fill', (d: any) =>
        respondentColors[d.id] ? respondentColors[d.id] : '#999'
      )
      .attr('fill-opacity', (d: any) => {
        if (!selectedRespondent) return 1
        if (data.journeys && data.journeys[selectedRespondent]) {
          return data.journeys[selectedRespondent].includes(d.id) ? 1 : 0.3
        }
        return d.id === selectedRespondent ? 1 : 0.3
      })
      .attr('stroke', (d: any) => {
        // Add subtle border for better definition
        if (selectedRespondent && data.journeys && data.journeys[selectedRespondent]) {
          return data.journeys[selectedRespondent].includes(d.id) ? '#333' : 'transparent'
        }
        return 'transparent'
      })
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease') // Smooth transitions
      .on('click', (_event, d: any) => {
        if (respondentColors[d.id] && onRespondentClick) {
          onRespondentClick(selectedRespondent === d.id ? null : d.id)
        }
      })
      .on('mouseover', function(_event, d: any) {
        if (respondentColors[d.id]) {
          d3.select(this)
            .attr('stroke', '#333')
            .attr('stroke-width', 2)
        }
      })
      .on('mouseout', function(_event, d: any) {
        d3.select(this)
          .attr('stroke', () => {
            if (selectedRespondent && data.journeys && data.journeys[selectedRespondent]) {
              return data.journeys[selectedRespondent].includes(d.id) ? '#333' : 'transparent'
            }
            return 'transparent'
          })
          .attr('stroke-width', 1)
      })

    // --- LABELS ---
    g.append('g')
      .selectAll('text')
      .data(graph.nodes)
      .join('text')
      .attr('x', (d: any) => d.x0 < chartWidth / 2 ? d.x1 + 8 : d.x0 - 8)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < chartWidth / 2 ? 'start' : 'end')
      .text((d: any) => d.id)
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('fill', '#333')
      .style('text-shadow', '0 0 3px rgba(255,255,255,0.8)') // Better readability
  }, [data, width, height, selectedRespondent, onRespondentClick])

  return (
    <div className="d-flex justify-content-center">
      <svg ref={svgRef} width={width} height={height} />
    </div>
  )
}

const ComprehensiveSurveyFlow = () => {
  const [selectedRespondent, setSelectedRespondent] = useState<string | null>(null)
  
  const respondentColors = [
    { name: '조남철', color: '#e41a1c' },
    { name: '한동주', color: '#377eb8' },
    { name: '이경능', color: '#4daf4a' },
    { name: '김안나', color: '#984ea3' },
    { name: '김민주', color: '#ff7f00' },
    { name: '유케빈', color: '#ffff33' },
    { name: '김영우', color: '#a65628' },
    { name: '하재훈', color: '#f781bf' }
  ]

  return (
    <ComponentContainerCard
      id="comprehensive-survey-flow"
      title="Complete Survey Flow: All 5 Questions Connected"
      description="Traditional Sankey diagram showing the complete journey from respondents through all survey questions: Who → Cafe → Location → Coffee → Dessert Rating"
    >
      <SankeyChart 
        data={comprehensiveSurveyFlow} 
        width={1300} 
        height={900} 
        selectedRespondent={selectedRespondent}
        onRespondentClick={setSelectedRespondent}
      />
      
      {/* Color Legend for Respondents */}
      <div className="mt-4 d-flex justify-content-center">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-light">
            <h6 className="mb-0 fw-semibold text-center">Respondent Color Guide</h6>
          </div>
          <div className="card-body">
            <div className="row">
              {respondentColors.map((respondent, index) => (
                <div key={index} className="col-md-3 col-sm-6 mb-2">
                  <div className="d-flex align-items-center">
                    <div 
                      className="me-2" 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        backgroundColor: respondent.color,
                        borderRadius: '3px',
                        border: '1px solid #ccc'
                      }}
                    ></div>
                    <span className="small fw-medium">{respondent.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Respondent Indicator */}
      {selectedRespondent && (
        <div className="mt-3 d-flex justify-content-center">
          <div className="alert alert-info d-flex align-items-center" role="alert">
            <div 
              className="me-2" 
              style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: (() => {
                  const colors = {
                    '조남철': '#e41a1c', '한동주': '#377eb8', '이경능': '#4daf4a', '김안나': '#984ea3',
                    '김민주': '#ff7f00', '유케빈': '#ffff33', '김영우': '#a65628', '하재훈': '#f781bf'
                  }
                  return colors[selectedRespondent as keyof typeof colors] || '#e41a1c'
                })(),
                borderRadius: '3px',
                border: '2px solid #333'
              }}
            ></div>
            <div>
              <strong>Following {selectedRespondent}'s Journey:</strong>
              <br />
              <span className="small">
                {comprehensiveSurveyFlow.journeys[selectedRespondent as keyof typeof comprehensiveSurveyFlow.journeys]?.join(' → ')}
              </span>
            </div>
            <button 
              className="btn btn-sm btn-outline-secondary ms-3"
              onClick={() => setSelectedRespondent(null)}
            >
              Show All
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Interactive Survey Journey:</strong> Click on any respondent's name (left side) to highlight their complete path
          <br />
          <em>Each person's journey flows from their name → cafe choice → location → coffee preference → dessert rating.</em>
          <br />
          <em>When selected, a 30% opacity tracing line shows their complete connection path.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const BasicSankeyChart = () => {
  return (
    <ComponentContainerCard
      id="cafe-preference-flow"
      title="Coffee Survey: Respondent → Cafe → Coffee Preference Flow"
      description="Real survey data showing how 8 respondents flow from individual preferences to cafe choices to coffee selections"
    >
      <SankeyChart data={cafePreferenceSankeyData} width={800} height={400} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Cafe Preference Analysis:</strong> Shows how respondents choose cafes and their coffee preferences
          <br />
          <em>Data flows from individual respondents through their cafe choices to coffee selections.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const CustomerJourneySankey = () => {
  return (
    <ComponentContainerCard
      id="coffee-dessert-analysis"
      title="Coffee Preferences → Dessert Ratings Analysis"
      description="Analysis showing relationship between coffee preferences and dessert rating scores from the survey"
    >
      <SankeyChart data={coffeePreferenceSankeyData} width={800} height={400} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Coffee-Dessert Correlation:</strong> Analyzes how coffee preferences relate to dessert ratings
          <br />
          <em>Shows the flow from coffee choices to dessert satisfaction scores.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const LocationVerificationFlow = () => {
  return (
    <ComponentContainerCard
      id="location-verification-flow"
      title="Location Verification → Cafe Selection"
      description="Simple flow showing how location verification (Geumcheongu) leads to cafe preferences"
    >
      <SankeyChart data={locationVerificationSankeyData} width={800} height={300} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Location-Based Flow:</strong> All respondents verified Geumcheongu location before cafe selection
          <br />
          <em>Shows the distribution from location verification to cafe preferences.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const SurveyDataSummary = () => {
  return (
    <ComponentContainerCard
      id="survey-data-summary"
      title="Original Survey Data Summary"
      description="Raw survey data showing questions, options, counts and percentages"
    >
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Question</th>
              <th>Option</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {realSurveyData.map((question, qIndex) => 
              question.options
                .filter(option => option.label !== '전체')
                .map((option, oIndex) => (
                  <tr key={`${qIndex}-${oIndex}`}>
                    {oIndex === 0 && (
                      <td rowSpan={question.options.filter(opt => opt.label !== '전체').length} className="align-middle fw-medium">
                        {question.question}
                      </td>
                    )}
                    <td>{option.label}</td>
                    <td>
                      <span className="badge bg-primary">{option.count}</span>
                    </td>
                    <td>{option.percentage}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </ComponentContainerCard>
  )
}

const AllSankeyCharts = () => {
  return (
    <>
      <ComprehensiveSurveyFlow />
      <BasicSankeyChart />
      <CustomerJourneySankey />
      <LocationVerificationFlow />
      <SurveyDataSummary />
    </>
  )
}

export default AllSankeyCharts