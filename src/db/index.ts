import Dexie, { type EntityTable } from "dexie";

interface Inventory {
  id: number;
  directory: string; // "/", "/冷蔵庫/"
  name: string;
  registredAt: Date;
  expiresAt: Date; // Date(0) means null
  contentAddedAt: Date; // Date(0) means null
}

const db = new Dexie("Inventory") as Dexie & {
  inventory: EntityTable<Inventory, "id">;
};

db.version(6).stores({
  inventory:
    "++id, &[directory+name], name, expirationDate, contentAddedAt, registrationDate",
});

export type { Inventory };
export { db };
