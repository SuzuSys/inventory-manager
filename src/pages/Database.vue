<script lang="ts" setup>
import { db } from "@/db";
import { useObservable } from "@/db/observable";
import { useDate } from "vuetify";

const date = useDate();

function expirationFormat(d: Date): string {
  if (d === new Date(0)) return "-";
  return date.format(d, "keyboardDateTime");
}

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
    expiration: expirationFormat(inv.expiresAt),
    registration: date.format(inv.registredAt, "keyboardDateTime24h"),
  }));
});
</script>

<template>
  <v-data-table :items="items"></v-data-table>
</template>
