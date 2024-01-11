import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView,  Text, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PizzaProduct from '../components/pizzaProduct';
import SearchBar from '../components/searchBar';
import SortBy from '../components/sortBy';
import Footer from '../components/footer';
import axios from 'axios';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState(null);
    const [showNewPizzaNotification, setShowNewPizzaNotification] = useState(false); // State voor de notificatie

    const [entries, setEntries] = useState([]);
    const [lastUpdateDateTime, setLastUpdateDateTime] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url;
                if (Platform.OS == 'android') {
                    url = "http://10.0.2.2:51457/api/orderProduct";// Gebruik ddev describe om de juiste URL te vinden en plak die van achter anders zie je geen pizza image
                } else {
                    url = "https://craft-project.ddev.site/api/orderProduct";
                }
                const response = await axios.get(url);
                if (response.data && Array.isArray(response.data.data)) {
                    const newPizzas = response.data.data;

                    if (lastUpdateDateTime) {
                        // Als er een datum en tijd van de laatste bijwerking is
                        const hasNewPizzas = checkForNewPizzas(newPizzas, lastUpdateDateTime);
                        if (hasNewPizzas) {
                            setShowNewPizzaNotification(true);
                        }
                    }

                    // Updated staat van de datum en tijd van de laatste bijwerking
                    setLastUpdateDateTime(new Date());

                    setEntries(newPizzas);
                } else {
                    console.error('Invalid data structure in API response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const checkForNewPizzas = (newPizzas, lastUpdateDateTime) => {
        // Loopt door de nieuwe pizza's en vergelijkt de creatiedatum met de datum en tijd van de laatste bijwerking
        for (const pizza of newPizzas) {
            const pizzaCreatedAt = new Date(pizza.created_at);

            if (pizzaCreatedAt > lastUpdateDateTime) {
                return true;
            }
        }

        return false;
    };
    const handleSortBy = (sortBy) => {
        // Als de zelfde sorting criteria alweer is geselecteerd dan wordt de section gecleared
        setSelectedSort(selectedSort === sortBy ? null : sortBy);
    };
    const navigateToProduct = (pizza) => {
        navigation.navigate('Product', { pizza });
    };

    const closeNotification = () => {
        setShowNewPizzaNotification(false);
    };
    const filteredPizzas = entries.filter((entry) => {
        const isCheap = selectedSort === 'Cheap';
        const isExpensive = selectedSort === 'Expensive';

        // Controleert of de pizzatitel de zoekopdracht bevat
        const titleIncludesQuery = entry.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter op basis van sortering en zoekopdracht dat checked of de pizza goedkoop is, duur is of de zoekopdracht bevat
        if ((isCheap && entry.price.amount / 100 < 13.0) ||
            (isExpensive && entry.price.amount / 100 >= 13.0) ||
            (!selectedSort && titleIncludesQuery)) {
            return true;
        }

        return false;
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={require('../assets/logo.png')}
                    style={{ width: '100%', height: 170 }}
                    resizeMode="contain"
                />
                <View style={styles.tilesContainer}>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <SortBy selectedSort={selectedSort} handleSortBy={handleSortBy} />
                    {filteredPizzas.map((entry) => (
                        <PizzaProduct key={entry.id} pizza={entry} onPizzaPress={navigateToProduct} />
                    ))}
                </View>
            </ScrollView>
            <Footer />
            <Modal
                visible={showNewPizzaNotification}
                animationType="slide"
                transparent={true}
                onRequestClose={closeNotification}
            >
                <View style={styles.notificationContainer}>
                    <Text style={styles.notificationText}>Er zijn nieuwe pizza's beschikbaar!</Text>
                    <Button title="Sluiten" onPress={closeNotification} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF7DD',
        flex: 1,
    },
    tilesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginLeft: '5%',
    },
    notificationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    notificationText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default HomeScreen;
