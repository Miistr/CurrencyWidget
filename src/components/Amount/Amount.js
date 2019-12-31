import React from 'react';
import {Text} from 'react-native';
import {oneOf, number, oneOfType, string} from 'prop-types';
import {StyleSheet} from 'react-native';
import NumberFormat from 'react-number-format';

export const amountTypes = {
  PERFORMANCE: 'performance',
  DEFAULT: 'default',
};

export const amountStyles = {
  DECIMAL: 'decimal',
  PERCENT: '%',
};

export const Amount = ({value, type, amountStyle, maxDecimals}) => {
  let amount = Number(value);
  const isNumberPositive = amount > 0;
  const isNotANumber = Number.isNaN(amount);
  let amountPrefix = '';
  let ownStyle;

  if (isNotANumber) {
    return <Text style={{...amount}}>{value}</Text>;
  }

  if (amountTypes.PERFORMANCE === type) {
    amountPrefix = isNumberPositive && '+';
    ownStyle = isNumberPositive ? styles.positiveColor : styles.negativeColor;
  }

  return (
    <NumberFormat
      value={amount}
      decimalScale={maxDecimals}
      displayType={'text'}
      suffix={amountStyle}
      prefix={amountPrefix}
      renderText={value => (
        <Text style={[ownStyle, styles.amount]}>{value}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  amount: {
    width: 55,
    marginHorizontal: 10,
  },
  positiveColor: {
    color: 'green',
  },
  negativeColor: {
    color: 'red',
  },
});

Amount.propTypes = {
  value: oneOfType([number, string]).isRequired,
  minDecimals: number,
  maxDecimals: number,
  type: oneOf(Object.values(amountTypes)),
  amountStyle: oneOf(Object.values(amountStyles)),
  className: string,
};

Amount.defaultProps = {
  className: null,
  minDecimals: 0,
  maxDecimals: 4,
  type: null,
};
