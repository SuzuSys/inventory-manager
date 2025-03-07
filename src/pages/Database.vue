<script lang="ts" setup>
import RemoveRecord from "@/components/RemoveRecord.vue";
import { useVMainHeight } from "@/composables/useVMainHeight";
import { db } from "@/db";
import { useObservable } from "@/db/observable";
import dayjs from "dayjs";

const vmainHeight = useVMainHeight();

function expirationFormat(d: Date): string {
  if (d.valueOf() === new Date(0).valueOf()) return "-";
  return dayjs(d).format("YYYY/MM/DD");
}

const removeDialog = ref(false);

interface Item {
  id: number;
  name: string;
  directory: string;
  expiration: string;
  registration: string;
}

const headers = [
  { title: "Name", key: "name" },
  { title: "Directory", key: "directory" },
  { title: "Expiration", key: "expiration" },
  { title: "Registration", key: "registration" },
  { title: "Actions", key: "actions", sortable: false },
];

const items: Ref<Item[]> = useObservable(async () => {
  const raw = await db.inventory.toArray();
  return raw.map((inv) => ({
    id: inv.id,
    name: inv.name,
    directory: inv.directory,
    expiration: expirationFormat(inv.expiresAt),
    registration: dayjs(inv.registredAt).format("YYYY/MM/DD HH:mm:ss"),
  }));
});

function edit(id: number) {
  console.log(id);
}
function remove(id: number) {
  removeDialog.value = true;
}
</script>

<template>
  <v-data-table-virtual
    :items="items"
    fixed-header
    :height="vmainHeight"
    :headers="headers"
  >
    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-icon
          color="medium-emphasis"
          icon="mdi-pencil"
          size="small"
          @click="edit(item.id)"
        ></v-icon>
        <v-icon
          color="medium-emphasis"
          icon="mdi-delete"
          size="small"
          @click="remove(item.id)"
        ></v-icon>
      </div>
    </template>
  </v-data-table-virtual>
  <RemoveRecord v-model="removeDialog"></RemoveRecord>
</template>
