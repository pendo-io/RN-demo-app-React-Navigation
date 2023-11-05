// /**
//  * Metro configuration for React Native
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//     minifierConfig: {
//       keep_classnames: true, // Preserve class names
//       keep_fnames: true, // Preserve function names
//       mangle: {
//         keep_classnames: true, // Preserve class names
//         keep_fnames: true, // Preserve function names
//       }
//     }
//   },
// };




// // //local plugin vvvv
// // /**
// // Metro configuration for React Native
// // @format
// // **/

const path = require('path');

const extraNodeModules = {
  'rn-pendo-sdk': path.resolve(__dirname + '../../../react-native-pendo-sdk-v2/src'),
};

const watchFolders = [
  //path.resolve(__dirname, "./src")
  path.resolve(__dirname + '../../../react-native-pendo-sdk-v2/src')
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};