import React from 'react';
import {View, Button, FlatList, Text, StyleSheet} from 'react-native';
//import {historyData} from 'awesomeproject/src/data/history.js';
import {useSelector, useDispatch} from 'react-redux';
import {
  //addHistoryItem,
  removeHistoryItem,
} from 'awesomeproject/src/slices/history/historySlice';

const HistoryItem = ({item}) => {
  const dispatch = useDispatch();
  return (
    <View key={item.date} style={styles.item}>
      <View style={styles.propGroup}>
        <View style={styles.itemProperties}>
          <Text style={styles.itemBidResultLabel}>Bid: </Text>
          <Text style={styles.itemBidResult}>{item.bidUSD} USD</Text>
        </View>
        <View style={styles.itemProperties}>
          <Text style={styles.itemBidCostLabel}>Bid horse: </Text>
          <Text style={styles.itemBidCost}>{item.bidHorse}</Text>
        </View>
        <View style={styles.itemProperties}>
          <Text style={styles.itemRaceResultLabel}>Race Winner: </Text>
          <Text style={styles.itemRaceResult}>{item.raceWinner}</Text>
        </View>
        <View style={styles.itemProperties}>
          <Text style={styles.itemEarningsLabel}>Earnings: </Text>
          <Text style={styles.itemEarnings}>{item.earnings} TWD</Text>
        </View>
        <View style={styles.itemProperties}>
          <Text style={styles.itemRemainderLabel}>Remainder: </Text>
          <Text style={styles.itemRemainder}>{item.remainder} TWD</Text>
        </View>
        <View style={styles.itemProperties}>
          <Text style={styles.itemRemainderLabel}>Date: </Text>
          <Text style={styles.itemRemainder}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.itemRemove}>
        <Button
          title="remove"
          color="red"
          onPress={() => dispatch(removeHistoryItem(item.date))}
          accessibilityLabel="Button to remove history entry"
        />
      </View>
    </View>
  );
};

const History = ({navigation}) => {
  const renderItem = ({item}) => <HistoryItem item={item} />;
  const historyData = useSelector(state => state.history);

  return (
    <View style={styles.pageView}>
      <Text>History</Text>
      <Button title="go home" onPress={() => navigation.navigate('Home')} />
      <FlatList
        style={styles.historyList}
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  historyList: {padding: 10, width: '100%'},
  item: {
    backgroundColor: '#ddd',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propGroup: {
    backgroundColor: '#eee',
    flex: 4,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
  },
  itemRemove: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default History;
