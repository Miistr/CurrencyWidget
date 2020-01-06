import axios from 'axios';
import qs from 'qs';
import {InstaForexQoutesList} from 'react-native-dotenv';

export const getQuotes = async () => {
  try {
    const {
      data: {quotesList},
    } = await axios.get(InstaForexQoutesList);
    return quotesList;
  } catch (error) {
    console.error(error);
  }
};

export const getQuoteBySymbol = async symbol => {
  const query = qs.stringify({q: symbol}, {addQueryPrefix: true});
  try {
    const response = await axios.get(
      `https://quotes.instaforex.com/api/quotesTick${query}`,
    );
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};
