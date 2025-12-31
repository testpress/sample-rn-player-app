import React, { useState, useEffect } from 'react';
import { View, StyleSheet, InteractionManager, ActivityIndicator } from 'react-native';
import { TPStreamsLiveChat } from 'react-native-tpstreams';

const LiveChatScreen: React.FC = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Delay rendering of the chat component until the navigation transition is complete
        const task = InteractionManager.runAfterInteractions(() => {
            setIsReady(true);
        });

        return () => task.cancel();
    }, []);

    return (
        <View style={styles.container}>
            {isReady ? (
                <TPStreamsLiveChat
                    username="React-Native-User-External"
                    roomId="c1fcec71-9904-4157-9ee1-f3ae7c295b57"
                    title="TPStreams Live Chat"
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
                    onChatReady={() => console.log('Chat is ready!')}
                    onChatError={(error) => console.error('Chat error:', error)}
                />
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LiveChatScreen;
