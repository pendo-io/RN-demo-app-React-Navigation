const path = require('path');

const extraNodeModules = {
  'pendo': path.resolve('/Users/udi.levin/Documents/GitHub/react-native-pendo-sdk/lib/'),
};

const watchFolders = [
  //path.resolve(__dirname, "./src")
  path.resolve('/Users/udi.levin/Documents/GitHub/react-native-pendo-sdk/lib/')

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
