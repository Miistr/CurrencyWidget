import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getQuoteBySymbol} from '../../services/quoteService';
import {StyleSheet} from 'react-native';

export const QuoteRESTItem = ({route}) => {
  const {quoteName, quoteDescription} = route.params;
  const [currentQuote, setCurrentQuote] = useState({});
  useEffect(() => {
    async function fetchData() {
      const quotesRes = await getQuoteBySymbol(quoteName);
      setCurrentQuote(quotesRes);
    }
    fetchData();
  }, [quoteName]);
  return (
    <View style={styles.currentQuoteList}>
      <Text>{quoteDescription}</Text>
      <Text>{currentQuote.symbol}</Text>
      <Text>Digits:{currentQuote.digits}</Text>
      <Text>Ask:{currentQuote.ask}</Text>
      <Text>Bid:{currentQuote.bid}</Text>
      <Text>Change:{currentQuote.change}</Text>
      <Text>Change24:{currentQuote.change24h}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentQuoteList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
