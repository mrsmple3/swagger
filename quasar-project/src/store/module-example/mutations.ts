import { MutationTree } from 'vuex';
import { ProductState } from './state';
import ProductsBean from 'src/types/ProductsBean';
import ProductTypes from 'src/types/ProductTypes';

const mutation: MutationTree<ProductState> = {
  SET_PRODUCTS(state, products: ProductsBean[]) {
    state.products = products;
  },
  SET_TYPE_PRODUCTS(state, products_types: ProductTypes[]) {
    state.products_types = products_types;
  },
};

export default mutation;
