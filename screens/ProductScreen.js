import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../CartContext';

const ProductScreen = ({ route }) => {
    const navigation = useNavigation();
    const { pizza } = route.params;
    const [isFavorite, setIsFavorite] = useState(false); // Nieuwe state voor favorietstatus

    const { addToCart, addToFavorites } = useCart(); // Haalt addToCart uit de context
    const toggleFavorite = () => {
        // Functie om favorietstatus om te schakelen
        setIsFavorite(!isFavorite);
        addToFavorites(pizza); // Roept addToFavorites-functie aan om de pizza aan de winkelwagen toe te voegen
    };
    const handleAddToCart = () => {
        // Roept addToCart-functie aan om de pizza aan de winkelwagen toe te voegen
        addToCart(pizza);
        navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.productContainer}>
                <View style={styles.pizzaDetail}>
                    <Image
                        source={{
                            uri: pizza.image.replace('https://craft-project.ddev.site', 'http://10.0.2.2:51457'),// Gebruik ddev describe om de juiste URL te vinden en plak die van achter anders zie je geen pizza image
                        }}
                        style={styles.pizzaImage}
                    />
                    <View style={styles.pizzaInfo}>
                        <Text style={styles.pizzaTitle}>{pizza.title}</Text>
                        <Text style={styles.ingredients}>{pizza.ingredients}</Text>
                        <Text style={styles.description}>{pizza.description}</Text>
                        <View style={styles.totalPrice}>
                            <Text style={styles.priceText}>Price:</Text>
                            <Text style={styles.priceNumber}>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: pizza.price.currency,
                                    minimumFractionDigits: 2,
                                }).format(pizza.price.amount / 100)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.addButtons}>
                        <TouchableNativeFeedback onPress={toggleFavorite}>
                            <View style={[styles.addFavorite, isFavorite && styles.favoriteActive]}>
                                <Text style={[styles.addFavoriteText, isFavorite && styles.favoriteTextActive]}>❤︎</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={handleAddToCart}>
                            <View style={styles.buttonAdd}>
                                <Text style={styles.buttonText}>Add To Cart</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF7DD',
        paddingTop: 26,
    },
    productContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    pizzaImage: {
        width: '100%',
        height: '31%',
        borderRadius: 12,
    },
    pizzaDetail: {
        backgroundColor: 'white',
        width: '90%',
        height: 730,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    pizzaInfo: {
        marginTop: 20,
        marginLeft: 30,
        width: '85%',
    },
    pizzaTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    ingredients: {
        fontSize: 18,
        marginTop: 15,
        color: '#A9A9A9',
        fontWeight: '500',
    },
    description: {
        fontSize: 18,
        marginTop: 20,
        color: 'black',
    },
    totalPrice: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: '500',
    },
    priceNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonAdd: {
        backgroundColor: '#CB2B2E',
        width: '60%',
        padding: 20,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
    },
    addFavorite: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        marginTop: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
    },
    favoriteActive: {
        backgroundColor: '#CB2B2E', // Achtergrondkleur wordt rood wanneer favoriet actief is
    },
    addFavoriteText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    favoriteTextActive: {
        color: 'white', // Tekstkleur wordt wit wanneer favoriet actief is
    },
    addButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default ProductScreen;
