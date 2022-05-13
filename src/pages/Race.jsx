import React, {useEffect, useState, useCallback} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
//import * as Progress from 'react-native-progress';
import {validateEmptyObject} from '../utils/validation';

import {updateRaceState} from 'awesomeproject/src/utils/updateRaceState';

import {useSelector, useDispatch} from 'react-redux';
import {addHistoryItem} from 'awesomeproject/src/slices/history/historySlice';
import {updateMultiplierByWinnerId} from 'awesomeproject/src/slices/horses/horsesSlice';
import {setWalletAmount} from 'awesomeproject/src/slices/wallet/walletSlice';
import RaceBars from 'awesomeproject/src/pages/RaceBars';

const Race = ({route, navigation}) => {
  const count = useSelector(state => state.wallet.value);
  const horses = useSelector(state => state.horses);
  const initState = horses.map(horse => ({...horse, progress: 0}));
  const dispatch = useDispatch();

  const {bid, bidHorse, bidTWD} = route.params;
  const [winHorse, setWinHorse] = useState({});
  const [racing, setRacing] = useState(false);
  const [state, setState] = useState(initState);
  const checkWinner = raceStatus => {
    return raceStatus.filter(horse => horse.progress >= 1);
  };
  useEffect(() => {
    if (racing) {
      race();
    }
  }, [state, racing, race]);

  const race = useCallback(() => {
    if (validateEmptyObject(winHorse)) {
      setRacing(true);
      setTimeout(() => setState(newState), 200);
      let newState = updateRaceState(state);
      let winner = checkWinner(newState);
      if (winner.length > 0) {
        setRacing(false);
        setWinHorse(winner[0]);
        dispatch(updateMultiplierByWinnerId(winner[0].id));
        const win = bidHorse.id === winner[0].id;
        const earnings = win ? Math.round(bidTWD * winner[0].multiplier) : 0;
        const historyItem = {
          date: new Date().toLocaleString(),
          bidUSD: bid,
          bidHorse: bidHorse.name,
          raceWinner: winner[0].name,
          earnings: win ? earnings : 0,
          remainder: win ? count + earnings : count - bidTWD,
        };
        dispatch(addHistoryItem(historyItem));
        dispatch(setWalletAmount(historyItem.remainder));
        setWinHorse(winner[0]);
      }
    }
  }, [
    bid,
    bidHorse.id,
    bidHorse.name,
    bidTWD,
    count,
    dispatch,
    state,
    winHorse,
  ]);

  return (
    <View style={styles.pageView}>
      <Text style={styles.title}>Race</Text>
      <Text>
        Bid Placed: {bid} USD on {bidHorse.name}
      </Text>
      <View>
        <Text style={styles.winner}>
          {!validateEmptyObject(winHorse) ? `${winHorse.name} Won!` : null}
        </Text>
      </View>
      <View style={styles.raceButton}>
        {validateEmptyObject(winHorse) ? (
          <Button title="Start Race" onPress={race} />
        ) : null}
      </View>
      <RaceBars status={state} horses={horses} />
      <View style={styles.controls}>
        <Button title="Race again" onPress={() => navigation.navigate('Bid')} />
        <Button title="go home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  raceTrack: {
    margin: 20,
    width: 200,
  },
  title: {
    fontSize: 50,
  },
  raceButton: {
    margin: 20,
  },
  winner: {
    fontSize: 30,
    color: '#c00',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Race;
