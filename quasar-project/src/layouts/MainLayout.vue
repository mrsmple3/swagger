<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="row justify-center full-width">
          <q-tabs v-model="tab" dense class="bg-primary text-white">
            <q-route-tab to="/" name="main" icon="home" label="Главная" />
            <q-route-tab to="/edit" name="edit" icon="edit" label="Изменить" />
            <q-route-tab
              to="/create"
              name="create"
              icon="description"
              label="Создать"
            />
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const tab = ref('main');
    return {
      tab,
    };
  },
});
</script>
