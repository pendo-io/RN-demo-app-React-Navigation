import * as React from 'react';
import Login from './components/Login';
import Plan from './components/Plan';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PendoSDK, NavigationLibraryType, WithPendoReactNavigation} from 'pendo';
import {themes} from "./components/ThemeContext";
import {ThemeProvider} from "./components/ThemeContext";

function initPendo() {
    PendoSDK.setDebugMode(true);
    const navigationOptions = {library: NavigationLibraryType.ReactNavigation};
    const pendoKey = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJkYXRhY2VudGVyIjoidXMiLCJrZXkiOiJmZWRiN2YyMDY1Y2FmYWFjZGFlZWNhMDNmOGRkNzgyNzRiNWEwNzMzZmIyMWUzNTgwOGViY2Y0YThiNTg3MjVjNmNkNzdmYzYyMDMyNmIyYjg0ZWU2YjNiNmZhY2I5OGNkZWRmMmJlOTRlMzFlNGNlNjNjYTE4NWZkNTIyYzJmM2E0OWIwMzA3YzkwZTA0OTgxY2Q1NDQ4ZWU5ZGIzYjA1YTg2OTQzYzgwYzBjZDA0YTAwNzU2MjJlMjRiYjFmMDViOGU3MzlhY2QwM2U3NmIwZjUxMGExMzBjNzI4NTVhNi5hYmMwYzk4OWVkMGFjOTAxNzNiNTMwYmEzOGIxZWJhNy41MzU1NzQwOWQ2ZjdlMTM4MjczNDkxZDc2NjhjYTNmNzJmZmJkYjU5OGMwYWJiMDk0ZTFlNDg0YzVlMWIwNGM3In0.em6YOaXKpEDAwmOCdf4CTIRDpyKbs9NNkVIZCDN6UwCkXgwtToaLO2PUoEmG0FG7te8d-i1qoowIKidCecuIb0hS9fooKHhyV36RdNGF-Icr4zs1Iw9jU7_asgZybajs7FKl7klJjmTzER8u3wRPVxiLopJG0SWCym_qw1KTaQ4';
    PendoSDK.setup(pendoKey, navigationOptions);
}

initPendo();
const Stack = createNativeStackNavigator();

function App() {
    const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);
    return (
        <ThemeProvider>
            <PendoNavigationContainer theme={themes.dark}>
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
        </ThemeProvider>
    );
}

export default App;
