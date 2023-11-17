import ProductsBean from 'src/types/ProductsBean';
import ProductTypes from 'src/types/ProductTypes';

export interface ProductState {
  products: ProductsBean[];
  products_types: ProductTypes[];
}

const state: ProductState = {
  products: [],
  products_types: [],
};

export default state;
