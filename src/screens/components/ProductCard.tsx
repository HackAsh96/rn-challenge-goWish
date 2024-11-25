import type React from 'react';
import type { Product } from '../../types/Product';
import { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



export const ProductCard = memo(({ product }: { product: Product }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
        </View>
    );
}, ((prev, next) => prev.product.id !== next.product.id));

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    image: {
        width: '50%',
        height: 150,
        borderRadius: 5,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
