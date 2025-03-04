import Dexie, { type EntityTable } from "dexie";

interface Inventory {
  id: number;
  directory: string; // "/", "/冷蔵庫/"
  name: string;
  registrationDate: Date;
  expirationDate: Date | null;
}

const db = new Dexie("Inventory") as Dexie & {
  inventory: EntityTable<Inventory, "id">;
};

db.version(2).stores({
  inventory: "++id, &[directory+name], name, registrationDate, expirationDate",
});

export type { Inventory };
export { db };
