// Utilities
import { defineStore } from "pinia";
import { type ItemRecord } from "@/db/visible";

export const useUpdateRecordStore = defineStore("updateRecord", () => {
  const item: Ref<ItemRecord | undefined> = ref();
  return { item };
});
