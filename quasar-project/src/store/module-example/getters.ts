import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductState } from './state';

const getters: GetterTree<ProductState, StateInterface> = {
  products: (state) => state.products,
  products_types: (state) => state.products_types,
};

export default getters;
