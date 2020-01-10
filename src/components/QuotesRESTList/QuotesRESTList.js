import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {styles} from './style';
import {SearchBar, Button} from 'react-native-elements';
import {View, Text, TouchableHighlight, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getQuotes} from '../../services/quoteService';
import QuoteRESTItem from '../QuoteRESTItem';

const QUOTES_PER_PAGE = 10;

const QuotesRESTList = ({navigation}) => {
  const [quotes, setQuotes] = useState([]);
  const [quotesFiltered, setQuotesFiltered] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const totalPages = Math.ceil(quotes.length / QUOTES_PER_PAGE);

  useEffect(() => {
    async function fetchData() {
      const quotesRes = await getQuotes();
      setQuotes(quotesRes);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = value => {
    console.log(value);

    if (value.length > 0) {
      setQuotesFiltered(
        quotes.filter(item =>
          item.symbol.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setQuotesFiltered([]);
    }

    setSearchSymbol(value);
  };

  const goNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const goPreviousPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <View style={styles.QuotesRESTListContainer}>
      <SearchBar
        placeholder="Search Currency..."
        value={searchSymbol}
        onChangeText={handleChange}
      />

      <FlatList
        data={
          searchSymbol.length > 0
            ? quotesFiltered
            : quotes.slice(
                (currentPage - 1) * QUOTES_PER_PAGE,
                currentPage * QUOTES_PER_PAGE,
              )
        }
        renderItem={({item, index, separators}) => (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('QuotesRESTItem', {
                quoteName: item.symbol,
                quoteDescription: item.description,
              });
            }}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={styles.currencyList}>
              <Text>{item.symbol}</Text>
            </View>
          </TouchableHighlight>
        )}
      />

      {searchSymbol.length === 0 && (
        <View style={styles.paginationControllBlock}>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              title="Previous"
              onPress={goPreviousPage}
            />
          </View>
          <View style={styles.paginationControllBlockText}>
            <Text>
              {currentPage} of {totalPages}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button style={styles.buttons} title="Next" onPress={goNextPage} />
          </View>
        </View>
      )}
    </View>
  );
};

const Stack = createStackNavigator();

const QuotesRESTApp = () => (
  <Stack.Navigator>
    <Stack.Screen name="QuotesRESTList" component={QuotesRESTList} />
    <Stack.Screen name="QuotesRESTItem" component={QuoteRESTItem} />
  </Stack.Navigator>
);

export default QuotesRESTApp;
