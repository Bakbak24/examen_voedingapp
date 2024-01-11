import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

const SortBy = ({ selectedSort, handleSortBy }) => {
    return (
        <View style={styles.sort}>
            <Text>Sort By</Text>
            <View style={styles.btnContainer}>
                <TouchableNativeFeedback
                    onPress={() => handleSortBy('Cheap')}
                    background={TouchableNativeFeedback.Ripple(
                        selectedSort === 'Cheap' ? 'white' : '#CB2B2E',
                        false
                    )}
                >
                    <View
                        style={[
                            styles.customButton,
                            { backgroundColor: selectedSort === 'Cheap' ? '#CB2B2E' : '#FFF7DD' },
                        ]}
                    >
                        <Text
                            style={[
                                styles.customButtonText,
                                { color: selectedSort === 'Cheap' ? 'white' : 'black' },
                            ]}
                        >
                            Cheap
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={() => handleSortBy('Expensive')}
                    background={TouchableNativeFeedback.Ripple(
                        selectedSort === 'Expensive' ? 'white' : '#CB2B2E',
                        false
                    )}
                >
                    <View
                        style={[
                            styles.customButton,
                            { backgroundColor: selectedSort === 'Expensive' ? '#CB2B2E' : '#FFF7DD' },
                        ]}
                    >
                        <Text
                            style={[
                                styles.customButtonText,
                                { color: selectedSort === 'Expensive' ? 'white' : 'black' },
                            ]}
                        >
                            Expensive
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sort: {
        borderRadius: 5,
        borderColor: '#000',
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        width: '100%',
    },
    customButton: {
        backgroundColor: '#FFF7DD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
    },
    customButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default SortBy;
