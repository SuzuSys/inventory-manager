<script setup lang="ts">
import { db } from "@/db";
import { useObservable } from "@/db/observable";

const name = ref("");
const directory = ref("/");
const isContainable = ref(false);

const directoryItems: Ref<string[]> = useObservable(async () => {
  // folders is naturally sorted by the index or primary key.
  // See https://dexie.org/docs/Collection/Collection.sortBy()
  const folders = await db.inventory
    .where("contentAddedAt")
    .notEqual(new Date(0))
    .reverse() // asc to desc
    .toArray();
  return ["/", ...folders.map((inv) => `${inv.directory}${inv.name}/`)];
});
</script>

<template>
  <v-form ref="form">
    <v-autocomplete
      v-model="directory"
      clearable
      label="Directory"
      :items="directoryItems"
    ></v-autocomplete>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <div class="d-flex justify-end mb-6 align-center" height="100">
      <v-switch
        :model-value="isContainable"
        color="primary"
        label="Containable"
        class="mr-6 mb-n5"
      ></v-switch>
      <v-btn size="large" color="primary">Add</v-btn>
    </div>
  </v-form>
</template>
