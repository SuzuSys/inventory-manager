<script lang="ts" setup>
import { db } from "@/db";
import { liveQuery } from "dexie";

interface Item {
  name: string;
  directory: string;
  expiration: string | undefined;
  registration: string;
}

async function getAll(): Promise<Item[]> {
  const raw = await db.inventory.toArray();
  return raw.map((inv) => ({
    name: inv.name,
    directory: inv.directory,
    expiration: inv.expirationDate?.toISOString(),
    registration: inv.registrationDate.toISOString(),
  }));
}

const items: Ref<Item[]> = ref([]);

const subscription = liveQuery(getAll).subscribe({
  next: (result) => {
    items.value = result;
  },
  error: (error) => console.log(error),
});

onUnmounted(() => {
  subscription.unsubscribe();
});
</script>

<template>
  <v-data-table :items="items"></v-data-table>
</template>
