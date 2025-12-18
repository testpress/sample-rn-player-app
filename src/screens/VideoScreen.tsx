import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TPStreamsPlayerView } from 'react-native-tpstreams';

type VideoScreenProps = NativeStackScreenProps<RootStackParamList, 'Video'>;

const VideoScreen: React.FC<VideoScreenProps> = ({ route }) => {
    const { videoId, accessToken } = route.params;
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
                        shouldAutoPlay={false}
                        style={styles.player}
                    />
                )}
            </View>
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
