import React from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QuotesList from './src/components/QuotesList';
import QuotesRESTList from './src/components/QuotesRESTList';
import {styles} from './style';

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
export default AppNavigator;
