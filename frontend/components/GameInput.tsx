import React from "react";
import { GameInputProps } from "@/types/types"

export default function GameInput({
  digits,
  activeIndex,
  success,
  invalidIndex,
  inputRefs,
  handleChange,
  boxStyle,
  containerStyle,
}: GameInputProps) {
  return (
    <div className={containerStyle}>
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={inputRefs[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={success}
          onChange={e => handleChange(idx, e.target.value)}
          className={`${boxStyle} ${activeIndex === idx ? "border-gray-900 ring-2" : ""} 
            focus:outline-none text-gray-500 text-center select-none`}
          style={{
            boxShadow:
              invalidIndex === idx
                ? "0 0 16px 4px rgba(255,0,0,0.7), 0 4px 16px rgba(0,0,0,0.15), 0 1.5px 0 #ccc"
                : "0 4px 16px rgba(0,0,0,0.15), 0 1.5px 0 #ccc",
            perspective: "500px",
            transform: "rotateX(10deg) rotateY(5deg)",
          }}
        />
      ))}
    </div>
  );
}