import type React from 'react';
import type { FunctionComponent } from 'react'
import type { ListRenderItem } from 'react-native'
import type { Product } from '../types/Product';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ProductCard } from './components/ProductCard';
import { fetchMockProducts } from '../utils/fetchMockProducts';
import { CategoryFilter } from './components/CategoryFilter';
import { extractCategories } from '../utils/extractCategories';

const ITEM_HEIGHT = 150; // Updated to match image height

export const ProductListScreen: FunctionComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);

    const animationHeight = useSharedValue(0);

    const togglePicker = useCallback(() => {
        setPickerVisible(!pickerVisible);
        animationHeight.value = withTiming(pickerVisible ? 0 : 180, { duration: 300 });
    }, [pickerVisible, animationHeight]);

    const handleReset = useCallback(() => {
        setActiveCategory('All');
        setProducts([]);
        setPage(0);
    }, []);

    const animatedPickerStyle = useAnimatedStyle(() => ({
        height: animationHeight.value,
        overflow: 'hidden',
    }));

    const renderProductItem: ListRenderItem<Product> = useCallback(({ item }) => <ProductCard product={item} />, [])

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const newProducts = await fetchMockProducts(page);
            setProducts(prev => [...new Set([...prev, ...newProducts])]); // Create new set of items and ensure no duplicates
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // Check if the error is a string and display it, otherwise fallback for unknown error types
            typeof error === 'string' ? Alert.alert("Fetching error", error) : Alert.alert("Error", "An unexpected error occurred");
        }
    }, [page, fetchMockProducts]);

    useEffect(() => {
        //Load products from fetched data and set internal state
        loadProducts();
    }, [page]);

    useEffect(() => {
        // Filter products by category
        if (activeCategory === 'All') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === activeCategory);
            setFilteredProducts(filtered);
        }
    }, [products, activeCategory]);

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TouchableOpacity onPress={togglePicker} style={styles.filterButton}>
                    <Text>Filter: {activeCategory}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.pickerContainer, animatedPickerStyle]}>
                <CategoryFilter
                    categories={extractCategories(products)}
                    activeCategory={activeCategory}
                    togglePicker={togglePicker}
                    setActiveCategory={setActiveCategory}
                    setPage={setPage}
                    setProducts={setProducts}
                />
            </Animated.View>
            <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => setPage(prev => prev + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" /> : null}
                ListEmptyComponent={
                    !loading ? <Text style={styles.noMatchText}>No match for this filter</Text> : null
                }
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    },
    noMatchText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 20, // Adjust this value to center it vertically as needed
        fontSize: 18,
        fontWeight: 'bold',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#ddd',
    },
    resetButton: {
        padding: 10,
        backgroundColor: '#ddd',
    },
    pickerContainer: {
        backgroundColor: '#f0f0f0'
    }
});
