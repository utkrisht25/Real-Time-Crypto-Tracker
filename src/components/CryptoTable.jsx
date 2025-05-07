import React from 'react';
// import './index.css';
import PriceChart from './PriceChart.jsx'
export default function CryptoTable({ coins }) {
  return (
    <div className="crypto-grid-container">
      <div className="grid-header">
        <div>Name</div>
        <div>Price</div>
        <div>1h%</div>
        <div>24h%</div>
        <div>7d%</div>
        <div>Market Cap</div>
        <div>Volume (24h)</div>
        <div>Circulating Supply</div>
        <div>Last 7 Days</div>
      </div>

      {coins?.map((coin) => (
        <div className="grid-row" key={coin?.id}>
          <div className="coin-info">
            <img src={coin?.image} alt={coin?.name} />
            <div>
              <span className="coin-name">{coin?.name}</span>
              <span className="coin-symbol">{coin?.symbol?.toUpperCase()}</span>
            </div>
          </div>
          <div className="price">
            ${coin?.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className={`change ${getChangeClass(coin?.price_change_percentage_1h_in_currency)}`}>
            {formatPercentage(coin?.price_change_percentage_1h_in_currency)}
          </div>
          <div className={`change ${getChangeClass(coin?.price_change_percentage_24h_in_currency)}`}>
            {formatPercentage(coin?.price_change_percentage_24h_in_currency)}
          </div>
          <div className={`change ${getChangeClass(coin?.price_change_percentage_7d_in_currency)}`}>
            {formatPercentage(coin?.price_change_percentage_7d_in_currency)}
          </div>
          <div>${formatMarketCap(coin?.market_cap)}</div>
          <div>${formatVolume(coin?.total_volume)}</div>
          <div>
            {formatSupply(coin?.circulating_supply)} {coin?.symbol?.toUpperCase()}
          </div>
          <div className="chart-cell">
            <PriceChart coinId={coin?.id}/>
          </div>
        </div>
      ))}
    </div>
  );
}


// Helper functions
const formatPercentage = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return '-';
  const absValue = Math.abs(value);
  if (absValue < 0.01) return '~0.00%';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

const getChangeClass = (value) => {
  if (typeof value !== 'number' || isNaN(value)) return 'neutral';
  if (Math.abs(value) < 0.01) return 'neutral';
  return value >= 0 ? 'positive' : 'negative';
};

const formatMarketCap = (num) => {
  if (!num) return '-';
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  return num.toLocaleString();
};

const formatVolume = (num) => {
  if (!num) return '-';
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return num.toLocaleString();
};

const formatSupply = (num) => {
  if (!num) return '-';
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return num.toLocaleString();
};