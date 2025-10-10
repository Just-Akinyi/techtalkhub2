import React from "react";

export default function HeroBackground({ children }) {
  // 1. Define the custom radial gradient style to match the top-left highlight
  const radialGradientStyle = {
    // Light lavender base color for the area not covered by the gradient center
    backgroundColor: '#f1eafd', 
    // Radial gradient: starts bright white at 10% from left/top, transitions to a light lavender
    background: 'radial-gradient(circle at 10% 10%, #ffffff 0%, #f1eafd 70%, #e0d0fa 100%)',
  };

  return (
    <div 
      className="relative w-full" 
      style={{ height: 530, ...radialGradientStyle }} // Apply height and the custom gradient
    >
      {/* 2. Layered SVG for the large right-side graph and the bottom waves */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 530" 
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMaxYMin slice" // Ensures the shapes fill and align to the bottom right
      >
        {/* --- SHAPE 1: THE TALL, SUBTLE RIGHT-HAND GRAPH/HILL (Low Opacity) --- */}
        <path
          // This path defines the main, large curve starting high on the right
        //   fill="#9333ea" 
        //   fillOpacity="0.10" // Subtle light purple
        fill="#a78bfa"
        fillOpacity="0.3" 
          d="M 1440 530 L 1440 180 C 1300 0 1100 100 850 160 C 600 220 300 180 0 300 L 0 530 Z"
        />

        {/* --- SHAPE 2: THE INNER GRAPH DETAIL (Even Lower Opacity) --- */}
        <path
          // This slightly different path creates the layered effect, giving depth
          fill="#9333ea" 
        //   fillOpacity="0.05" // Even lighter purple detail
        // fill="#8b5cf6"
        fillOpacity="0.3" 
          d="M 1440 530 L 1440 250 C 1200 50 1000 150 700 200 C 400 250 200 200 0 350 L 0 530 Z"
        />
        
        {/* --- SHAPE 3: THE SOLID BOTTOM WAVE (High Opacity) --- */}
        <path
          // This path represents the solid purple wave that meets the desk, creating the sharp edge
        //   fill="#9333ea"  
        //   fillOpacity="0.8"
        fill="#6d28d9" 
        fillOpacity="0.5" 
          d="M0,500L48,490.7C96,480,192,470,288,474.7C384,479,480,490,576,496C672,501,768,501,864,490.7C960,480,1056,469,1152,474.7C1248,480,1344,501,1392,512L1440,523L1440,530L0,530Z"
        />

        {/* --- DETAIL: THE TINY CIRCLE DATA POINT (Optional but good for detail) --- */}
        <circle 
            cx="700" 
            cy="200" 
            // r="10"
            r="5" 
            fill="white" 
            opacity="1" 
        />
        <circle 
            cx="400" 
            cy="214" 
            r="5" 
            fill="#9333ea" 
            opacity="0.5" 
        />
      </svg>

      {/* 3. Content area */}
      <div className="relative z-10 h-full flex items-center">
        {children}
      </div>
    </div>
  );
}