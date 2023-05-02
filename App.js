import * as React from 'react';
import Login from './components/Login';
import Plan from './components/Plan';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PendoSDK, NavigationLibraryType, WithPendoReactNavigation} from 'rn-pendo-sdk';

function initPendo (){
  const navigationOptions = {library: NavigationLibraryType.ReactNavigation};
  const pendoKey = 'YOUR-APP-KEY';
  PendoSDK.setup(pendoKey, navigationOptions);

}
initPendo();

const Stack = createNativeStackNavigator();

function App(props) {
  const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);
  return (
    <PendoNavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
        name='Plan'
        component={Plan}/>
      </Stack.Navigator>
    </PendoNavigationContainer>
  );
}

export default App;


