import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TPStreamsLiveChat } from 'react-native-tpstreams';

const LiveChatScreen: React.FC = () => {
    return (
        <View style={styles.container}>
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
                    fontFamily: 'Times new roman',
                    fontWeight: '500',
                }}
                style={{ flex: 1 }}
                onChatReady={() => console.log('Chat is ready!')}
                onChatError={(error) => console.error('Chat error:', error)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default LiveChatScreen;
