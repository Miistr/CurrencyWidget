import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import io from 'socket.io-client';
import {StyleSheet} from 'react-native';
import QuoteItem from '../QuoteItem';
import {InstaForexSocketApi} from 'react-native-dotenv';

const quotesMapping = quotes =>
  quotes.reduce((object, quote) => ({...object, [quote]: {}}), {});

export const QuotesList = ({quotes}) => {
  const [quotesInfo, setQuotesInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setQuotesInfo({...quotesMapping(quotes)});

    const socket = io(InstaForexSocketApi);

    socket.on('connect', () => {
      socket.emit('subscribe', quotes);
      setLoading(false);
    });

    socket.on('quotes', ({msg: updatedQuote}) => {
      quotesInfo[updatedQuote.symbol] = {...updatedQuote};
      setQuotesInfo({...quotesInfo});
    });

    return () => {
      socket.removeAllListeners();
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes]);

  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <View style={styles.container}>
      {Object.values(quotesInfo).map(quote => (
        <QuoteItem {...quote} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
});
