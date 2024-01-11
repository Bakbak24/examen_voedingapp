import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
            <TextInput
                placeholder="Search"
                style={styles.searchbar}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
    );
};

const styles = StyleSheet.create({
    searchbar: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        width: '100%',
        borderRadius: 5,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default SearchBar;
