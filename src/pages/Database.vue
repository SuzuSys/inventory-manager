<script lang="ts" setup>
import { useVMainHeight } from "@/composables/useVMainHeight";
import { db } from "@/db";
import { useObservable } from "@/db/observable";
import dayjs from "dayjs";

const vmainHeight = useVMainHeight();

function expirationFormat(d: Date): string {
  if (d.valueOf() === new Date(0).valueOf()) return "-";
  return dayjs(d).format("YYYY/MM/DD");
}

interface Item {
  name: string;
  directory: string;
  expiration: string;
  registration: string;
}

const items: Ref<Item[]> = useObservable(async () => {
  const raw = await db.inventory.toArray();
  return raw.map((inv) => ({
    name: inv.name,
    directory: inv.directory,
    expiration: expirationFormat(inv.expiresAt),
    registration: dayjs(inv.registredAt).format("YYYY/MM/DD HH:mm:ss"),
  }));
});
</script>

<template>
  <v-data-table-virtual
    :items="items"
    fixed-header
    :height="vmainHeight"
  ></v-data-table-virtual>
</template>
