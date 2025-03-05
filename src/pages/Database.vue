<script lang="ts" setup>
import { db } from "@/db";
import { useObservable } from "@/db/observable";

interface Item {
  name: string;
  directory: string;
  expiration: string | undefined;
  registration: string;
}

const items: Ref<Item[]> = useObservable(async () => {
  const raw = await db.inventory.toArray();
  return raw.map((inv) => ({
    name: inv.name,
    directory: inv.directory,
    expiration: inv.expiresAt?.toISOString(),
    registration: inv.registredAt.toISOString(),
  }));
});
</script>

<template>
  <v-data-table :items="items"></v-data-table>
</template>
