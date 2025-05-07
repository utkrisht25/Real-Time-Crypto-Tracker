import { createSlice } from '@reduxjs/toolkit';
import { fetchCryptoData } from '../api/cryptoApi';

const initialState = {
  coins: [],
  loading: false,
  error: null
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    fetchCoinsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoinsSuccess: (state, action) => {
      state.loading = false;
      state.coins = action.payload.map(coin => ({
        ...coin,
        // Ensure numeric values
        price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency || 0,
        price_change_percentage_24h_in_currency: coin.price_change_percentage_24h_in_currency || 0,
        price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency || 0
      }));
    },
    fetchCoinsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRandomPrices: (state) => {
      state.coins = state.coins.map(coin => {
        const randomChange = (Math.random() * 2 - 1) * 0.5; // Random between -0.5% to +0.5%
        return {
          ...coin,
          current_price: coin.current_price * (1 + randomChange/100),
          price_change_percentage_1h_in_currency: randomChange,
          price_change_percentage_24h_in_currency: randomChange * 2,
          price_change_percentage_7d_in_currency: randomChange * 5,
          total_volume: coin.total_volume * (1 + Math.random() * 0.1)
        };
      });
    }
  }
});

// Thunk for async data fetching
export const fetchCoins = () => async (dispatch) => {
  try {
    dispatch(fetchCoinsStart());
    const data = await fetchCryptoData();
    dispatch(fetchCoinsSuccess(data));
  } catch (error) {
    dispatch(fetchCoinsFailure(error.toString()));
  }
};

export const { 
  fetchCoinsStart, 
  fetchCoinsSuccess, 
  fetchCoinsFailure,
  updateRandomPrices 
} = cryptoSlice.actions;

export default cryptoSlice.reducer;