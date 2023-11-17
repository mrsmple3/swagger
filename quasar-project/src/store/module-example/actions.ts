import { ActionTree } from 'vuex';
import { ProductState } from './state';
import axios from 'axios';
import InsertProductBean from 'src/types/InsertProductBean';
import ProductBean from 'src/types/ProductsBean';
import RowBounds from 'src/types/RowBounds';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const actions: ActionTree<ProductState, any> = {
  async fetchProducts({ commit }, rowBounds: RowBounds) {
    try {
      const response = await axios.get(
        'http://94.158.54.194:9092/api/product',
        {
          params: rowBounds,
        }
      );
      commit('SET_PRODUCTS', response.data);
    } catch (error) {
      throw error;
    }
  },
  async createProduct(_, product: InsertProductBean) {
    try {
      await axios.post('http://94.158.54.194:9092/api/product', product);
    } catch (error) {
      throw error;
    }
  },
  async updateProduct(_, product: ProductBean) {
    try {
      await axios.put('http://94.158.54.194:9092/api/product', product);
    } catch (error) {
      throw error;
    }
  },
  async deleteProduct(_, id: number) {
    try {
      await axios.delete(`http://94.158.54.194:9092/api/product/${id}`);
    } catch (error) {
      throw error;
    }
  },
  async getProductTypes({ commit }) {
    try {
      const response = await axios.get(
        'http://94.158.54.194:9092/api/product/get-product-types'
      );
      commit('SET_TYPE_PRODUCTS', response.data);
    } catch (error) {
      throw error;
    }
  },
};

export default actions;
