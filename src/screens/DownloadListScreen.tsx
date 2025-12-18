import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    addDownloadProgressListener,
    removeDownloadProgressListener,
    onDownloadProgressChanged,
    pauseDownload,
    resumeDownload,
    removeDownload,
    getAllDownloads,
    type DownloadItem,
} from 'react-native-tpstreams';

const DownloadListScreen: React.FC = () => {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let subscription: any = null;

        const initializeDownloads = async () => {
            try {
                const allDownloads = await getAllDownloads();
                setDownloads(allDownloads);

                await addDownloadProgressListener();
                subscription = onDownloadProgressChanged((updatedDownloads) => {
                    setDownloads(updatedDownloads);
                });

                setLoading(false);
            } catch (error) {
                console.error('Failed to load downloads:', error);
                setLoading(false);
            }
        };

        initializeDownloads();

        return () => {
            if (subscription) subscription.remove();
            removeDownloadProgressListener();
        };
    }, []);

    const handlePause = async (videoId: string) => {
        try {
            await pauseDownload(videoId);
        } catch (error) {
            Alert.alert('Error', 'Failed to pause download');
        }
    };

    const handleResume = async (videoId: string) => {
        try {
            await resumeDownload(videoId);
        } catch (error) {
            Alert.alert('Error', 'Failed to resume download');
        }
    };

    const handleDelete = (videoId: string, title: string) => {
        Alert.alert(
            'Delete Download',
            `Are you sure you want to delete "${title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeDownload(videoId);
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete download');
                        }
                    },
                },
            ]
        );
    };

    const getStatusColor = (state: string) => {
        switch (state) {
            case 'Completed':
                return '#34C759';
            case 'Downloading':
                return '#007AFF';
            case 'Paused':
                return '#FF9500';
            case 'Failed':
                return '#FF3B30';
            default:
                return '#8E8E93';
        }
    };

    const renderDownloadItem = ({ item }: { item: DownloadItem }) => {
        const isCompleted = item.state === 'Completed';
        const isDownloading = item.state === 'Downloading';
        const isPaused = item.state === 'Paused';
        const showProgress = !isCompleted;
        const progressBarColor = isDownloading ? '#007AFF' : '#8E8E93';

        return (
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    {/* Thumbnail */}
                    <View style={styles.thumbnail}>
                        {item.thumbnailUrl ? (
                            <Image
                                source={{ uri: item.thumbnailUrl }}
                                style={styles.thumbnailImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.thumbnailPlaceholder}>
                                <Icon name="film-outline" size={32} color="#8E8E93" />
                            </View>
                        )}
                    </View>

                    {/* Content */}
                    <View style={styles.contentSection}>
                        {/* Title and Status */}
                        <View style={styles.cardHeader}>
                            <Text style={styles.videoTitle} numberOfLines={2}>
                                {item.title || `Video ${item.videoId}`}
                            </Text>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.state) }]}>
                                <Text style={styles.statusText}>{item.state}</Text>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        {showProgress && (
                            <View style={styles.progressSection}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                width: `${item.progressPercentage}%`,
                                                backgroundColor: progressBarColor,
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.progressPercent, { color: progressBarColor }]}>
                                    {item.progressPercentage.toFixed(0)}%
                                </Text>
                            </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.actions}>
                            {(isDownloading || isPaused) && (
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.controlButton]}
                                    onPress={() => isDownloading ? handlePause(item.videoId) : handleResume(item.videoId)}
                                >
                                    <Icon
                                        name={isDownloading ? 'pause' : 'play'}
                                        size={14}
                                        color="#FFFFFF"
                                        style={styles.buttonIcon}
                                    />
                                    <Text style={styles.controlButtonText}>
                                        {isDownloading ? 'Pause' : 'Resume'}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDelete(item.videoId, item.title)}
                            >
                                <Icon name="trash-outline" size={14} color="#FFFFFF" style={styles.buttonIcon} />
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading downloads...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {downloads.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Icon name="download-outline" size={60} color="#8E8E93" />
                    <Text style={styles.emptyTitle}>No Downloads</Text>
                    <Text style={styles.emptySubtitle}>
                        Download videos from the player to see them here
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={downloads}
                    renderItem={renderDownloadItem}
                    keyExtractor={(item) => item.videoId}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#8E8E93',
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#3A3A3C',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22,
    },
    listContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
    },
    // Thumbnail
    thumbnail: {
        width: 120,
        height: 68,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    thumbnailPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E5EA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Content
    contentSection: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    videoTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
        marginRight: 8,
        lineHeight: 20,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#E5E5EA',
        borderRadius: 2,
        marginRight: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    progressPercent: {
        fontSize: 12,
        fontWeight: '600',
        minWidth: 35,
        textAlign: 'right',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 100,
    },
    buttonIcon: {
        marginRight: 6,
    },
    controlButton: {
        backgroundColor: '#007AFF',
    },
    controlButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        width: 95,
    },
    deleteButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default DownloadListScreen;
