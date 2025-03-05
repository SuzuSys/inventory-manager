<script lang="ts" setup>
import { db } from "@/db";

const mode: Ref<"add" | "update" | "others"> = ref("add");

async function deleteAllRecords() {
  await db.inventory.clear();
}
</script>

<template>
  <v-card :max-width="500" class="mx-auto pa-2">
    <v-tabs v-model="mode" class="mb-5">
      <v-tab :value="'add'">Add</v-tab>
      <v-tab :value="'update'">Update</v-tab>
      <v-tab :value="'others'">Others</v-tab>
    </v-tabs>
    <v-tabs-window v-model="mode">
      <v-tabs-window-item :value="'add'">
        <add-record></add-record>
      </v-tabs-window-item>
      <v-tabs-window-item :value="'update'"> update </v-tabs-window-item>
      <v-tabs-window-item :value="'others'">
        <v-row justify="center" class="my-5">
          <v-col cols="auto">
            <v-btn @click="deleteAllRecords">Delete all records</v-btn>
          </v-col>
        </v-row>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
