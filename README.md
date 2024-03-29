# Pendo Demo app (React Native & React Navigation)
This project is aimed at providing information on how to integrate the Pendo SDK with React Native applications,   
in particular those developed with React Navigation.

Here's a sample To-Do app to show how the Pendo SDK can be integrated into any app.

## To-Do app: Project Description
In the sample app you will be able to:

1. Login into the app (No real authentication mechanism is present as it is not necessary for the purpose of this project - any username and password will "log" you into the app).
<img src="https://user-images.githubusercontent.com/93860419/160425292-df4b5b35-5ed6-4505-bc8d-29a2ffb535f4.gif" width="180" height="380"/>

2. Logout.   
<img src="https://user-images.githubusercontent.com/93860419/160425507-491e7e45-bf21-43d3-8c8f-c55fd6652ee9.gif" width="180" height="380"/>

3. Add new tasks.
<img src="https://user-images.githubusercontent.com/93860419/160425658-7685d264-90a7-407f-a3d8-7909a8e3c7a3.gif" width="180" height="380"/>

4. Remove tasks (Tapping on an existing task will remove it).
<img src="https://user-images.githubusercontent.com/93860419/160426117-5202a426-b948-4086-98b4-cbe611c65511.gif" width="180" height="380"/>

## Pendo SDK integration 

In this section you will be presented with the **actual steps** taken to integrate the Pendo SDK into the example To-Do app.

### Android:

1. In the application folder, run the following commands:
```
npm install --save rn-pendo-sdk
```
or
```
yarn add rn-pendo-sdk
```

2. In the application build.gradle file.     
Add Pendo Repository to the repositories section:  

(build.gradle lines 39-42)
```
        maven {
          url "https://software.mobile.pendo.io/artifactory/androidx-release"
        }
        mavenCentral()
```

3. In the application Android.manifest file.  
If applicable, add the following ```<uses-permission>``` to the manifest in the ```<manifest>``` tag:
  
(Android.manifest lines 4-5)
```
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

4. Add the following ```<activity>``` to the manifest in the ```<application>``` tag:  
**IMPORTANT**: don't forget to replace ```"YOUR-APP-SCHEME"``` with your own app scheme. 
  
(Android.manifest lines 25-32)
```
      <activity android:name="sdk.pendo.io.activities.PendoGateActivity" android:launchMode="singleInstance">
        <intent-filter>
          <action android:name="android.intent.action.VIEW"/>
          <category android:name="android.intent.category.DEFAULT"/>
          <category android:name="android.intent.category.BROWSABLE"/>
          <data android:scheme="YOUR-APP-SCHEME"/>
        </intent-filter>
      </activity>
```

### iOS:

1. In the application folder, run the following commands:  
```
npm install --save rn-pendo-sdk
```
or
```
yarn add rn-pendo-sdk
```
2. In the iOS folder and run the following command:  
```
pod install 
```
3. In the application AppDelegate file add the following code:
    
(AppDelegate.m line 6)
 ```
 @import Pendo;
 ```
  
(AppDelegate.m lines 53-63)
```
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    if ([[url scheme] containsString:@"pendo"]) {
        [[PendoManager sharedManager] initWithUrl:url];
        return YES;
    }
    //  your code here ...
    return YES;
}
```

### React Native / Javascript

1. In the application metro.config.js.  
   Add the following statements in the transformer:

(metro.config.js lines 16-23)
```
  minifierConfig: {
      keep_classnames: true, // Preserve class names
      keep_fnames: true, // Preserve function names
      mangle: {
        keep_classnames: true, // Preserve class names
        keep_fnames: true, // Preserve function names
      }
    }
```

2. In the application main file (App.js), add the following code:  
   **IMPORTANT**: don't forget to replace ```'YOUR-APP-KEY'``` with your own app key.

(App.js lines 6-16)
```
import {PendoSDK, NavigationLibraryType} from 'rn-pendo-sdk';
import {WithPendoReactNavigation} from 'rn-pendo-sdk';

function initPendo (){
  const navigationOptions = {library: NavigationLibraryType.ReactNavigation};
  const pendoKey = 'YOUR-APP-KEY';
  PendoSDK.setup(pendoKey, navigationOptions);
}

initPendo();
```
2. Initialize Pendo where your visitor is being identified (e.g. login, register, etc.).  
   **IMPORTANT**: The following is an example of a possible user or "visitor" logging into your application.  
   Passing null or "" to the visitorId will generate an anonymous visitor id.

(Login.js 28-33)
```
      const visitorId = 'VISITOR-UNIQUE-ID';
      const accountId = 'ACCOUNT-UNIQUE-ID';
      const visitorData = {Age: '25', Country: 'USA'}; // example data
      const accountData = {Tier: '1', Size: 'Enterprise'}; // example data

      PendoSDK.startSession(visitorId, accountId, visitorData, accountData);
```

3. Add the following code in the method that creates the `NavigationContainer` (e.g. RootNavigator) and returns the NavigationContainer wrapped using `WithPendoReactNavigation`:  
   **IMPORTANT**: This function must be called after PendoSDK.setup completes

(App.js 20-52)
```
function App() {
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

export default App
```
4. If you are using React Native Modal, you need to wrap it using `WithPendoModal`
```javascript
const PendoModal = WithPendoModal(Modal);
<PendoModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
           Alert.alert('Modal has been closed.');
           setModalVisible(!modalVisible);
        }}>
   <View style={styles.centeredView}>
      <View style={styles.modalView}>
         <Text style={styles.modalText}>Hello World!</Text>
         <Pressable
                 style={[styles.button, styles.buttonClose]}
                 onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
         </Pressable>
      </View>
   </View>
</PendoModal>
```

(Plan.js 43-107)
## Questions 
You can notify us of any issues under the issues tab.
