import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
                onPress={() => navigation.navigate('Video', {
                    videoId: '42h2tZ5fmNf',
                    accessToken: '9327e2d0-fa13-4288-902d-840f32cd0eed',
                    title: 'DRM Video'
                })}
            >
                <Text style={styles.buttonText}>DRM Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Video', {
                    videoId: 'ACGhHuD7DEa',
                    accessToken: '5bea276d-7882-4f8f-951a-c628622817e0',
                    title: 'Non-DRM Video'
                })}
            >
                <Text style={styles.buttonText}>Non-DRM Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('DownloadList')}
            >
                <Text style={styles.buttonText}>Download Lists</Text>
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
