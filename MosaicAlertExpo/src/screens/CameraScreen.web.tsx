import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { translations } from '../localization/translations';
import { useLanguage } from '../context/LanguageContext';
import { RootStackParamList } from '../navigation/types';

type CameraNavigation = NavigationProp<RootStackParamList, 'Camera'>;

const previewLeaf = require('../../assets/icon.png') as ImageSourcePropType;

const CameraScreen = () => {
  const navigation = useNavigation<CameraNavigation>();
  const { lang } = useLanguage();

  const simulateScan = () => {
    navigation.navigate('Result', {
      photoPath: Image.resolveAssetSource(previewLeaf).uri,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewFrame}>
        <Image source={previewLeaf} style={styles.previewImage} resizeMode="cover" />
      </View>

      <View style={styles.overlay}>
        <View style={styles.guideCircle} />
        <Text style={styles.guideText}>{translations[lang].camera.guide}</Text>
        <Text style={styles.webNote}>Web preview — camera runs on device builds.</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.captureButton} onPress={simulateScan}>
          <Text style={styles.captureText}>{translations[lang].camera.capture}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewFrame: {
    ...StyleSheet.absoluteFill,
    opacity: 0.45,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 24,
  },
  guideCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
  guideText: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  webNote: {
    color: '#EEE',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    width: 180,
    height: 60,
    backgroundColor: '#2E7D32',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  captureText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CameraScreen;
