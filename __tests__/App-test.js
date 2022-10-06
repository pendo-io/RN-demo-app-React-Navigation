/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
//import {PendoSDK, NavigationLibraryType} from 'rn-pendo-sdk';
import {create, act} from 'react-test-renderer';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {idObj as PendoSDK} from 'identity-obj-proxy';


it('renders correctly', async () => {
  let tree
  act(()=>{
     tree = renderer.create(<App />);
  })
  
  expect(tree.toJSON()).toMatchSnapshot();
});
