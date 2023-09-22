import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const NeedleGauge = ({ targetValue, minValue, maxValue, label, unit, sublabel}) => {
  const svgRef = useRef();
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = 240;
    const height = 240;
    const radius = 100;
    const centerX = width / 2;
    const centerY = height / 2;
    const startAngle = -490;
    const endAngle = -230;

    // Define an arc generator
    const arc = d3
      .arc()
      .innerRadius(radius - 40) // Inner radius to create a hollow arc
      .outerRadius(radius)
      .startAngle(startAngle * (Math.PI / 180))
      .endAngle(endAngle*( Math.PI / 180));

    // Create the arc path
    svg
      .append('path')
      .attr('d', arc)
      .attr('transform', `translate(${centerX},${centerY+15})`)
      .style('fill', 'lightgray');

    // Create the needle
    const needle = svg
      .append('line')
      .attr('x1', centerX) //120
      .attr('y1', centerY) //120
      .attr('x2', centerX)  //120
      .attr('y2', centerY - radius + 40)
      .style('stroke', 'red')
      .style('stroke-width', 2);

    // Calculate the rotation angle for the needle
    const angleScale = d3.scaleLinear().domain([minValue, maxValue]).range([startAngle, endAngle]);
    const targetAngle = angleScale(targetValue);

    // Animate the needle rotation
    needle
      .transition()
      .duration(1000)
      .attrTween('transform', () => (t) => {
        const currentAngle = angleScale(currentValue);
        const interpolateAngle = d3.interpolate(currentAngle, targetAngle);
        const newAngle = interpolateAngle(t);
        setCurrentValue(newAngle);
        return `rotate(${newAngle},${centerX},${centerY})`;
      });

  // Add labels
  svg
  .append('text')
  .text(minValue)
  .attr('x', centerX-50 )
  .attr('y', centerY+90)
  .attr('text-anchor', 'end')
  .style('font-size', '25px');
  

svg
  .append('text')
  .text(maxValue)
  .attr('x', centerX+40)
  .attr('y', centerY+90)
  .attr('text-anchor', 'start')
  .style('font-size', '25px');

svg
  .append('text')
  .text(targetValue+unit)
  .attr('x', centerX)
  .attr('y', centerY+70)
  .attr('text-anchor', 'middle')
  .attr('dy', -5)
  .style('font-size', '25px')
  .style('font-weight', 'bold');

// Add label in top left corner
svg
  .append('text')
  .text(label)
  .attr('x', 10)
  .attr('y', 10)
  .attr('text-anchor', 'start')
  .style('font-size', '12px')
  .style('fill', 'black')
  .style('font-weight', 'bold');

  svg
  .append('text')
  .text(sublabel)
  .attr('x', 10)
  .attr('y', 25)
  .attr('text-anchor', 'start')
  .style('font-size', '12px')
  .style('fill', 'black')
  .style('font-weight', 'bold');
}, [targetValue, minValue, maxValue, label, sublabel]);

return (
<div>
  <svg ref={svgRef} width="240" height="240"></svg>
</div>
);
};

export default NeedleGauge;