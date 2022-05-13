import React from 'react';

import {Button, View, Text, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.pageView}>
      <Text style={styles.title}>Horse Races!</Text>
      <View style={styles.controls}>
        <Button title="Wallet" onPress={() => navigation.navigate('Wallet')} />
        <Button title="Bid" onPress={() => navigation.navigate('Bid')} />
        <Button
          title="History"
          onPress={() => navigation.navigate('History')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {
    fontSize: 50,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
