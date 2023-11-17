<template>
  <h3 class="text-h4 q-my-md text-center">Продукты</h3>
  <div>
    <q-input
      style="max-width: 500px"
      v-model="search"
      placeholder="Поиск продуктов..."
      filled
      dense
      debounce="200"
      clearable
      @update:model-value="searchProducts"
      @keyup.enter="handleEnter"
    />
    <div v-if="search" class="q-pa-md" style="max-width: 350px">
      <q-list dense bordered padding class="rounded-borders">
        <q-item
          v-for="(product, index) in results"
          :key="index"
          clickable
          v-ripple
          @click="selected(product)"
        >
          <q-item-section> {{ product.name_uz }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>

  <q-page class="row items-center justify-evenly q-pb-xl">
    <div v-for="product in products" :key="product.id" class="col-4">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ product.name_uz }}</div>
          <div>{{ product.address }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-caption">
            Product Type ID: {{ product.product_type_id }}
          </div>
          <div class="text-caption">Cost: {{ product.cost }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-caption">
            Created Date: {{ product.created_date }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
  <h3 class="text-h4 q-my-md text-center">Типы Продуктов</h3>
  <q-page class="row items-center justify-evenly q-pb-xl q-px-lg">
    <div v-for="product in products_types" :key="product.id" class="col-4">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ product.name_uz }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-weight-bold">{{ product.name_ru }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-weight-bold">{{ product.name_ru }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from 'vue';
import { computed } from 'vue';
import { useStore } from '../store/index';
import ProductsBean from 'src/types/ProductsBean';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const $store = useStore();
    const products = computed(() => $store.getters['exampleModule/products']);
    const products_types = computed(
      () => $store.getters['exampleModule/products_types']
    );
    const search = ref('');
    const results: Ref<ProductsBean[]> = ref([]);
    onMounted(async () => {
      await $store.dispatch('exampleModule/fetchProducts');
      await $store.dispatch('exampleModule/getProductTypes');
    });
    const searchProducts = async () => {
      if (search.value) {
        results.value = products.value.filter((product: ProductsBean) =>
          product.name_uz.toLowerCase().includes(search.value.toLowerCase())
        );
      } else {
        await $store.dispatch('exampleModule/fetchProducts');
      }
    };
    const selected = async (product: ProductsBean) => {
      await $store.dispatch('exampleModule/fetchProducts', product);
    };
    const handleEnter = async () => {
      const pIndex = products.value.findIndex(
        (pName: ProductsBean) =>
          pName.name_uz.toLowerCase() === search.value.toLowerCase()
      );
      const idProduct = products.value[pIndex].id;
      await $store.dispatch('exampleModule/fetchProducts', {
        id: idProduct,
      });
    };
    return {
      products,
      products_types,
      search,
      results,
      searchProducts,
      selected,
      handleEnter,
    };
  },
});
</script>
