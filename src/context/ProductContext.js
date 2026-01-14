import { createContext, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext);
};

export default ProductContext;