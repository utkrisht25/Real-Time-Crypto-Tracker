import React from 'react';
import { chartImages } from '../assets/chartImages';

export default function PriceChart({ coinId }) {
  return (
    <img 
      src={chartImages[coinId] || chartImages.default} 
      alt="7-day chart" 
      className="chart-image" 
    />
  );
}