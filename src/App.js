/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store, persistor} from 'awesomeproject/src/store';

import HomeScreen from './pages/HomeScreen.jsx';
import Wallet from './pages/Wallet.jsx';
import History from './pages/History.jsx';
import Bid from './pages/Bid.jsx';
import Race from './pages/Race.jsx';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="Bid" component={Bid} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Race" component={Race} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
