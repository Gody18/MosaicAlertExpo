import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator.web';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import DatabaseService from './src/db/DatabaseService.web';
import InferenceService from './src/ml/InferenceService.web';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>MosaicAlert failed to load</Text>
          <Text style={styles.errorText}>{this.state.error.message}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { isReady: languageReady } = useLanguage();
  const [servicesReady, setServicesReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await DatabaseService.initDB();
        await InferenceService.initModel();
      } catch (error) {
        console.error('App bootstrap failed:', error);
      } finally {
        setServicesReady(true);
      }
    };

    bootstrap();
  }, []);

  if (!languageReady || !servicesReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Loading MosaicAlert...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F5F5F5',
  },
  loading: {
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF3F3',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B71C1C',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
