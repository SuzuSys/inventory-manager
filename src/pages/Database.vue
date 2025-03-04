<script lang="ts" setup>
import { db } from "@/db";

interface Item {
  name: string;
  directory: string;
  expiration: string | undefined;
  registration: string;
}

async function getAll() {
  const raw = await db.inventory.toArray();
  return raw.map((inv) => ({
    name: inv.name,
    directory: inv.directory,
    expiration: inv.expirationDate?.toISOString(),
    registration: inv.registrationDate.toISOString(),
  }));
}

let items: Item[] = [];
(async () => {
  items = await getAll();
})();
</script>

<template>
  <v-data-table :items="items"></v-data-table>
</template>
