<script lang="ts" setup>
const name = ref("");
</script>

<template>
  <v-card title="Add Records" :max-width="500" class="mx-auto px-2">
    <v-form ref="form">
      <v-autocomplete
        clearable
        label="Directory"
        :items="['hey', 'guys']"
      ></v-autocomplete>
      <v-text-field v-model="name" label="Name" required></v-text-field>
    </v-form>
  </v-card>
</template>
