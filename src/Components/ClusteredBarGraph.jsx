import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ClusteredBarGraph = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 40, right: 30, bottom: 70, left: 60 }; // Increased bottom margin
    const width = 510 - margin.left - margin.right;
    const height = 313 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const xData = data.map(d => d.X);
    const yData = [...data.map(d => d.y1), ...data.map(d => d.y2)];
    const xScale = d3.scaleBand()
      .domain(xData)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleBand()
      .domain(yData)
      .range([0, height]) // Reverse Y-axis
      .padding(0.1);

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Create blue bars for account receivable
    svg.selectAll('.bar-blue')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-blue')
      .attr('x', d => xScale(d.X))
      .attr('y', d => yScale(d.y1))
      .attr('width', xScale.bandwidth() / 2) // Reduced column size
      .attr('height', d => height - yScale(d.y1)) // Adjusted height
      .style('fill', 'blue');

    // Create red bars for account payable
    svg.selectAll('.bar-red')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-red')
      .attr('x', d => xScale(d.X) + xScale.bandwidth() / 2) // Start from the middle
      .attr('y', d => yScale(d.y2))
      .attr('width', xScale.bandwidth() / 2) // Reduced column size
      .attr('height', d => height - yScale(d.y2)) // Adjusted height
      .style('fill', 'red');

    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'start')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Total Account Receivable and Payable Aging');

    // Add labels below the x-axis
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Due Date');

    // Add labels below the x-axis for both categories
    svg.append('text')
      .attr('x', width - 130)
      .attr('y', height + 55)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'blue')
      .style('font-weight', 'bold')
      .text('Account Receivable');

    svg.append('text')
      .attr('x', width / 4)
      .attr('y', height + 55)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'red')
      .style('font-weight', 'bold')
      .text('Account Payable');
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};





export default ClusteredBarGraph;
