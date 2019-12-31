import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Amount, {amountTypes, amountStyles} from '../Amount';

export const QuoteItem = ({ask, bid, change, symbol}) => {
  return (
    <View key={symbol} style={styles.quoteRow}>
      <Text>{symbol}:</Text>
      <Amount value={ask} />
      <Amount value={change} type={amountTypes.PERFORMANCE} />
      <Amount
        value={((ask - bid) / ask) * 100}
        type={amountTypes.PERFORMANCE}
        amountStyle={amountStyles.PERCENT}
        maxDecimals={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  quoteRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
