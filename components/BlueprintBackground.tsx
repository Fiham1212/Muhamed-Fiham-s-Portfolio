import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BlueprintBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    
    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      svg.attr('width', width).attr('height', height);
      svg.selectAll('*').remove();

      // Adjust grid density based on screen size for performance
      const gridSize = isMobile ? 80 : 60;
      
      const gridGroup = svg.append('g').attr('stroke', '#1e3a8a').attr('stroke-width', 0.3);

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        gridGroup.append('line')
          .attr('x1', x)
          .attr('y1', 0)
          .attr('x2', x)
          .attr('y2', height)
          .attr('opacity', 0.15);
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        gridGroup.append('line')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
          .attr('opacity', 0.15);
      }

      // Add technical markers (fewer on mobile)
      const markerGroup = svg.append('g').attr('stroke', '#3b82f6').attr('stroke-width', 1);
      const numMarkers = isMobile ? 4 : 8;
      
      for (let i = 0; i < numMarkers; i++) {
        const mx = Math.random() * width;
        const my = Math.random() * height;
        
        markerGroup.append('line').attr('x1', mx - 6).attr('y1', my).attr('x2', mx + 6).attr('y2', my).attr('opacity', 0.3);
        markerGroup.append('line').attr('x1', mx).attr('y1', my - 6).attr('x2', mx).attr('y2', my + 6).attr('opacity', 0.3);
        
        svg.append('text')
           .attr('x', mx + 8)
           .attr('y', my + 8)
           .text(`REF-${Math.floor(Math.random() * 999)}`)
           .attr('fill', '#64748b')
           .attr('font-size', '9px')
           .attr('font-family', 'monospace')
           .attr('opacity', 0.3);
      }
    };

    draw();

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <svg 
      ref={svgRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050A18] pointer-events-none"
    />
  );
};

export default BlueprintBackground;