import Dexie, { type EntityTable } from "dexie";

interface Inventory {
  id: number;
  directory: string; // "/", "/冷蔵庫/"
  name: string;
  registeredAt: Date;
  expiresAt: Date; // Date(0) means null
  contentAddedAt: Date; // Date(0) means null
}

const db = new Dexie("Inventory") as Dexie & {
  inventory: EntityTable<Inventory, "id">;
};

db.version(8).stores({
  inventory:
    "++id, [directory+name], name, expiresAt, contentAddedAt, registeredAt",
});

export type { Inventory };
export { db };
