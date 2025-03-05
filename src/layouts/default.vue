<script lang="ts" setup>
//
</script>

<template>
  <AppHeader />

  <v-main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </v-main>

  <AppFooter />
</template>
