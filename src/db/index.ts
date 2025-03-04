import Dexie, { type EntityTable } from "dexie";

interface Inventory {
  id: number;
  directory: string;
  name: string;
  registrationDate: Date;
}

const db = new Dexie("Inventory") as Dexie & {
  inventory: EntityTable<Inventory, "id">;
};

db.version(1).stores({
  inventory: "++id, &[directory+name], name, registrationDate",
});

export type { Inventory };
export { db };
