import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {reset} from 'awesomeproject/src/slices/wallet/walletSlice';

const Wallet = ({navigation}) => {
  const count = useSelector(state => state.wallet.value);
  const dispatch = useDispatch();
  return (
    <View style={styles.pageView}>
      <Text>Wallet</Text>

      <View style={styles.money}>
        <Text style={styles.amount}>{count}</Text>
        <Text style={styles.currency}>TWD</Text>
      </View>
      <View style={styles.controls}>
        <Button onPress={() => dispatch(reset())} title="Reset" />
        <Button title="go home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  money: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amount: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#050505',
    margin: 10,
  },
  currency: {
    fontSize: 20,
    margin: 10,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Wallet;
