import * as React from 'react';
import Login from './components/Login';
import Plan from './components/Plan';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PendoSDK, NavigationLibraryType} from 'rn-pendo-sdk';
import {withPendoRN} from 'rn-pendo-sdk';
import {useRef} from 'react';

function initPendo (){
  const navigationOptions = {library: NavigationLibraryType.ReactNavigation, navigation: null};
  const pendoKey = 'YOUR-APP-KEY';
  PendoSDK.setup(pendoKey, navigationOptions);

}
initPendo();

const Stack = createNativeStackNavigator();

function App(props) {

  const navigationRef = useRef();

  return (
    <NavigationContainer 
    ref={navigationRef}
    onStateChange={()=> {
      const state = navigationRef.current.getRootState()
      props.onStateChange(state);
    }} 
    onReady ={()=>{
      const state = navigationRef.current.getRootState()
      props.onStateChange(state);
    }}>
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
    </NavigationContainer>
  );
}

export default withPendoRN(App)


