import React from 'react';
import {Text, View} from 'react-native';
import Amount, {amountTypes, amountStyles} from '../Amount';
import {styles} from './style';

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
