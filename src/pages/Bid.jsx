import React, {useState} from 'react';
import {Button, View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useGetRateByCurrencyQuery} from '../services/rtkFetchRate';
import {
  validateObject,
  validateNumber,
} from 'awesomeproject/src/utils/validation';
import {useSelector} from 'react-redux';

const Bid = ({navigation}) => {
  const horses = useSelector(state => state.horses);
  const [selectedHorse, setSelectedHorse] = useState();
  const [bidPrice, onChangeBidPrice] = useState();
  const {data, error, isLoading} = useGetRateByCurrencyQuery('usd');

  const validateBid = () => {
    if (!validateNumber(Number(bidPrice))) {
      Alert.alert(
        'Invalid amount input',
        'Bid price invalid, must be under 10 USD',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else if (!validateObject(selectedHorse)) {
      Alert.alert(
        'Horse not Selected',
        'Please select a horse by pressing the triangle.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else if (!data) {
      Alert.alert(
        'Exchange Error',
        'Could not get USD->TWD exchange rate. Please try again later.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      );
    } else {
      Alert.alert(
        'Confirm Bid',
        `Placing a bid for ${bidPrice} USD on ${
          selectedHorse.name
        } costing ${Math.round(bidPrice * data.rates.TWD)} TWD?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () =>
              navigation.navigate('Race', {
                bid: bidPrice,
                bidHorse: selectedHorse,
                bidTWD: Math.round(bidPrice * data.rates.TWD),
              }),
          },
        ],
      );
    }
  };

  return (
    <View style={styles.pageView}>
      <Text style={styles.title}>Bid</Text>
      <View style={styles.money}>
        <TextInput
          style={styles.inputMoney}
          onChangeText={onChangeBidPrice}
          value={bidPrice}
          placeholder="Input bid amount"
          keyboardType="numeric"
        />
        <Text style={styles.currency}>USD</Text>
      </View>
      <Picker
        style={styles.picker}
        selectedValue={selectedHorse}
        onValueChange={(itemValue, itemIndex) => setSelectedHorse(itemValue)}>
        <Picker.Item
          style={styles.pickerItem}
          label="Select horse"
          enabled={false}
        />

        {horses.map(horse => (
          <Picker.Item
            key={horse.id}
            style={styles.pickerItem}
            label={`${horse.name} - ${Math.round(horse.multiplier * 10) / 10}x`}
            value={horse}
          />
        ))}
      </Picker>
      <View style={styles.controls}>
        <Button title="go home" onPress={() => navigation.navigate('Home')} />
        <Button title="Place Bid" onPress={validateBid} />
      </View>
      <View>
        <Text>
          {error
            ? 'There was an error fetching exchange rates.'
            : isLoading
            ? 'Loading exchange rate...'
            : data
            ? `1 USD = ${data.rates.TWD} TWD`
            : null}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputMoney: {
    fontSize: 30,
  },
  currency: {
    color: '#F55',
    fontSize: 20,
    margin: 10,
  },
  picker: {
    width: '90%',
    backgroundColor: '#ddd',
    padding: 20,
  },
  pickerItem: {
    fontSize: 25,
  },
  title: {
    fontSize: 50,
  },
  controls: {
    margin: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Bid;
