import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Sentry from '@sentry/react-native';
import { RootStackParamList } from '../navigation/types';
import { TPStreamsPlayerView, TPStreamsLiveChat } from 'react-native-tpstreams';

type VideoScreenProps = NativeStackScreenProps<RootStackParamList, 'Video'>;

const VideoScreen: React.FC<VideoScreenProps> = ({ route }) => {
  const { videoId, accessToken, startInFullscreen, title } = route.params;
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsPlayerReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        {isPlayerReady && (
          <TPStreamsPlayerView
            videoId={videoId}
            accessToken={accessToken}
            enableDownload={true}
            shouldAutoPlay={true}
            startInFullscreen={startInFullscreen}
            style={styles.player}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.sentryButton}

          onPress={() => {
            const error = new Error('Sentry test error from VideoScreen');

            Sentry.withScope((scope) => {
              scope.setTag('source', 'sample');
              scope.setTag('screen', 'VideoScreen');
              scope.setLevel('error');

              Sentry.captureException(error);
            });

            Alert.alert(
              'Error Captured',
              'Test error sent to Sentry.',
            );
          }}
      
      >
        <Text style={styles.buttonText}>Test Sentry Error</Text>
      </TouchableOpacity>

      {isPlayerReady && title === 'Live Video' && (
        <TPStreamsLiveChat
          username="React-Native-User-External"
          roomId="734e0ec6-cc3d-40d0-8bcb-0f6374076225"
          title="Live Chat"
          colors={{
            primary: '#0040ffff',
            background: 'rgba(255, 255, 255, 1)',
            text: '#000000ff',
            inputBackground: 'rgba(255, 255, 255, 1)',
            border: '#ffffffff',
          }}
          typography={{
            fontSize: 14,
            fontFamily: 'System',
            fontWeight: '500',
          }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  playerContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  player: {
    height: 250,
  },
  sentryButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VideoScreen;
