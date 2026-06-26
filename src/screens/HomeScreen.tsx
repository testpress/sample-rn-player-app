import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Sentry from '@sentry/react-native';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TPStreams Player Demo</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Video', {
            videoId: '42h2tZ5fmNf',
            accessToken: '9327e2d0-fa13-4288-902d-840f32cd0eed',
            title: 'DRM Video',
            startInFullscreen: false,
          })
        }
      >
        <Text style={styles.buttonText}>DRM Video</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() => {
          try {
            const divide = (a: number, b: number): number => {
              if (b === 0) {
                throw new Error('Divide by zero error');
              }
              return a / b;
            };
            const result = divide(10, 0);
            console.log('Result:', result);
          } catch (error) {
            Sentry.withScope((scope) => {
              scope.setTag('source', 'sample');
              Sentry.captureException(error);
            });
            Alert.alert(
              'Error Captured',
              'Divide by zero error caught and sent to Sentry.',
            );
          }
        }}
      >
        <Text style={styles.buttonText}>Test Divide by Zero</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
