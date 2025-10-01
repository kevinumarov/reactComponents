import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import { coffeeSurveyHierarchyData, organizationalSurveyData, marketResearchTreeData } from '../data'

interface IndentedTreeChartProps {
  data: any
  width?: number
  height?: number
}

const IndentedTreeChart = ({ data, width = 800, height = 600 }: IndentedTreeChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const margin = { top: 20, right: 120, bottom: 20, left: 20 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Create hierarchy
    const root = d3.hierarchy(data)
    let i = 0
    
    // Assign unique IDs to each node
    root.eachBefore(d => (d as any).id = ++i)

    const dx = 25
    const dy = chartWidth / (root.height + 1)

    // Create tree layout
    const tree = d3.tree().nodeSize([dx, dy])
    tree(root)

    let x0 = Infinity
    let x1 = -x0
    root.each(d => {
      if (d.x > x1) x1 = d.x
      if (d.x < x0) x0 = d.x
    })

    const actualHeight = x1 - x0 + dx * 2

    svg.attr('width', width).attr('height', Math.max(actualHeight + margin.top + margin.bottom, height))

    const g = svg.append('g')
      .attr('font-family', 'system-ui, -apple-system, sans-serif')
      .attr('font-size', 12)
      .attr('transform', `translate(${margin.left},${margin.top - x0 + dx})`)

    // Color scale based on depth
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    
    // Size scale for values
    const maxValue = d3.max(root.descendants(), d => d.data.value) || 1
    const sizeScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([3, 12])

    // Create links
    const link = g.selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .attr('d', d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x))

    // Create nodes
    const node = g.selectAll('.node')
      .data(root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')

    // Add circles for nodes
    node.append('circle')
      .attr('fill', d => d.children ? colorScale(d.depth.toString()) : '#999')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('r', d => d.data.value ? sizeScale(d.data.value) : 4)
      .on('mouseover', function(event, d: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (d.data.value ? sizeScale(d.data.value) : 4) * 1.5)
          .attr('stroke-width', 3)

        // Highlight path to root
        const pathToRoot = d.ancestors().reverse()
        g.selectAll('.link')
          .style('stroke-opacity', 0.1)
          .filter((linkData: any) => pathToRoot.includes(linkData.target))
          .style('stroke-opacity', 1)
          .style('stroke', '#007bff')
          .style('stroke-width', 3)

        // Create tooltip
        const tooltip = d3.select('body').append('div')
          .attr('class', 'indented-tree-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.9)')
          .style('color', 'white')
          .style('padding', '12px 16px')
          .style('border-radius', '6px')
          .style('font-size', '13px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .style('box-shadow', '0 4px 12px rgba(0,0,0,0.3)')
          .html(() => {
            let content = `<strong>${d.data.name}</strong>`
            if (d.data.value) {
              content += `<br/>Responses: <span style="color: #4fc3f7">${d.data.value}</span>`
            }
            content += `<br/>Level: ${d.depth + 1}`
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
          .attr('r', d.data.value ? sizeScale(d.data.value) : 4)
          .attr('stroke-width', 2)

        // Reset links
        g.selectAll('.link')
          .style('stroke-opacity', 0.4)
          .style('stroke', '#999')
          .style('stroke-width', 1.5)

        d3.selectAll('.indented-tree-tooltip').remove()
      })

    // Add labels
    node.append('text')
      .attr('dy', '0.32em')
      .attr('x', d => d.children ? -15 : 15)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-weight', d => d.children ? '600' : '400')
      .style('font-size', d => d.depth === 0 ? '14px' : '12px')
      .style('fill', '#333')
      .text(d => d.data.name)
      .clone(true).lower()
      .attr('stroke', 'white')
      .attr('stroke-width', 3)

    // Add value labels for leaf nodes
    node.filter(d => !d.children && d.data.value)
      .append('text')
      .attr('dy', '0.32em')
      .attr('x', 15)
      .attr('dx', '1em')
      .style('font-size', '10px')
      .style('fill', '#666')
      .style('font-weight', '500')
      .text(d => `(${d.data.value})`)

    // Add expand/collapse functionality
    node.filter(d => d.children)
      .append('circle')
      .attr('r', 8)
      .attr('fill', 'white')
      .attr('stroke', d => colorScale(d.depth.toString()))
      .attr('stroke-width', 2)
      .attr('cx', -25)
      .style('cursor', 'pointer')
      .on('click', function(event, d: any) {
        event.stopPropagation()
        if (d.children) {
          (d as any)._children = d.children
          d.children = null
        } else {
          d.children = (d as any)._children
          ;(d as any)._children = null
        }
        update(d)
      })

    node.filter(d => d.children)
      .append('text')
      .attr('x', -25)
      .attr('dy', '0.32em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', d => colorScale(d.depth.toString()))
      .style('pointer-events', 'none')
      .text('−')

    // Update function for expand/collapse
    function update(source: any) {
      // Recalculate layout
      tree(root)
      
      // Update positions
      const transition = svg.transition().duration(750)
      
      // Update nodes
      const nodeUpdate = g.selectAll('.node')
        .data(root.descendants(), (d: any) => d.id)
      
      nodeUpdate.transition(transition)
        .attr('transform', d => `translate(${d.y},${d.x})`)
      
      // Update links
      const linkUpdate = g.selectAll('.link')
        .data(root.links(), (d: any) => d.target.id)
      
      linkUpdate.transition(transition)
        .attr('d', d3.linkHorizontal()
          .x((d: any) => d.y)
          .y((d: any) => d.x))
    }

    // Add legend
    const legend = g.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${chartWidth - 100}, 20)`)

    const legendData = [
      { label: 'Category', color: colorScale('0'), size: 8 },
      { label: 'Subcategory', color: colorScale('1'), size: 6 },
      { label: 'Response', color: '#999', size: 4 }
    ]

    const legendItems = legend.selectAll('.legend-item')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`)

    legendItems.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)

    legendItems.append('text')
      .attr('x', 15)
      .attr('dy', '0.32em')
      .style('font-size', '11px')
      .style('fill', '#666')
      .text(d => d.label)

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

const SurveyHierarchyTree = () => {
  return (
    <ComponentContainerCard
      title="Coffee Survey Hierarchy"
      description="Interactive indented tree showing hierarchical breakdown of coffee survey responses across respondents, preferences, and ratings"
    >
      <IndentedTreeChart data={coffeeSurveyHierarchyData} width={1200} height={800} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Navigation:</strong> Click circles with minus signs to collapse/expand branches. 
          Hover over nodes for detailed information.
          <br />
          <em>Node size represents response volume. Colors indicate hierarchy levels.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const OrganizationalSurveyTree = () => {
  return (
    <ComponentContainerCard
      title="Employee Engagement Survey Structure"
      description="Hierarchical view of employee engagement survey results organized by workplace dimensions and satisfaction metrics"
    >
      <IndentedTreeChart data={organizationalSurveyData} width={1200} height={750} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Organizational Insights:</strong> Explore engagement factors from high-level categories to specific response details.
          <br />
          <em>Interactive tree structure perfect for HR analytics and workplace assessment.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const MarketResearchTree = () => {
  return (
    <ComponentContainerCard
      title="Brand Perception Research Tree"
      description="Comprehensive hierarchical analysis of brand perception study results across awareness, attributes, and behavior dimensions"
    >
      <IndentedTreeChart data={marketResearchTreeData} width={1200} height={850} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Market Analysis:</strong> Navigate through brand perception layers from awareness to purchase behavior.
          <br />
          <em>Ideal for marketing research and competitive analysis visualization.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const AllIndentedTreeCharts = () => {
  return (
    <>
      <SurveyHierarchyTree />
      <OrganizationalSurveyTree />
      <MarketResearchTree />
    </>
  )
}

export default AllIndentedTreeCharts
