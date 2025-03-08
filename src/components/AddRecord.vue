<script setup lang="ts">
import { db } from "@/db";
import { useObservable } from "@/db/observable";
import dayjs from "dayjs";

const form: Ref<true | false | null> = ref(null);
const directory = ref("/");
const directoryRules = {
  required: (v: string) => !!v || "Field is required.",
};
const name = ref("");
const nameRules = {
  required: (v: string) => !!v || "Field is required.",
  format: (v: string) => !/\//.test(v) || `Slashes ("/") are not allowed.`,
};
const isContainable = ref(false);
const expiresAt = ref("");
const expiresAtRules = {
  format: (v: string) =>
    !v || dayjs(v, "YYYY/MM/DD", true).isValid() || "Invalid input.",
};
const showCalendar = ref(false);
const expiresAtDate = ref(new Date());
const updatedDate = ref(new Date());
function okCalendar() {
  expiresAtDate.value = updatedDate.value;
  expiresAt.value = dayjs(updatedDate.value).format("YYYY/MM/DD");
  showCalendar.value = false;
}

const directoryItems: Ref<string[]> = useObservable(async () => {
  // folders is naturally sorted by the index or primary key.
  // See https://dexie.org/docs/Collection/Collection.sortBy()
  const folders = await db.inventory
    .where("contentAddedAt")
    .notEqual(new Date(0))
    .reverse() // from asc to desc
    .toArray();
  return ["/", ...folders.map((inv) => `${inv.directory}${inv.name}/`)];
});

async function submit() {
  await db.inventory.add({
    directory: directory.value,
    name: name.value,
    registeredAt: new Date(),
    expiresAt: !!expiresAt.value
      ? dayjs(expiresAt.value, "YYYY/MM/DD", true).toDate()
      : new Date(0),
    contentAddedAt: isContainable.value ? new Date() : new Date(0),
  });
}
</script>

<template>
  <v-form validate-on="input" @submit.prevent="submit" v-model="form">
    <v-autocomplete
      v-model="directory"
      label="Directory"
      :items="directoryItems"
      :rules="[directoryRules.required]"
    ></v-autocomplete>
    <v-text-field
      v-model="name"
      label="Name"
      required
      :rules="[nameRules.required, nameRules.format]"
    ></v-text-field>
    <div class="d-flex justify-start">
      <v-text-field
        class="mr-2"
        v-model="expiresAt"
        label="Expires at"
        placeholder="YYYY/MM/DD"
        persistent-placeholder
        :rules="[expiresAtRules.format]"
      ></v-text-field>
      <v-btn
        icon="mdi-calendar"
        size="large"
        variant="plain"
        :color="showCalendar ? 'primary' : ''"
        @click="showCalendar = true"
      ></v-btn>
      <v-dialog v-model="showCalendar" width="auto">
        <v-card class="mx-auto" :border="true">
          <v-date-picker
            show-adjacent-months
            v-model="expiresAtDate"
            @update:model-value="(d) => (updatedDate = d)"
          >
            <template v-slot:header="">
              <p class="text-center text-h5">
                {{ dayjs(updatedDate).format("YYYY/MM/DD") }}
              </p>
            </template>
          </v-date-picker>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-btn block variant="text" @click="showCalendar = false">
                  cancel
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="primary" @click="okCalendar">ok</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
    <div class="d-flex justify-end mb-6 align-center" height="100">
      <v-switch
        v-model="isContainable"
        color="primary"
        label="Containable"
        class="mr-6 mb-n5"
      ></v-switch>
      <v-btn
        size="large"
        :color="form ? 'primary' : ''"
        :disabled="!form"
        type="submit"
      >
        Add
      </v-btn>
    </div>
  </v-form>
</template>
