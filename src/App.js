import React, { useState } from "react";
import "./Matrix.css";

const Matrix = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill("white")));
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] === "orange") return; // Ignore clicks after orange

    const updatedMatrix = matrix.map((r, i) =>
      r.map((color, j) => (i === row && j === col ? "green" : color))
    );

    setMatrix(updatedMatrix);
    setClickOrder((prevOrder) => [...prevOrder, [row, col]]);

    // Check if it's the last box
    if (row === 2 && col === 2) {
      setTimeout(() => {
        applyOrangeInSequence();
      }, 500);
    }
  };

  const applyOrangeInSequence = () => {
    clickOrder.forEach(([row, col], index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((r, i) =>
            r.map((color, j) => (i === row && j === col ? "orange" : color))
          )
        );
      }, index * 500);
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
