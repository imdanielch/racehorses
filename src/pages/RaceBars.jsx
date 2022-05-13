import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

const RaceBars = ({horses, status}) => {
  useEffect(() => {}, [status]);

  return (
    <View style={styles.raceTrack}>
      {horses.map(horse => (
        <View key={horse.id} style={styles.raceHorse}>
          <Text>{horse.name}:</Text>
          <Progress.Bar
            progress={status.filter(h => h.id === horse.id)[0].progress}
            width={200}
          />
        </View>
      ))}
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

export default RaceBars;
