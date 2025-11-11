import React from 'react';

export default function GlobalFaithLogo({ size = 160 }) {
  return (
    <div className="relative flex flex-col items-center" style={{ width: size + 20, height: size + 60 }}>
      {/* Two Doves with Banner - Above the circle */}
      <div className="relative mb-2 z-20">
        <svg width="150" height="45" viewBox="0 0 150 45" className="drop-shadow-lg">
          {/* Left Dove - Light Blue with wings spread */}
          <g transform="translate(20, 22)">
            {/* Dove body */}
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#06B6D4" stroke="#234290" strokeWidth="1" opacity="0.95" />
            {/* Left wing */}
            <path d="M-8 0 Q-12 -4, -10 -6 Q-8 -4, -6 -2" fill="#87CEEB" stroke="#234290" strokeWidth="0.5" />
            {/* Right wing */}
            <path d="M8 0 Q12 -4, 10 -6 Q8 -4, 6 -2" fill="#87CEEB" stroke="#234290" strokeWidth="0.5" />
            {/* Head */}
            <circle cx="-2" cy="-3" r="3" fill="#06B6D4" stroke="#234290" strokeWidth="0.5" />
          </g>
          
          {/* Right Dove - Light Blue with wings spread */}
          <g transform="translate(130, 22)">
            {/* Dove body */}
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#06B6D4" stroke="#234290" strokeWidth="1" opacity="0.95" />
            {/* Left wing */}
            <path d="M-8 0 Q-12 -4, -10 -6 Q-8 -4, -6 -2" fill="#87CEEB" stroke="#234290" strokeWidth="0.5" />
            {/* Right wing */}
            <path d="M8 0 Q12 -4, 10 -6 Q8 -4, 6 -2" fill="#87CEEB" stroke="#234290" strokeWidth="0.5" />
            {/* Head */}
            <circle cx="2" cy="-3" r="3" fill="#06B6D4" stroke="#234290" strokeWidth="0.5" />
          </g>
          
          {/* Golden Banner - Curved between doves */}
          <path 
            d="M35 20 Q75 12, 115 20 Q75 26, 35 20" 
            fill="#EFBB49" 
            stroke="#E69428" 
            strokeWidth="2"
            className="drop-shadow-md"
          />
          {/* Banner Text - GlobalFaiths.org in Orange/Red */}
          <text 
            x="75" 
            y="19" 
            textAnchor="middle" 
            fontSize="10" 
            fill="#D12E34" 
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            className="drop-shadow-sm"
          >
            GlobalFaiths.org
          </text>
        </svg>
      </div>
      
      {/* Circular Emblem Container - Below Banner */}
      <div className="relative">
        <svg width={size} height={size} viewBox="0 0 160 160">
          {/* Outer Golden Ring */}
          <circle 
            cx="80" 
            cy="80" 
            r="76" 
            fill="none" 
            stroke="#EFBB49" 
            strokeWidth="6"
            className="drop-shadow-lg"
          />
          
          {/* Inner Dark Blue Circle */}
          <circle 
            cx="80" 
            cy="80" 
            r="68" 
            fill="#234290"
          />
          
          {/* Islamic Crescent with Star - Top (Overlapping) */}
          <g transform="translate(80, 50)">
            {/* Crescent Moon - Green */}
            <path 
              d="M-10 0 A10 10 0 1 1 10 0 A6 6 0 1 0 -10 0 Z" 
              fill="#439539"
            />
            {/* Star inside crescent - Yellow */}
            <polygon 
              points="6,-3 7,1 11,1 8,4 9,8 5,5 1,8 2,4 -1,1 3,1" 
              fill="#EFBB49"
            />
          </g>
          
          {/* Christian Cross - Middle (Red circle with white cross) - Overlapping */}
          <g transform="translate(80, 80)">
            {/* Red Circle Background */}
            <circle cx="0" cy="0" r="14" fill="#D12E34" />
            {/* White Cross */}
            <rect x="-2" y="-10" width="4" height="20" fill="#FFFFFF" rx="1" />
            <rect x="-10" y="-2" width="20" height="4" fill="#FFFFFF" rx="1" />
          </g>
          
          {/* Stylized Green Symbol - Bottom (Teardrop/Leaf shape) - Overlapping */}
          <g transform="translate(80, 110)">
            {/* Teardrop/Leaf Shape - Green */}
            <path 
              d="M0 -10 Q-7 -5, -9 0 Q-7 5, 0 10 Q7 5, 9 0 Q7 -5, 0 -10 Z" 
              fill="#439539"
            />
            {/* Inner detail */}
            <path 
              d="M0 -6 Q-4 -3, -5 0 Q-4 3, 0 6 Q4 3, 5 0 Q4 -3, 0 -6 Z" 
              fill="#2E8B57"
              opacity="0.7"
            />
            {/* Small Circle at Top */}
            <circle cx="0" cy="-8" r="2.5" fill="#EFBB49" />
          </g>
        </svg>
      </div>
    </div>
  );
}

