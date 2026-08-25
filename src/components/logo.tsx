import * as React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="100"
    height="100"
    {...props}
  >
    <defs>
      <path
        id="circlePath"
        d="M 40,100 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
      />
    </defs>

    {/* Globe */}
    <circle cx="100" cy="100" r="60" fill="none" stroke="#2B3990" strokeWidth="2" />
    <ellipse cx="100" cy="100" rx="20" ry="58" fill="none" stroke="#2B3990" strokeWidth="1" />
    <ellipse cx="100" cy="100" rx="45" ry="59" fill="none" stroke="#2B3990" strokeWidth="1" />
    <path d="M 40,100 h 120" stroke="#2B3990" strokeWidth="1" />
    <path d="M 58,135 a 60,40 0 0,0 84,0" fill="none" stroke="#2B3990" strokeWidth="1" />
    <path d="M 58,65 a 60,40 0 0,1 84,0" fill="none" stroke="#2B3990" strokeWidth="1" />
    
    {/* Continent */}
    <path d="M100,75 L95,80 L90,82 L85,90 L90,95 L95,105 L100,115 L105,125 L115,130 L125,120 L130,110 L125,100 L120,90 L110,80 z" fill="#2B3990" />

    {/* Graduation Cap */}
    <path
      d="M 20,80 L 100,40 L 180,80 L 100,120 Z"
      fill="#231F20"
    />
     <path
      d="M 85,115 L 100,120 L 115,115 L 100,105 Z"
      fill="#FFFFFF"
    />
    <path d="M175,80 l5,5" stroke="#231F20" strokeWidth="2" />
    <path
        d="M 20,80 Q 10,95 25,100 T 25 105"
        stroke="#231F20"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
    />
    <circle cx="25" cy="78" r="4" fill="#231F20" />

    {/* Persian Text */}
    <g fill="#231F20" style={{ fontSize: "18px", fontFamily: "Arial, sans-serif" }}>
        <text textAnchor="middle">
            <textPath href="#circlePath" startOffset="50%">
                آموزشگاه دهکده ی زبان
            </textPath>
        </text>
    </g>

    {/* English Text */}
     <g fill="#231F20" style={{ fontSize: "16px", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
        <text textAnchor="middle">
            <textPath href="#circlePath" startOffset="0%">
                DehkadehQuiz
            </textPath>
        </text>
    </g>
  </svg>
);

export default Logo;
