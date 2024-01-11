import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Footer = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.footer}>
        <View style={styles.home}>
            <Image style={styles.homeImage} source={require('../assets/home-icon.png')} />
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Favorites')}>
        <View style={styles.favorites}>
            <Image style={styles.favImage} source={require('../assets/heart-icon.png')} />
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
        <View style={styles.cart}>
            <Image style={styles.cartImage} source={require('../assets/cart-icon.png')} />
            <View style={styles.itemsCounter}>
                <Text style={styles.itemsCounterText}>0</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60, 
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    home: {
        padding: 20,
    },
    homeImage: {
        width: 33,
        height: 30,
    },
    favorites: {
        padding: 20,
    },
    favImage: {
        width: 36,
        height: 30,
    },
    cart: {
        padding: 20,
    },
    cartImage: {
        width: 30,
        height: 30,
    },
    itemsCounter: {
        position: 'absolute',
        backgroundColor: '#CB2B2E',
        width: 20,
        height: 20,
        borderRadius: 10,
        right: 10,
        top: 17,
        alignItems: 'center',
        display: 'none',
    },
    itemsCounterText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Footer;
