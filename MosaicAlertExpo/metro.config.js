const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('tflite');

const nativeOnlyModules = new Set([
  'react-native-fast-tflite',
  'react-native-vision-camera',
  'react-native-sqlite-storage',
  'react-native-fs',
  'react-native-tts',
]);

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && nativeOnlyModules.has(moduleName)) {
    return {
      type: 'empty',
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
