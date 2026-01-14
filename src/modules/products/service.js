
import { dummyProducts } from '../../data/products_dummy_data';

// Simulate a database
let products = [...dummyProducts];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...products]);
        }, 500); // Simulate network delay
    });
};

export const addProduct = (product) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newProduct = {
                ...product,
                // Simple ID generation
                id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
            };
            products = [newProduct, ...products];
            resolve(newProduct);
        }, 500);
    });
};

export const updateProduct = (updatedProduct) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            products = products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
            );
            resolve(updatedProduct);
        }, 500);
    });
};

export const deleteProduct = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            products = products.filter((p) => p.id !== id);
            resolve(id);
        }, 500);
    });
};
