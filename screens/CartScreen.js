import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableNativeFeedback } from 'react-native';
import { useCart } from '../CartContext';

const CartScreen = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();


    return (
        <ScrollView style={styles.container}>
            <View style={styles.cartContainer}>
                {cartItems.map((pizza) => (
                    <View key={pizza.id} style={styles.cartItem}>
                        <Text style={styles.itemTitle}>{pizza.title}</Text>
                        <Text style={styles.itemPrice}>
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: pizza.price.currency,
                                minimumFractionDigits: 2,
                            }).format(pizza.price.amount / 100)}
                        </Text>
                        <TouchableNativeFeedback onPress={() => removeFromCart(pizza)}>
                            <View style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                ))}
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'EUR',
                        minimumFractionDigits: 2,
                    }).format(
                        cartItems.reduce((total, pizza) => total + (pizza.price.amount / 100), 0)
                    )}
                </Text>
            </View>
            <TouchableNativeFeedback onPress={() => clearCart()}>
                <View style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Order Now</Text>
                </View>
            </TouchableNativeFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF7DD',
        paddingTop: 26,
    },
    cartContainer: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        height: 500,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemTitle: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#CB2B2E',
        borderRadius: 8,
        padding: 6,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 14,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#CB2B2E',
        width: '80%',
        padding: 20,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
    },
});

export default CartScreen;
