<script lang="ts" setup>
import { db } from "@/db";
import { useObservable } from "@/db/observable";

const name = ref("");
const directory = ref("/");

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
        :items="directoryItems"
      ></v-autocomplete>
      <v-text-field v-model="name" label="Name" required></v-text-field>
    </v-form>
  </v-card>
  <v-row justify="center" class="my-5">
    <v-col cols="auto">
      <v-btn @click="deleteAllRecords">Delete all records</v-btn>
    </v-col>
  </v-row>
</template>
