import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCoinsStart, 
  fetchCoinsSuccess, 
  fetchCoinsFailure,
  updateRandomPrices 
} from './store/cryptoSlice';
import { fetchCryptoData, mockCryptoData } from './api/cryptoApi';
import CryptoTable from './components/CryptoTable';

export default function App() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector(state => state.crypto);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCoinsStart());
      try {
        const data = await fetchCryptoData();
        dispatch(fetchCoinsSuccess(data));
      } catch (error) {
        console.log('Using mock data due to API error');
        dispatch(fetchCoinsSuccess(mockCryptoData));
      }
    };

    fetchData();

    // Set up real-time updates
    const interval = setInterval(() => {
      dispatch(updateRandomPrices());
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>Crypto Price Tracker</h1>
      <CryptoTable coins={coins} />
    </div>
  );
}
