<script lang="ts" setup>
import { recordHeaderMap, type ItemRecord } from "@/db/visible";
import { db } from "@/db";

const modelDisplay = defineModel<boolean>();
const { propsItem } = defineProps<{ propsItem: ItemRecord | undefined }>();
const snackbar = ref(false);

async function okRemove() {
  modelDisplay.value = false;
  if (propsItem) {
    await db.inventory.delete(propsItem.id);
    snackbar.value = true;
  }
}
</script>

<template>
  <v-dialog v-model="modelDisplay">
    <v-card class="mx-auto" :border="true" title="Remove this record?">
      <v-container>
        <v-table v-if="propsItem" class="mt-0">
          <tbody>
            <tr v-for="(value, key) in recordHeaderMap">
              <td>{{ value }}</td>
              <td>{{ propsItem[key] }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-btn block variant="text" @click="modelDisplay = false">
              cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="primary" @click="okRemove">ok</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
  <v-snackbar
    :timeout="2000"
    color="success"
    class="elevation-24"
    v-model="snackbar"
  >
    The record has been removed.
  </v-snackbar>
</template>
