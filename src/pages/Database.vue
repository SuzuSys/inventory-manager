<script lang="ts" setup>
import RemoveRecord from "@/components/RemoveRecord.vue";
import { useVMainHeight } from "@/composables/useVMainHeight";
import { useObservable } from "@/db/observable";
import { getItemRecord, recordHeaderMap, type ItemRecord } from "@/db/visible";
import { useUpdateRecordStore } from "@/stores/updateRecordStore";

const vmainHeight = useVMainHeight();
const updateRecordStore = useUpdateRecordStore();

const removeDialog: Ref<boolean> = ref(false);
const removeItem: Ref<ItemRecord | undefined> = ref();

const recordHeaders = Object.entries(recordHeaderMap).map(([key, title]) => ({
  title,
  key,
}));

const headers = [
  ...recordHeaders,
  { title: "Actions", key: "actions", sortable: false },
];

const items: Ref<ItemRecord[]> = useObservable(getItemRecord);

function edit(item: ItemRecord) {
  updateRecordStore.item = item;
}

function remove(item: ItemRecord) {
  removeDialog.value = true;
  removeItem.value = item;
}
</script>

<template>
  <v-data-table-virtual
    :items="items"
    fixed-header
    :height="vmainHeight"
    :headers="headers"
  >
    <template v-slot:item="{ item }">
      <tr
        :class="{
          'bg-error': removeDialog && removeItem?.id === item.id,
          'bg-secondary': updateRecordStore.item?.id === item.id,
        }"
      >
        <td v-for="(_, key) in recordHeaderMap">
          {{ item[key] }}
        </td>
        <td>
          <div class="d-flex ga-2 justify-end">
            <v-icon
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
              @click="edit(item)"
            ></v-icon>
            <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="remove(item)"
            ></v-icon>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
  <RemoveRecord v-model="removeDialog" :props-item="removeItem"></RemoveRecord>
</template>
