import { Platform } from 'react-native';

type TtsModule = {
  getInitStatus: () => Promise<string | number>;
  setDefaultLanguage: (lang: string) => void;
  speak: (text: string) => void;
  stop: (wait?: boolean) => void;
};

const webTts: TtsModule = {
  getInitStatus: async () => 'success',
  setDefaultLanguage: () => {},
  speak: () => {},
  stop: () => {},
};

const Tts: TtsModule =
  Platform.OS === 'web' ? webTts : require('react-native-tts').default;

export default Tts;
