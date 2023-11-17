<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-6">
      <h3 class="text-h4 q-my-md">Создать продукт</h3>
      <q-form @submit.prevent="submitHandler" class="q-gutter-md q-pt-xl">
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
        <q-btn color="teal" label="Создать" type="submit" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useStore } from '../store/index';
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';

export default {
  name: 'product-edit',
  setup() {
    const $q = useQuasar();
    const productTypeId = ref();
    const cost = ref();
    const name_uz = ref('');
    const address = ref('');
    const $store = useStore();
    const products = computed(() => $store.getters['exampleModule/products']);

    onMounted(async () => {
      await $store.dispatch('exampleModule/fetchProducts');
      productTypeId.value = products.value[products.value.length - 1].id + 1;
    });

    const submitHandler = async () => {
      try {
        const productData = {
          product_type_id: productTypeId.value + 1,
          name_uz: name_uz.value,
          cost: cost.value,
          address: address.value,
          created_date: new Date().toJSON(),
        };
        await $store.dispatch('exampleModule/createProduct', productData);
        $q.notify('Продукт успешно создан');
        cost.value = Number;
        name_uz.value = '';
        address.value = '';
      } catch (error) {}
    };

    return {
      name_uz,
      address,
      cost,
      submitHandler,
    };
  },
};
</script>
