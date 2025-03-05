<script lang="ts" setup>
import { db } from "@/db";

const name = ref("");
const directory = ref("/");

async function getDirectoryItems() {
  const folders = await db.inventory.where({ isFolder: 1 }).toArray();
  console.log(folders);
}

getDirectoryItems();

async function deleteAllRecords() {
  await db.inventory.clear();
}
</script>

<template>
  <v-card title="Add Records" :max-width="500" class="mx-auto px-2">
    <v-form ref="form">
      <v-autocomplete
        v-model="directory"
        clearable
        label="Directory"
        :items="['hey', 'guys']"
      ></v-autocomplete>
      <v-text-field v-model="name" label="Name" required></v-text-field>
    </v-form>
  </v-card>
  <v-card :max-width="500" class="mx-auto px-2">
    <v-btn @click="deleteAllRecords">Delete Dexie</v-btn>
  </v-card>
</template>
