import React, { useState, useRef } from 'react';

const WaterVolume = () => {
  const [inputData, setInputData] = useState('');
  const [waterVolume, setWaterVolume] = useState(0);

  const canvasRef = useRef();

  const drawBlocks = (data) => {
    const dataArray = data.split(",").map(Number);
    const maxBlockHeight = Math.max(...dataArray);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = dataArray.length * 50;
    canvas.height = maxBlockHeight * 50;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const blockWidth = 50;
    const gapWidth = 1;
    const blockColor = "#1E90FF"; 
    const borderColor = "#000000"; 
    const lineWidth = 2; 

    ctx.fillStyle = blockColor;
    dataArray.forEach((height, i) => {
      const x = i * (blockWidth + gapWidth);
      const y = canvas.height - height * 50;
      ctx.fillRect(x, y, blockWidth, height * 50);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(x, y, blockWidth, height * 50);
    });

    const waterVolume = dataArray.reduce((total, height, i) => {
      const leftMax = Math.max(...dataArray.slice(0, i + 1));
      const rightMax = Math.max(...dataArray.slice(i + 1));
      const minHeight = Math.min(leftMax, rightMax);
      return total + Math.max(minHeight - height, 0);
    }, 0);

    setWaterVolume(waterVolume);
  };

  const handleInputChange = (event) => {
    const data = event.target.value.trim();
    setInputData(data);
    drawBlocks(data);
  };

  return (
    <div>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        style={{ padding: '8px' }}
        placeholder="Nhập dãy số tự nhiên, ngăn cách bởi dấu ','"
      />
      <div id="blockContainer">
        <canvas ref={canvasRef} />
      </div>
      <div>Thể tích nước: {waterVolume}</div>
    </div>
  );
};

export default WaterVolume;
