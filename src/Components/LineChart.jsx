import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 40, right: 60, bottom: 90, left: 40 };
    const width = 740 - margin.left - margin.right;
    const height = 320 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Data
    const xData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yData = ['Net Working Capital', 'Gross Working Capital'];
    const y1Points = [17.5, 37.6, 248.8, 287.2, 202.9, 198.7, 365.5, 540.9, 97.5, 323.56, 232.69, 0];
    const y2Points = [17.5, 37.6, 202.36, -102.56, -1.2, -3.28, 438.56, -2.4, 443.2, -1.8, 305.6, 201.54, -10];

    // Scales
    const xScale = d3.scaleBand()
      .domain(xData)
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(y1Points.concat(y2Points)), d3.max(y1Points.concat(y2Points))])
      .range([height, 0]);

    // Add horizontal lines
    svg.selectAll('.grid-line')
      .data(y1Points)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .style('stroke', 'lightgrey');

    // Create line for y1 (blue)
    const line1 = d3.line()
      .x((d, i) => xScale(xData[i]) + xScale.bandwidth() / 2)
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(y1Points)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line1);

    // Create line for y2 (yellow)
    const line2 = d3.line()
      .x((d, i) => xScale(xData[i]) + xScale.bandwidth() / 2)
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(y2Points)
      .attr('fill', 'none')
      .attr('stroke', 'yellow')
      .attr('stroke-width', 2)
      .attr('d', line2);

    // Add bullet points
    svg.selectAll('.bullet')
      .data(y1Points)
      .enter()
      .append('circle')
      .attr('class', 'bullet')
      .attr('cx', (d, i) => xScale(xData[i]) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d))
      .attr('r', 5)
      .style('fill', 'blue');

    svg.selectAll('.bullet')
      .data(y2Points)
      .enter()
      .append('circle')
      .attr('class', 'bullet')
      .attr('cx', (d, i) => xScale(xData[i]) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d))
      .attr('r', 5)
      .style('fill', 'yellow');

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Y-axis label
    svg.append('text')
      .attr('x', height+80)
      .attr('y', 210)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .text('Net Working Capital  |  Gross Working Capital');

    // Title
    svg.append('text')
      .attr('x', 10)
      .attr('y', -10)
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Net Working Capital vs Gross Working Capital');
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default LineChart;
