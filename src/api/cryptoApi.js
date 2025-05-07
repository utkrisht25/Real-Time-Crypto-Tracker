import axios from 'axios';

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          ids: 'bitcoin,ethereum,tether,binancecoin,cardano',
          per_page: 5,
          sparkline: true,
          price_change_percentage: '1h,24h,7d'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error, using mock data:', error);
    return mockCryptoData;
  }
};

export const mockCryptoData = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 67432,
    price_change_percentage_1h_in_currency: 0.5,
    price_change_percentage_24h_in_currency: -1.2,
    price_change_percentage_7d_in_currency: 5.3,
    market_cap: 1328500000000,
    total_volume: 32500000000,
    circulating_supply: 19680625,
    max_supply: 21000000,
    sparkline_in_7d: { price: [65000, 67000, 68000, 67200, 67450, 67300, 67432] }
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3800,
    price_change_percentage_1h_in_currency: -0.3,
    price_change_percentage_24h_in_currency: 2.1,
    price_change_percentage_7d_in_currency: -1.5,
    market_cap: 456000000000,
    total_volume: 15000000000,
    circulating_supply: 120000000,
    max_supply: null,
    sparkline_in_7d: { price: [3700, 3820, 3850, 3790, 3810, 3780, 3800] }
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    current_price: 1.0,
    price_change_percentage_1h_in_currency: 0.01,
    price_change_percentage_24h_in_currency: -0.02,
    price_change_percentage_7d_in_currency: 0.05,
    market_cap: 83200000000,
    total_volume: 50000000000,
    circulating_supply: 83200000000,
    max_supply: null,
    sparkline_in_7d: { price: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0] }
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 600,
    price_change_percentage_1h_in_currency: 0.7,
    price_change_percentage_24h_in_currency: -0.8,
    price_change_percentage_7d_in_currency: 2.4,
    market_cap: 90000000000,
    total_volume: 1000000000,
    circulating_supply: 150000000,
    max_supply: 170000000,
    sparkline_in_7d: { price: [590, 605, 598, 602, 599, 601, 600] }
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 1.5,
    price_change_percentage_1h_in_currency: -0.2,
    price_change_percentage_24h_in_currency: 1.3,
    price_change_percentage_7d_in_currency: -2.1,
    market_cap: 50000000000,
    total_volume: 500000000,
    circulating_supply: 33000000000,
    max_supply: 45000000000,
    sparkline_in_7d: { price: [1.55, 1.52, 1.48, 1.50, 1.49, 1.51, 1.5] }
  }
];