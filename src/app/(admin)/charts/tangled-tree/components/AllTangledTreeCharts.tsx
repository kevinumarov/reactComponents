import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import { coffeeSurveyTreeData, coffeeSurveyJourneyData } from '../data'

interface TangledTreeChartProps {
  data: any
  width?: number
  height?: number
}

const TangledTreeChart = ({ data, width = 900, height = 600 }: TangledTreeChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Add zoom and pan functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', `translate(${margin.left},${margin.top}) ${event.transform}`)
      })

    svg.call(zoom)

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create hierarchy
    const root = d3.hierarchy(data)
    
    // Create tree layout
    const treeLayout = d3.tree<any>()
      .size([chartHeight, chartWidth])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)

    treeLayout(root)

    // Color scales
    const satisfactionColor = d3.scaleOrdinal()
      .domain(['high', 'medium', 'low'])
      .range(['#28a745', '#ffc107', '#dc3545'])

    const depthColor = d3.scaleOrdinal(d3.schemeCategory10)

    // Create links with curves for tangled effect
    const links = g.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        // Create curved paths for tangled tree effect
        const sourceX = d.source.y
        const sourceY = d.source.x
        const targetX = d.target.y
        const targetY = d.target.x
        
        // Add some curve based on depth difference
        const midX = (sourceX + targetX) / 2
        const curve = Math.abs(targetY - sourceY) * 0.3
        
        return `M${sourceX},${sourceY}
                C${midX + curve},${sourceY}
                 ${midX + curve},${targetY}
                 ${targetX},${targetY}`
      })
      .style('fill', 'none')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d: any) => {
        // Thicker lines for nodes with higher values
        const value = d.target.data.value || 10
        return Math.max(1, Math.sqrt(value) / 5)
      })

    // Add nodes
    const nodes = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')

    // Add circles for nodes
    nodes.append('circle')
      .attr('r', (d: any) => {
        if (d.data.value) {
          return Math.max(4, Math.sqrt(d.data.value) / 3)
        }
        return d.children ? 8 : 6
      })
      .style('fill', (d: any) => {
        if (d.data.satisfaction) {
          return satisfactionColor(d.data.satisfaction) as string
        }
        return depthColor(d.depth.toString()) as string
      })
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .on('mouseover', function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (d: any) => {
            const currentRadius = d.data.value ? Math.max(4, Math.sqrt(d.data.value) / 3) : (d.children ? 8 : 6)
            return currentRadius * 1.5
          })
        
        // Create tooltip
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tangled-tree-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '10px 12px')
          .style('border-radius', '6px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .style('box-shadow', '0 4px 8px rgba(0,0,0,0.3)')
          .html(() => {
            let content = `<strong>${d.data.name}</strong>`
            if (d.data.value) {
              content += `<br/>Value: <span style="color: #4fc3f7">${d.data.value}</span>`
            }
            if (d.data.satisfaction) {
              const satisfactionText = d.data.satisfaction.charAt(0).toUpperCase() + d.data.satisfaction.slice(1)
              content += `<br/>Satisfaction: <span style="color: ${satisfactionColor(d.data.satisfaction)}">${satisfactionText}</span>`
            }
            if (d.children) {
              content += `<br/>Children: ${d.children.length}`
            }
            return content
          })
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
      })
      .on('mouseout', function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (d: any) => {
            if (d.data.value) {
              return Math.max(4, Math.sqrt(d.data.value) / 3)
            }
            return d.children ? 8 : 6
          })
        
        d3.selectAll('.tangled-tree-tooltip').remove()
      })

    // Add labels
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => d.children ? -12 : 12)
      .style('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .style('font-size', '11px')
      .style('font-family', 'system-ui, -apple-system, sans-serif')
      .style('font-weight', '500')
      .style('fill', '#333')
      .text((d: any) => {
        // Truncate long names
        const name = d.data.name
        return name.length > 15 ? name.substring(0, 12) + '...' : name
      })

    // Add value labels for leaf nodes
    nodes.filter((d: any) => d.data.value)
      .append('text')
      .attr('dy', '1.5em')
      .attr('x', (d: any) => d.children ? -12 : 12)
      .style('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .style('font-size', '9px')
      .style('font-family', 'system-ui, -apple-system, sans-serif')
      .style('fill', '#666')
      .text((d: any) => `(${d.data.value})`)

    // Add interactive features for links
    links
      .on('mouseover', function(event, d: any) {
        d3.select(this)
          .style('stroke-opacity', 1)
          .style('stroke', '#007bff')
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('stroke-opacity', 0.6)
          .style('stroke', '#999')
      })

  }, [data, width, height])

  return (
    <div className="d-flex justify-content-center">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          border: '1px solid #e9ecef', 
          borderRadius: '6px',
          background: '#fafafa'
        }}
      />
    </div>
  )
}

const SurveyResponseTree = () => {
  return (
    <ComponentContainerCard
      title="Coffee Survey Response Analysis Tree"
      description="Tangled tree visualization showing hierarchical relationships in coffee survey responses across respondents, cafe preferences, and satisfaction levels"
    >
      <TangledTreeChart data={coffeeSurveyTreeData} width={1400} height={700} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Legend:</strong> 
          <span className="badge bg-success ms-2 me-1">High Satisfaction</span>
          <span className="badge bg-warning me-1">Medium Satisfaction</span>
          <span className="badge bg-danger me-2">Low Satisfaction</span>
          <br />
          <em>Node size represents response volume. Hover for detailed information. Use mouse wheel to zoom, drag to pan.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const CustomerJourneyTree = () => {
  return (
    <ComponentContainerCard
      title="Coffee Survey Journey Tree Analysis"
      description="Interactive tangled tree showing the complete coffee survey journey from respondent identification to final preferences"
    >
      <TangledTreeChart data={coffeeSurveyJourneyData} width={1400} height={750} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Survey Journey:</strong> Respondents → Cafe Selection → Final Preferences
          <br />
          <em>Curved connections show the complex relationships in survey responses. Click and hover to explore. Use mouse wheel to zoom, drag to pan.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const AllTangledTreeCharts = () => {
  return (
    <>
      <SurveyResponseTree />
      <CustomerJourneyTree />
    </>
  )
}

export default AllTangledTreeCharts
