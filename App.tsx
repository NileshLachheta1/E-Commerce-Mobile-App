/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackNavigator from './navigation/StackNavigator.js';
import { Provider } from 'react-redux';
import store from './store.js';
import { UserContext } from './UserContext.js';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
        </UserContext>
      </Provider>
    </>
  )
}

export default App;
