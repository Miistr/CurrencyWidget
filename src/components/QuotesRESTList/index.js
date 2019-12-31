import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {View, Text, TouchableHighlight, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getQuotes, getQuoteBySymbol} from '../../services/quoteService';

const QUOTES_PER_PAGE = 10;

const QuotesRESTList = ({navigation}) => {
  const [quotes, setQuotes] = useState([]);
  const [quotesFiltered, setQuotesFiltered] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(quotes.length / QUOTES_PER_PAGE);

  useEffect(() => {
    async function fetchData() {
      const quotesRes = await getQuotes();
      setQuotes(quotesRes);
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

  return (
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

const QuoteRESTItem = ({route}) => {
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

const Stack = createStackNavigator();

const App = () => (
  <Stack.Navigator>
    <Stack.Screen name="QuotesRESTList" component={QuotesRESTList} />
    <Stack.Screen name="QuotesRESTItem" component={QuoteRESTItem} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  currentQuoteList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationControllBlock: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  currencyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  buttons: {
    flex: 1,
    backgroundColor: 'black',
  },
  QuotesRESTListContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
  },
  paginationControllBlockText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
