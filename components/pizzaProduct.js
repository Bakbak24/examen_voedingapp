import React from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';

const PizzaProduct = ({ pizza, onPizzaPress  }) => {
    return (
        <View style={styles.pizzaTile}>
            <Image
                source={{
                    uri: pizza.image.replace('https://craft-project.ddev.site', 'http://10.0.2.2:51457'),// Gebruik ddev describe om de juiste URL te vinden en plak die van achter anders zie je geen pizza image
                }}
                style={{ width: '100%', height: '61%' }}
            />
            <View style={styles.pizzaInfo}>
                <Text style={styles.infoTitle}>{pizza.title}</Text>
                <Text style={styles.priceText}>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: pizza.price.currency,
                        minimumFractionDigits: 2,
                    }).format(pizza.price.amount / 100)}
                </Text>
            </View>
            <TouchableNativeFeedback onPress={() => onPizzaPress(pizza)}>
                <View style={styles.detailButton}>
                    <Text style={styles.detailTxt}>+</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    pizzaTile: {
        backgroundColor: '#fff',
        width: '44%',
        height: 200,
        borderRadius: 12,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pizzaInfo: {
        paddingLeft: 10,
    },
    infoTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
    },
    priceText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    detailButton: {
        backgroundColor: '#CB2B2E',
        width: 28,
        height: 28,
        borderRadius: 20,
        position: 'absolute',
        bottom: 12,
        right: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailTxt: {
        color: '#fff',
        fontSize: 20,
    },
});

export default PizzaProduct;
