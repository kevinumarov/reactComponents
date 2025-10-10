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
  onColumnReorder?: (newOrder: any[]) => void
  columnOrder?: any[]
  onPositionSelectorOpen?: () => void
}

const SankeyChart = ({ data, width = 900, height = 500, selectedRespondent, onRespondentClick, onColumnReorder, columnOrder, onPositionSelectorOpen }: SankeyChartProps) => {
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
    const margin = { top: 80, right: 20, bottom: 20, left: 20 } // Increased top margin for draggable headers
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add zoom and pan functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', `translate(${margin.left},${margin.top}) ${event.transform}`)
      })

    svg.call(zoom)

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

      // Create dynamic category to position mapping based on question headers
      const categoryToPosition: { [key: string]: number } = {}
      data.questionHeaders.forEach((header: any) => {
        // Find the category that matches this header position
        if (columnOrder) {
          const columnAtPosition = columnOrder[header.position]
          if (columnAtPosition) {
            categoryToPosition[columnAtPosition.category] = header.position
          }
        }
      })

      // Draw draggable question headers
      data.questionHeaders.forEach((header: any) => {
        // Find the category for this header position
        const category = columnOrder ? columnOrder[header.position]?.category : null
        
        if (category && columnCenters.has(category)) {
          const centerX = columnCenters.get(category)
          
          // Create a group for each header to enable dragging
          const headerGroup = g.append('g')
            .attr('class', `header-group header-${category}`)
            .attr('transform', `translate(${centerX}, -25)`)
            .style('cursor', onColumnReorder ? 'grab' : 'default')
          
          // Background rectangle for better drag target
          const headerBg = headerGroup.append('rect')
            .attr('x', -80)
            .attr('y', -20)
            .attr('width', 160)
            .attr('height', 35)
            .attr('rx', 6)
            .style('fill', 'rgba(59, 130, 246, 0.1)')
            .style('stroke', 'rgba(59, 130, 246, 0.3)')
            .style('stroke-width', 1)
            .style('opacity', onColumnReorder ? 0.9 : 0)
          
          // Main question title
          headerGroup.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('font-weight', '600')
            .style('fill', '#333')
            .style('pointer-events', 'none')
            .text(header.title.length > 30 ? header.title.substring(0, 30) + '...' : header.title)
          
          // Add drag behavior if callback is provided
          if (onColumnReorder && columnOrder) {
            let isDragging = false
            
            const drag = d3.drag<SVGGElement, unknown>()
              .on('start', function() {
                isDragging = true
                d3.select(this).style('cursor', 'grabbing')
                headerBg.style('opacity', 1).style('fill', 'rgba(59, 130, 246, 0.3)')
                
                // Add drop zone indicators
                g.selectAll('.drop-zone').remove()
                const currentIndex = columnOrder.findIndex(col => col.category === category)
                
                // Create drop zones between columns
                columnOrder.forEach((col, index) => {
                  if (index !== currentIndex) {
                    const colCategory = col.category
                    if (colCategory && columnCenters.has(colCategory)) {
                      const colCenterX = columnCenters.get(colCategory)
                      
                      // Add drop zone indicator
                      g.append('rect')
                        .attr('class', 'drop-zone')
                        .attr('x', colCenterX - 80)
                        .attr('y', -45)
                        .attr('width', 160)
                        .attr('height', 40)
                        .attr('rx', 8)
                        .style('fill', 'rgba(34, 197, 94, 0.2)')
                        .style('stroke', 'rgba(34, 197, 94, 0.5)')
                        .style('stroke-width', 2)
                        .style('stroke-dasharray', '5,5')
                        .style('opacity', 0.7)
                    }
                  }
                })
              })
              .on('drag', function(event) {
                if (!isDragging) return
                
                // Visual feedback during drag
                d3.select(this).attr('transform', `translate(${centerX + event.x}, ${-25})`)
                headerBg.style('fill', 'rgba(59, 130, 246, 0.4)')
                
                // Highlight potential drop zones based on current position
                const draggedX = centerX + event.x
                g.selectAll('.drop-zone')
                  .style('opacity', function() {
                    const rect = d3.select(this)
                    const zoneX = parseFloat(rect.attr('x')) + parseFloat(rect.attr('width')) / 2
                    const distance = Math.abs(draggedX - zoneX)
                    return distance < 100 ? 1 : 0.3
                  })
              })
              .on('end', function(event) {
                isDragging = false
                
                // Remove drop zones
                g.selectAll('.drop-zone').remove()
                
                // Reset visual state
                d3.select(this)
                  .style('cursor', 'grab')
                  .attr('transform', `translate(${centerX}, -25)`)
                headerBg.style('opacity', 0.8).style('fill', 'rgba(59, 130, 246, 0.1)')
                
                // Determine new position based on final drag position
                const dragDistance = event.x
                const threshold = 50 // Reduced threshold for better responsiveness
                
                if (Math.abs(dragDistance) > threshold) {
                  const currentIndex = columnOrder.findIndex(col => col.category === category)
                  const draggedX = centerX + dragDistance
                  
                  // Find the closest column position
                  let closestIndex = currentIndex
                  let minDistance = Infinity
                  
                  columnOrder.forEach((col, index) => {
                    if (index !== currentIndex) {
                      const colCategory = col.category
                      if (colCategory && columnCenters.has(colCategory)) {
                        const colCenterX = columnCenters.get(colCategory)
                        const distance = Math.abs(draggedX - colCenterX)
                        
                        if (distance < minDistance && distance < 150) {
                          minDistance = distance
                          closestIndex = index
                        }
                      }
                    }
                  })
                  
                  if (closestIndex !== currentIndex) {
                    // Create new order array
                    const newOrder = [...columnOrder]
                    const [movedItem] = newOrder.splice(currentIndex, 1)
                    newOrder.splice(closestIndex, 0, movedItem)
                    
                    // Call the reorder callback
                    onColumnReorder(newOrder)
                  }
                }
              })
            
            headerGroup.call(drag)
            
            // Add clickable visual indicator for draggable headers
            const dragHandle = headerGroup.append('g')
              .attr('class', 'drag-handle')
              .style('cursor', 'pointer')
            
            // Background for better click target
            dragHandle.append('rect')
              .attr('x', 60)
              .attr('y', -10)
              .attr('width', 20)
              .attr('height', 20)
              .attr('rx', 3)
              .style('fill', 'rgba(107, 114, 128, 0.1)')
              .style('stroke', 'rgba(107, 114, 128, 0.3)')
              .style('stroke-width', 1)
              .on('mouseover', function() {
                d3.select(this).style('fill', 'rgba(107, 114, 128, 0.2)')
              })
              .on('mouseout', function() {
                d3.select(this).style('fill', 'rgba(107, 114, 128, 0.1)')
              })
              .on('click', function(event) {
                event.stopPropagation()
                if (onPositionSelectorOpen) {
                  onPositionSelectorOpen()
                }
              })
            
            // Drag handle icon
            dragHandle.append('text')
              .attr('x', 70)
              .attr('y', 0)
              .attr('text-anchor', 'middle')
              .style('font-size', '12px')
              .style('fill', '#6b7280')
              .style('pointer-events', 'none')
              .text('⋮⋮')
            
            // Add instruction text
            headerGroup.append('text')
              .attr('x', 0)
              .attr('y', 15)
              .attr('text-anchor', 'middle')
              .style('font-size', '8px')
              .style('fill', '#9ca3af')
              .style('pointer-events', 'none')
              .text('Drag or click ⋮⋮')
          }
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
  const [showPositionSelector, setShowPositionSelector] = useState(false)
  const [tempColumnOrder, setTempColumnOrder] = useState<any[]>([])
  const [showJourneys, setShowJourneys] = useState(false)
  
  // Column order state - default order
  const [columnOrder, setColumnOrder] = useState([
    { id: 'respondent', title: 'Who are you?', category: 'respondent' },
    { id: 'cafe', title: 'Which Cafe would you like to go?', category: 'cafe' },
    { id: 'location', title: 'Please verify your location', category: 'location' },
    { id: 'coffee', title: 'Please select your favorite coffee', category: 'coffee' },
    { id: 'dessert', title: 'Would you like dessert?', category: 'dessert' }
  ])
  
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

  // Function to reorder data based on column order
  const reorderSankeyData = (originalData: any, newColumnOrder: any[]) => {
    // Create a visual indicator of the new order in the title
    const orderString = newColumnOrder.map(col => {
      switch(col.category) {
        case 'respondent': return 'Who'
        case 'cafe': return 'Cafe'
        case 'location': return 'Location'
        case 'coffee': return 'Coffee'
        case 'dessert': return 'Dessert'
        default: return col.category
      }
    }).join(' → ')

    // Update question headers to match new order with correct positions
    const reorderedHeaders = newColumnOrder.map((col, index) => ({
      title: col.title,
      subtitle: col.category,
      position: index
    }))

    // Rebuild the Sankey data structure based on new column order
    const journeyData = originalData.journeys
    const newNodes: any[] = []
    const newLinks: any[] = []
    
    // Create a mapping from category to new position
    const categoryToNewPosition: { [key: string]: number } = {}
    newColumnOrder.forEach((col, index) => {
      categoryToNewPosition[col.category] = index
    })
    
    // Collect all unique values for each category in the new order
    const nodesByNewPosition: { [key: number]: Set<string> } = {}
    
    // Initialize sets for each position
    newColumnOrder.forEach((_, index) => {
      nodesByNewPosition[index] = new Set()
    })
    
    // First pass: collect all unique values for each category
    Object.values(journeyData).forEach((journey: any) => {
      newColumnOrder.forEach((col, newPosition) => {
        let journeyValue = ''
        switch(col.category) {
          case 'respondent': journeyValue = journey[0]; break
          case 'cafe': journeyValue = journey[1]; break
          case 'location': journeyValue = journey[2]; break
          case 'coffee': journeyValue = journey[3]; break
          case 'dessert': journeyValue = journey[4]; break
        }
        
        if (journeyValue) {
          nodesByNewPosition[newPosition].add(journeyValue)
        }
      })
    })

    // Create nodes array with proper category assignment based on new positions
    newColumnOrder.forEach((col, newPosition) => {
      nodesByNewPosition[newPosition].forEach(value => {
        newNodes.push({
          id: value,
          category: col.category, // Keep original category for identification
          newPosition: newPosition // Add new position for layout
        })
      })
    })

    // Create links based on new column order (adjacent positions only)
    Object.entries(journeyData).forEach(([respondent, journey]: [string, any]) => {
      for (let i = 0; i < newColumnOrder.length - 1; i++) {
        const currentCol = newColumnOrder[i]
        const nextCol = newColumnOrder[i + 1]
        
        let sourceValue = ''
        let targetValue = ''
        
        // Get values for current and next positions
        switch(currentCol.category) {
          case 'respondent': sourceValue = journey[0]; break
          case 'cafe': sourceValue = journey[1]; break
          case 'location': sourceValue = journey[2]; break
          case 'coffee': sourceValue = journey[3]; break
          case 'dessert': sourceValue = journey[4]; break
        }
        
        switch(nextCol.category) {
          case 'respondent': targetValue = journey[0]; break
          case 'cafe': targetValue = journey[1]; break
          case 'location': targetValue = journey[2]; break
          case 'coffee': targetValue = journey[3]; break
          case 'dessert': targetValue = journey[4]; break
        }
        
        if (sourceValue && targetValue && sourceValue !== targetValue) {
          // Add individual link for respondent tracking
          newLinks.push({
            source: sourceValue,
            target: targetValue,
            value: 1,
            respondent: respondent
          })
        }
      }
    })

    return {
      nodes: newNodes,
      links: newLinks,
      journeys: journeyData,
      questionHeaders: reorderedHeaders,
      orderString: orderString
    }
  }

  // Function to move column up
  const moveColumnUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...columnOrder]
      const temp = newOrder[index]
      newOrder[index] = newOrder[index - 1]
      newOrder[index - 1] = temp
      setColumnOrder(newOrder)
    }
  }

  // Function to move column down
  const moveColumnDown = (index: number) => {
    if (index < columnOrder.length - 1) {
      const newOrder = [...columnOrder]
      const temp = newOrder[index]
      newOrder[index] = newOrder[index + 1]
      newOrder[index + 1] = temp
      setColumnOrder(newOrder)
    }
  }

  // Functions for position selector
  const openPositionSelector = () => {
    setTempColumnOrder([...columnOrder])
    setShowPositionSelector(true)
  }

  const updateTempPosition = (columnId: string, newPosition: number) => {
    const newOrder = [...tempColumnOrder]
    const columnIndex = newOrder.findIndex(col => col.id === columnId)
    
    if (columnIndex !== -1 && newPosition >= 1 && newPosition <= newOrder.length) {
      // Remove the column from its current position
      const [movedColumn] = newOrder.splice(columnIndex, 1)
      // Insert it at the new position (subtract 1 for 0-based indexing)
      newOrder.splice(newPosition - 1, 0, movedColumn)
      setTempColumnOrder(newOrder)
    }
  }

  const applyPositionChanges = () => {
    setColumnOrder([...tempColumnOrder])
    setShowPositionSelector(false)
  }

  const cancelPositionChanges = () => {
    setTempColumnOrder([])
    setShowPositionSelector(false)
  }

  // Function to calculate journey paths based on current column order
  const calculateJourneyPaths = (data: any, currentColumnOrder: any[]) => {
    const journeyData = data.journeys
    const journeyPaths: { [key: string]: { count: number, respondents: string[] } } = {}
    const totalJourneys = Object.keys(journeyData).length
    
    // Build journey paths based on current column order
    Object.entries(journeyData).forEach(([respondent, journey]: [string, any]) => {
      const pathSteps: string[] = []
      
      currentColumnOrder.forEach((col) => {
        let value = ''
        switch(col.category) {
          case 'respondent': value = journey[0]; break
          case 'cafe': value = journey[1]; break
          case 'location': value = journey[2]; break
          case 'coffee': value = journey[3]; break
          case 'dessert': value = journey[4]; break
        }
        if (value) {
          pathSteps.push(value)
        }
      })
      
      const pathKey = pathSteps.join(' → ')
      if (!journeyPaths[pathKey]) {
        journeyPaths[pathKey] = { count: 0, respondents: [] }
      }
      journeyPaths[pathKey].count++
      journeyPaths[pathKey].respondents.push(respondent)
    })
    
    // Sort by frequency and calculate percentages
    const sortedPaths = Object.entries(journeyPaths)
      .map(([path, data]) => ({
        path,
        count: data.count,
        respondents: data.respondents,
        percentage: ((data.count / totalJourneys) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4) // Top 4 paths
    
    return {
      totalJourneys,
      paths: sortedPaths,
      startingPoint: currentColumnOrder[0]?.title || 'Survey Start'
    }
  }

  // Get reordered data
  const reorderedData = reorderSankeyData(comprehensiveSurveyFlow, columnOrder)
  
  // Calculate current journey paths
  const journeyAnalysis = calculateJourneyPaths(comprehensiveSurveyFlow, columnOrder)

  return (
    <ComponentContainerCard
      id="comprehensive-survey-flow"
      title={`Complete Survey Flow: ${reorderedData.orderString}`}
      description="Interactive Sankey diagram showing the complete journey from respondents through all survey questions. Use the arrow controls above OR drag the question headers directly to reorder columns and see how the flow changes."
    >
      {/* Column Reordering Controls */}
      <div className="mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h6 className="mb-0 fw-semibold text-center">
              <i className="bi bi-arrows-move me-2"></i>
              Question Order Controls
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              {columnOrder.map((column, index) => (
                <div key={column.id} className="col-md-2 col-sm-4 col-6 mb-2">
                  <div className="card border h-100">
                    <div className="card-body p-2 text-center">
                      <div className="small fw-medium mb-1">Position {index + 1}</div>
                      <div className="small text-muted mb-2" style={{ fontSize: '0.75rem' }}>
                        {column.title.length > 25 ? column.title.substring(0, 25) + '...' : column.title}
                      </div>
                      <div className="btn-group-vertical" role="group">
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => moveColumnUp(index)}
                          disabled={index === 0}
                          title="Move Up"
                        >
                          <i className="bi bi-arrow-up"></i>
                        </button>
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => moveColumnDown(index)}
                          disabled={index === columnOrder.length - 1}
                          title="Move Down"
                        >
                          <i className="bi bi-arrow-down"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Use the arrow buttons to reorder questions, drag the blue headers, OR click the ⋮⋮ handles to open the position selector modal.
              </small>
            </div>
            
            <div className="text-center mt-3">
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowJourneys(true)}
              >
                <i className="bi bi-diagram-3 me-1"></i>
                Explore Journeys
              </button>
            </div>
          </div>
        </div>
      </div>

      <SankeyChart 
        data={reorderedData} 
        width={1300} 
        height={900} 
        selectedRespondent={selectedRespondent}
        onRespondentClick={setSelectedRespondent}
        onColumnReorder={setColumnOrder}
        columnOrder={columnOrder}
        onPositionSelectorOpen={openPositionSelector}
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

      {/* Position Selector Modal */}
      {showPositionSelector && (
        <div className="position-selector-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050
        }}>
          <div className="card shadow-lg" style={{ width: '500px', maxHeight: '80vh', overflow: 'auto' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-list-ol me-2"></i>
                Set Question Order
              </h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">
                Set the position number for each question. Position 1 will be leftmost, position 5 will be rightmost.
              </p>
              
              <div className="row g-3">
                {tempColumnOrder.map((column, index) => (
                  <div key={column.id} className="col-12">
                    <div className="card border">
                      <div className="card-body p-3">
                        <div className="row align-items-center">
                          <div className="col-8">
                            <h6 className="mb-1">{column.title}</h6>
                            <small className="text-muted">Current position: {index + 1}</small>
                          </div>
                          <div className="col-4">
                            <label className="form-label small">New Position:</label>
                            <select 
                              className="form-select form-select-sm"
                              value={index + 1}
                              onChange={(e) => updateTempPosition(column.id, parseInt(e.target.value))}
                            >
                              {[1, 2, 3, 4, 5].map(pos => (
                                <option key={pos} value={pos}>Position {pos}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-top">
                <div className="row">
                  <div className="col-6">
                    <button 
                      className="btn btn-secondary w-100"
                      onClick={cancelPositionChanges}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button 
                      className="btn btn-primary w-100"
                      onClick={applyPositionChanges}
                    >
                      <i className="bi bi-check-circle me-1"></i>
                      Apply Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Journeys Modal */}
      {showJourneys && (
        <div className="journeys-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050
        }}>
          <div className="card shadow-lg" style={{ width: '900px', maxHeight: '90vh', overflow: 'auto' }}>
            <div className="card-header bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0 fw-bold">User Journeys</h4>
                <button 
                  className="btn-close"
                  onClick={() => setShowJourneys(false)}
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <p className="text-muted mb-2">
                  Starting with <strong>{journeyAnalysis.startingPoint}</strong>
                </p>
                <p className="text-muted">
                  Showing <strong>top {journeyAnalysis.paths.length} paths</strong> taken <strong>{journeyAnalysis.totalJourneys} times</strong> sorted by frequency
                </p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-diagram-3 me-1"></i>
                    Explore Journeys
                  </button>
                </div>
              </div>

              <div className="journey-paths">
                {journeyAnalysis.paths.map((pathData, index) => {
                  const steps = pathData.path.split(' → ')
                  return (
                    <div key={index} className="journey-row mb-4 p-3 border rounded">
                      <div className="d-flex align-items-center mb-3">
                        <div className="journey-percentage me-4">
                          <div className="h4 mb-0 text-primary fw-bold">{pathData.percentage}%</div>
                          <div className="small text-muted">{pathData.count} times</div>
                        </div>
                        
                        <div className="journey-flow flex-grow-1">
                          <div className="d-flex align-items-center flex-wrap">
                            {steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="d-flex align-items-center">
                                <div 
                                  className="journey-step px-3 py-2 rounded me-2"
                                  style={{
                                    backgroundColor: `hsl(${(stepIndex * 60) % 360}, 70%, 85%)`,
                                    border: `1px solid hsl(${(stepIndex * 60) % 360}, 70%, 70%)`,
                                    fontSize: '0.875rem',
                                    fontWeight: '500'
                                  }}
                                >
                                  {step}
                                </div>
                                {stepIndex < steps.length - 1 && (
                                  <i className="bi bi-arrow-right text-muted me-2"></i>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="journey-respondents">
                        <small className="text-muted">
                          <strong>Respondents:</strong> {pathData.respondents.join(', ')}
                        </small>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-top">
                <div className="text-center">
                  <small className="text-muted">
                    Journey paths are calculated based on the current column order: <strong>{reorderedData.orderString}</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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