import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableNativeFeedback, Image } from 'react-native';
import { useCart } from '../CartContext';

const FavoriteScreen = () => {
    const { favoriteItems, removeFromFavorites } = useCart(); // Haalt de lijst met favoriete items en removeFromFavorites-functie uit de context
    return (
        <ScrollView style={styles.container}>
            {favoriteItems && favoriteItems.length === 0 ? (
                <Text style={styles.emptyText}>You have no favorite pizzas yet.</Text>
            ) : (
                favoriteItems && favoriteItems.map((pizza) => (
                    <View key={pizza.id} style={styles.favoriteItem}>
                        <Image
                            source={{
                                uri: pizza.image.replace('https://craft-project.ddev.site', 'http://10.0.2.2:51457'),// Gebruik ddev describe om de juiste URL te vinden en plak die van achter anders zie je geen pizza image
                            }}
                            style={styles.pizzaImage}
                        />
                        <Text style={styles.itemTitle}>{pizza.title}</Text>
                        <TouchableNativeFeedback onPress={() => removeFromFavorites(pizza)}>
                            <View style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                ))
            )}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF7DD',
        paddingTop: 26,
        flex: 1,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        marginTop: 20,
    },
    favoriteItem: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        alignItems: 'center',
    },
    pizzaImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    removeButton: {
        backgroundColor: '#CB2B2E',
        borderRadius: 8,
        padding: 6,
        marginTop: 10,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 14,
    },
});

export default FavoriteScreen;
