import React from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QuotesList from './src/components/QuotesList';
import QuotesRESTList from './src/components/QuotesRESTList';
import {StyleSheet} from 'react-native';

const QuotesSocket = () => (
  <QuotesList quotes={['EURUSD', '#Bitcoin', 'USDJPY', 'USDCHF', 'USDCAD']} />
);

const QuotesREST = () => <QuotesRESTList />;

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <NavigationNativeContainer style={styles.navigationContainer}>
    <Tab.Navigator>
      <Tab.Screen
        style={styles.navigatonTab}
        name="SOCKET.IO"
        component={QuotesSocket}
      />
      <Tab.Screen
        style={styles.navigatonTab}
        name="REST"
        component={QuotesREST}
      />
    </Tab.Navigator>
  </NavigationNativeContainer>
);
const styles = StyleSheet.create({
  navigatonTab: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  navigationContainer: {
    backgroundColor: 'red',
    flex: 1,
    padding: 10,
  },
});

export default AppNavigator;
