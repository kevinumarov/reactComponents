import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import { customerSatisfactionData, employeeEngagementData, brandPerceptionData, likertColors } from '../data'

interface DivergingBarChartProps {
  data: any[]
  width?: number
  height?: number
  title?: string
}

const DivergingBarChart = ({ data, width = 900, height = 400, title }: DivergingBarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const margin = { top: 20, right: 120, bottom: 40, left: 200 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Get all response categories (excluding 'question')
    const categories = Object.keys(data[0]).filter(key => key !== 'question')
    const questions = data.map(d => d.question)

    // Process data for stacking
    const processedData = data.map(d => {
      const total = categories.reduce((sum, cat) => sum + d[cat], 0)
      let cumulative = 0
      const processed: any = { question: d.question }
      
      categories.forEach(cat => {
        const percentage = (d[cat] / total) * 100
        processed[cat] = {
          value: d[cat],
          percentage: percentage,
          start: cumulative,
          end: cumulative + percentage
        }
        cumulative += percentage
      })
      
      return processed
    })

    // Find the neutral category (usually in the middle)
    const neutralIndex = Math.floor(categories.length / 2)
    const neutralCategory = categories[neutralIndex]

    // Adjust positions to center around neutral
    processedData.forEach(d => {
      const neutralStart = d[neutralCategory].start
      const neutralWidth = d[neutralCategory].percentage
      const neutralCenter = neutralStart + neutralWidth / 2
      const offset = 50 - neutralCenter // Center at 50%
      
      categories.forEach(cat => {
        d[cat].start += offset
        d[cat].end += offset
      })
    })

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([-50, 50])
      .range([0, chartWidth])

    const yScale = d3.scaleBand()
      .domain(questions)
      .range([0, chartHeight])
      .padding(0.2)

    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range([
        likertColors.negative[0],
        likertColors.negative[1],
        likertColors.neutral,
        likertColors.positive[0],
        likertColors.positive[1]
      ])

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => `${Math.abs(d)}%`)
      .tickSize(-chartHeight)

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)
      .selectAll('line')
      .style('stroke', '#e0e0e0')
      .style('stroke-dasharray', '2,2')

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '12px')
      .style('font-weight', '500')

    // Add center line
    g.append('line')
      .attr('x1', xScale(0))
      .attr('x2', xScale(0))
      .attr('y1', 0)
      .attr('y2', chartHeight)
      .style('stroke', '#333')
      .style('stroke-width', 2)

    // Create bars for each category
    categories.forEach(category => {
      g.selectAll(`.bar-${category.replace(/\s+/g, '-')}`)
        .data(processedData)
        .enter()
        .append('rect')
        .attr('class', `bar-${category.replace(/\s+/g, '-')}`)
        .attr('x', d => {
          const adjustedStart = d[category].start - 50
          return xScale(Math.min(0, adjustedStart))
        })
        .attr('y', d => yScale(d.question)!)
        .attr('width', d => {
          const adjustedStart = d[category].start - 50
          const adjustedEnd = d[category].end - 50
          return Math.abs(xScale(adjustedEnd) - xScale(adjustedStart))
        })
        .attr('height', yScale.bandwidth())
        .attr('fill', colorScale(category) as string)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d: any) {
          d3.select(this)
            .style('opacity', 0.8)
            .style('stroke', '#333')
            .style('stroke-width', 1)

          // Create tooltip
          const tooltip = d3.select('body').append('div')
            .attr('class', 'diverging-bar-tooltip')
            .style('position', 'absolute')
            .style('background', 'rgba(0, 0, 0, 0.9)')
            .style('color', 'white')
            .style('padding', '12px 16px')
            .style('border-radius', '6px')
            .style('font-size', '13px')
            .style('pointer-events', 'none')
            .style('z-index', '1000')
            .style('box-shadow', '0 4px 12px rgba(0,0,0,0.3)')
            .html(`
              <strong>${d.question}</strong><br/>
              <strong>${category}:</strong> ${d[category].value} responses<br/>
              <span style="color: #4fc3f7">${d[category].percentage.toFixed(1)}%</span> of total
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('opacity', 1)
            .style('stroke', 'none')
          
          d3.selectAll('.diverging-bar-tooltip').remove()
        })
    })

    // Add percentage labels on bars
    categories.forEach(category => {
      g.selectAll(`.label-${category.replace(/\s+/g, '-')}`)
        .data(processedData.filter(d => d[category].percentage > 8)) // Only show labels for segments > 8%
        .enter()
        .append('text')
        .attr('class', `label-${category.replace(/\s+/g, '-')}`)
        .attr('x', d => {
          const adjustedStart = d[category].start - 50
          const adjustedEnd = d[category].end - 50
          return xScale((adjustedStart + adjustedEnd) / 2)
        })
        .attr('y', d => yScale(d.question)! + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .style('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('font-weight', '600')
        .style('fill', 'white')
        .style('pointer-events', 'none')
        .text(d => `${d[category].percentage.toFixed(0)}%`)
    })

    // Add legend
    const legend = g.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${chartWidth + 20}, 20)`)

    const legendItems = legend.selectAll('.legend-item')
      .data(categories)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)

    legendItems.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', d => colorScale(d) as string)
      .attr('rx', 2)

    legendItems.append('text')
      .attr('x', 25)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(d => d)

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
          background: 'white'
        }}
      />
    </div>
  )
}

const CustomerSatisfactionChart = () => {
  return (
    <ComponentContainerCard
      title="Customer Satisfaction Survey Results"
      description="Diverging stacked bar chart showing distribution of responses across satisfaction levels. Negative responses on the left, positive on the right."
    >
      <DivergingBarChart data={customerSatisfactionData} width={900} height={350} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>How to read:</strong> Each bar represents 100% of responses. 
          Negative opinions (red) diverge left from center, positive opinions (blue) diverge right.
          <br />
          <em>Hover over segments for detailed percentages and response counts.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const EmployeeEngagementChart = () => {
  return (
    <ComponentContainerCard
      title="Employee Engagement Survey Analysis"
      description="Interactive diverging bar chart visualizing employee satisfaction across key workplace dimensions"
    >
      <DivergingBarChart data={employeeEngagementData} width={900} height={350} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Engagement Insights:</strong> Centered visualization helps identify areas needing improvement.
          <br />
          <em>Longer bars on the right indicate higher satisfaction levels.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const BrandPerceptionChart = () => {
  return (
    <ComponentContainerCard
      title="Brand Perception Study"
      description="Diverging stacked bar chart showing consumer opinions on brand attributes and market positioning"
    >
      <DivergingBarChart data={brandPerceptionData} width={900} height={300} />
      <div className="mt-3 d-flex justify-content-center">
        <div className="text-muted small text-center">
          <strong>Brand Analysis:</strong> Neutral responses centered, with agreement/disagreement spreading outward.
          <br />
          <em>Perfect for analyzing Likert scale survey responses and opinion distributions.</em>
        </div>
      </div>
    </ComponentContainerCard>
  )
}

const AllDivergingBarCharts = () => {
  return (
    <>
      <CustomerSatisfactionChart />
      <EmployeeEngagementChart />
      <BrandPerceptionChart />
    </>
  )
}

export default AllDivergingBarCharts
