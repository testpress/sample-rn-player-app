import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TPStreamsPlayerView, TPStreamsLiveChat } from 'react-native-tpstreams';

type VideoScreenProps = NativeStackScreenProps<RootStackParamList, 'Video'>;

const VideoScreen: React.FC<VideoScreenProps> = ({ route }) => {
    const { videoId, accessToken, startInFullscreen, title } = route.params;
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    // Delay player rendering to ensure screen layout is complete
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
            {isPlayerReady && title === 'Live Video' && (
                <TPStreamsLiveChat
                    username="React-Native-User-External"
                    roomId="734e0ec6-cc3d-40d0-8bcb-0f6374076225"
                    title="Live Chat"
                    colors={{
                        primary: '#0040ffff', // Indigo
                        background: 'rgba(255, 255, 255, 1)', // White
                        text: '#000000ff', // Slate 900
                        inputBackground: 'rgba(255, 255, 255, 1)', // Slate 100
                        border: '#ffffffff', // Slate 200
                    }}
                    typography={{
                        fontSize: 14,
                        fontFamily: 'System', // Use system font for better performance
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
});

export default VideoScreen;
