import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen.web';
import ResultScreen from '../screens/ResultScreen.web';
import HistoryScreen from '../screens/HistoryScreen.web';
import EducationScreen from '../screens/EducationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from './types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../localization/translations';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#2E7D32' },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyle: { backgroundColor: '#F5F5F5', flex: 1 },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ title: t.navigation.camera }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: t.navigation.result, headerLeft: () => null }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: t.home.history }}
      />
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        options={{ title: t.home.education }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t.home.settings }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
