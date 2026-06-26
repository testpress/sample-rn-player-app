/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import LiveChatScreen from './src/screens/LiveChatScreen';

import HomeScreen from './src/screens/HomeScreen';
import VideoScreen from './src/screens/VideoScreen';
import DownloadListScreen from './src/screens/DownloadListScreen';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://344854d7be5b2276b8f2113aa73bce08@o4511568700637184.ingest.us.sentry.io/4511585727938560',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Enable SDK debug logging (useful for diagnosing setup issues)
  debug: __DEV__,

  // iOS workaround: native Sentry Cocoa SDK transport silently drops events
  // on RN new architecture. Using JS fetch() transport instead.
  // Android continues to use the native transport (works correctly).
  enableNative: Platform.OS !== 'ios',

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'TPStreams Player' }}
          />
          <Stack.Screen
            name="Video"
            component={VideoScreen}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="DownloadList"
            component={DownloadListScreen}
            options={{ title: 'Downloads' }}
          />
          <Stack.Screen
            name="LiveChat"
            component={LiveChatScreen}
            options={{ title: 'Live Chat' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
