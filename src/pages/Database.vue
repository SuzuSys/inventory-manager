<script lang="ts" setup>
import { db } from "@/db";

db.inventory.clear();

async function getAll() {
  console.log(await db.inventory.toArray());
}

getAll();

async function addItem() {
  const id = await db.inventory.add({
    directory: "/",
    name: "shldered",
    registrationDate: new Date(),
    expirationDate: null,
  });
  console.log(id);
}

addItem();
</script>

<template></template>
