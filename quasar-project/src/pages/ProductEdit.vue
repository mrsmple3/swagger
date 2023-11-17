<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-6">
      <h3 class="text-h4 q-my-md">Редактировать продуктов</h3>
      <p v-if="!products.length" class="text-h4 negative text-negative">
        Продуктов пока нет
      </p>
      <q-form
        @submit.prevent="submitHandler"
        class="q-gutter-md q-pt-lg"
        v-else
      >
        <q-select
          filled
          v-model="current"
          :options="products"
          option-label="name_uz"
          option-value="id"
          label="Выберите продукт"
          :rules="[(val) => !!val || 'Выберите продукт']"
        />
        <q-input
          filled
          v-model="name_uz"
          label="Название"
          :rules="[(val) => !!val || 'Введите название']"
        />
        <q-input
          filled
          v-model="address"
          label="Адрес"
          :rules="[(val) => !!val || 'Введите адрес']"
        />
        <q-input
          filled
          v-model.number="cost"
          label="Цена"
          type="number"
          :rules="[(val) => val >= 100 || 'Минимальная величина 100']"
        />
        <q-btn color="primary" label="Обновить" type="submit" />
        <q-btn color="negative" label="Удалить" @click="deleteHandler" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useStore } from '../store/index';
import { ref, onMounted, computed, watch } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'product-edit',
  setup() {
    const $q = useQuasar();
    const select = ref(null);
    const current = ref(null);
    const productTypeId = ref();
    const cost = ref();
    const name_uz = ref('');
    const address = ref('');
    const $store = useStore();
    const products = computed(() => $store.getters['exampleModule/products']);

    onMounted(async () => {
      await $store.dispatch('exampleModule/fetchProducts');
      if (products.value.length) {
        const {
          id: i,
          product_type_id: pId,
          name_uz: name,
          address: addr,
          cost: c,
        } = products.value[0] || {};
        current.value = i;
        productTypeId.value = pId;
        name_uz.value = name;
        cost.value = c;
        address.value = addr;
      }
    });

    watch(current, (productId) => {
      if (productId.id) {
        const {
          id: i,
          product_type_id: pId,
          name_uz: name,
          address: addr,
          cost: c,
        } = products.value.find((p) => p.id === productId.id);
        current.value = i;
        productTypeId.value = pId;
        name_uz.value = name;
        address.value = addr;
        cost.value = c;
      }
    });
    const deleteHandler = async () => {
      try {
        await $store.dispatch('exampleModule/deleteProduct', current.value);
        $q.notify('Продукт успешно удален');
        await $store.dispatch('exampleModule/fetchProducts');
        if (products.value.length) {
          const {
            id: i,
            product_type_id: pId,
            name_uz: name,
            address: addr,
            cost: c,
          } = products.value[0] || {};
          current.value = i;
          productTypeId.value = pId;
          name_uz.value = name;
          cost.value = c;
          address.value = addr;
        }
      } catch (error) {
        $q.notify('Ошибка при удалении продукта');
      }
    };
    const submitHandler = async () => {
      try {
        const productData = {
          id: current.value,
          product_type_id: productTypeId.value,
          name_uz: name_uz.value,
          cost: cost.value,
          address: address.value,
          created_date: new Date().toJSON(),
        };
        await $store.dispatch('exampleModule/updateProduct', productData);
        $q.notify('Продукт успешно обновлен');
        cost.value = 0;
        name_uz.value = '';
        address.value = '';
      } catch (error) {
        $q.notify('Ошибка при обновления продукта');
      }
    };

    return {
      select,
      products,
      name_uz,
      address,
      cost,
      current,
      submitHandler,
      deleteHandler,
    };
  },
};
</script>
