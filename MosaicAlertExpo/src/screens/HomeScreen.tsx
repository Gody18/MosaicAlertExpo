import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { translations } from '../localization/translations';
import { useLanguage } from '../context/LanguageContext';
import { RootStackParamList } from '../navigation/types';

type HomeNavigation = NavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigation>();
  const { lang } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MosaicAlert</Text>
        <Text style={styles.subtitle}>Cassava Health Assistant</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.scanButtonText}>
            {translations[lang].home.scan_leaf}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.footerButtonText}>
            {translations[lang].home.history}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Education')}
        >
          <Text style={styles.footerButtonText}>
            {translations[lang].home.education}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.footerButtonText}>
            {translations[lang].home.settings}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scanButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  footerButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#333',
    fontWeight: '600',
  },
});

export default HomeScreen;
