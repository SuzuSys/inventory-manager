<script lang="ts" setup>
const display = defineModel<boolean>();

function okRemove() {
  display.value = false;
}
</script>

<template>
  <v-dialog v-model="display" max-width="500">
    <v-card class="mx-auto" :border="true" title="Remove this record?">
      HEYHEYHEY!
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-btn block variant="text" @click="display = false">
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
</template>
