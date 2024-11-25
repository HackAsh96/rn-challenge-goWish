import type React from 'react';
import type { FunctionComponent } from 'react'
import type { Product } from '../../types/Product';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
    togglePicker: () => void
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CategoryFilter: FunctionComponent<CategoryFilterProps> =
    ({ categories, setActiveCategory, togglePicker, setProducts, setPage, activeCategory }) => {

        const handleCategoryChange = (itemValue: string) => {
            setActiveCategory(itemValue);
            togglePicker();
            setPage(0)
            setProducts([]);
        }

        const renderPickerItems = useMemo(() =>
            categories.map(category => (
                <Picker.Item key={category} label={category} value={category} />
            )), [categories]
        )
        return <Picker
            selectedValue={activeCategory}
            onValueChange={handleCategoryChange}
            style={styles.picker}
        >
            {renderPickerItems}
        </Picker>
    };

const styles = StyleSheet.create({
    picker: {
        width: '100%'
    },
});
