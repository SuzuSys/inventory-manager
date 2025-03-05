import Dexie, { type EntityTable } from "dexie";

interface Inventory {
  id: number;
  directory: string; // "/", "/冷蔵庫/"
  name: string;
  registrationDate: Date;
  expirationDate: Date | null;
  isFolder: number; // 0 or 1
}

const db = new Dexie("Inventory") as Dexie & {
  inventory: EntityTable<Inventory, "id">;
};

db.version(5).stores({
  inventory:
    "++id, isFolder, &[directory+name], name, registrationDate, expirationDate",
});

export type { Inventory };
export { db };
