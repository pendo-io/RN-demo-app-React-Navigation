import * as React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import Plan from './components/Plan';
import AnotherTry from './components/AnotherTry';
import {observer} from "mobx-react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PendoSDK, NavigationLibraryType, WithPendoReactNavigation} from 'rn-pendo-sdk';
import {themes} from "./components/ThemeContext";
import {ThemeProvider} from "./components/ThemeContext";
import {User} from 'react-native-feather';


function initPendo() {
    PendoSDK.setDebugMode(true);
    const navigationOptions = {library: NavigationLibraryType.ReactNavigation};
    const pendoKey = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJkYXRhY2VudGVyIjoidXMiLCJrZXkiOiJkNjM0ZjMzMDVlZTkzZGRkZWYzYjlhZmFjYTU2NzM0NTg4Zjg4ZDRjNjdjMmFmMjliMzIyYjU5M2FjNzdhY2RlZGYyOWYzYzA1ODYwNDNkYTBhM2Y3NWIzZTZmY2ViOTU0ZGEyNjk3NjBiM2I1OWM5MDFlYzEwNDY2ZTgyODE3OGI4NDNhMGQ2ODRmYWNkMTY3OGRhNmU4OGM1YzQ2ZTdjNzYxNDczMWE0ZjM2YzFjYzg0YmY0Y2I5Y2U3ZjE4MmQ3MDlhNTM4YzAyYTdjMGU5MzVkY2IyYzBkMDdmNTE1ZC5hNmRjMDEwOWQ3M2VlMzQ5NmZmMWQyMGE1ODllNGU1NS41MDU0NGY5MDA0MThiY2RlMDlhYTQ4ZjdhZTc3NzM1MDYzZjQ2OTljNmQ3NGExMTFkNDYxMzYwMjRjMTM2OTEzIn0.gFG5Bli6kf8_Yzyz781pS7qgT6EMi0EtyNzn-Uj6gqfpxhOui_uiJGCMMLbQ4KDmjVGqzBR-l1d3AZgtqfqG21962gXvgv_xU-8tsHqZqoT_9oKsrko2Co0Xz2WeuDRlgclekKQ9TUYBq8Vx0mU3LqiPrrA8GLnPaCTPsUpNIHw';
    const naorProd = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJkYXRhY2VudGVyIjoidXMiLCJrZXkiOiI4NzkwOTg2ODc2YmUzZmZjMTIwNDAyMTdlYWYzZDM3NDdkYjM0NjJlZWQyNmEzODUxZWY1Y2Q2OTA5MTE0YWJmYmVjZTk2MzUzYjQ5ZGFjNDVkNDBjODI1MTZiYThiNDZiZTU2ODExZWIwNzVlMTZkNzcwNTYzZWNhODhmMWQ1MGVjNzc0ZTc0MmZmYWJlYzQ0MTFkNzVjMWIxNDhiN2ZhYjQ5MTIwNzM5ZjY1YTFjNjk1ZDEyZjM4MWQ1NDUyMGQ4ZmU5ZDJmNTEwZGIyZDk2NmRhM2RlNTkwMDNkZWQ0OS5mNGRmYzhiOTQ5YjZmZjgyNzM0YWRjOTM2Mjg3OGE4OC43YTM3ZjlkY2M3MDg5MGY0YzE3NzExNzY4ODQwM2MzMDcxMjdjZjM1MDM1MjZkNjBhMTBmZDhiNzkwYmRhZWE0In0.ZqJOJSoTZxQwVphkqTd1gkk6ff1m-PnKRJWkrsC6dAbfgbbMd9Bmayq0TzN4oOmZ2BhPY-3fFS0VS13QECNq08aOhhzyhwHfI6_IB-PP6u_wSyiceFawFwAI8fylfxolcu7dlho0wEWuZyvm1SbS3Nq6heNH2pg6WrO_pxcckeA';
    PendoSDK.setup(naorProd, navigationOptions);
    PendoSDK.startSession("visitorId", "accountId", null, null);

}

initPendo();
const Stack = createNativeStackNavigator();
const Tab = observer(createBottomTabNavigator());

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName={'Plan'}
        screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarLabelPosition: 'below-icon',
            headerShown: false,
            lazy: false,
            tabBarLabelStyle: {
                bottom: 4,
                position: 'relative',
                paddingTop: 0
            },
            tabBarItemStyle: {
                borderWidth: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }}
    >
        <Tab.Screen
            name={'Plan'}
            component={Plan}
            options={{
                tabBarLabel: 'Plan',
                tabBarIcon: ({color, size, focused}) => (
                    <User color={focused ? '#0000FF' : '#FFFFFF'} size={21} style={{marginTop: -2}}/>
                ),
            }}
        />
        <Tab.Screen
            name={'Login1'}
            component={Login}
            options={{
                tabBarLabel: 'Login',
                tabBarIcon: ({color, size, focused}) => (
                    <User color={focused ? '#0000FF' : '#FFFFFF'} size={21} style={{marginTop: -2}}/>
                ),
            }}
        />
         <Tab.Screen
            name={'AnotherTry'}
            component={AnotherTry}
            options={{
                tabBarLabel: 'AnotherTry',
                tabBarIcon: ({color, size, focused}) => (
                    <User color={focused ? '#0000FF' : '#FFFFFF'} size={21} style={{marginTop: -2}}/>
                ),
            }}
        />
    </Tab.Navigator>
)

function App() {
    const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);

    return (
        <ThemeProvider>
            <PendoNavigationContainer theme={themes.dark}>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false
                    }}>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />
                    <Stack.Screen
                        name='TabNav'
                        component={TabNavigator}/>
                    <Stack.Screen
                        name='AnotherTry'
                        component={AnotherTry}/>
                </Stack.Navigator>
            </PendoNavigationContainer>
        </ThemeProvider>
    );
}

export default App;
