import { db } from "@/db";
import dayjs from "dayjs";

export interface ItemRecord {
  id: number;
  name: string;
  directory: string;
  expiresAt: string;
  registeredAt: string;
  containable: boolean;
}

export const recordHeaderMap = {
  name: "Name",
  directory: "Directory",
  expiresAt: "Expires at",
  containable: "Containable",
  registeredAt: "Registered at",
} as const satisfies { [K in keyof ItemRecord]?: string };

function expiresAtFormat(d: Date): string {
  if (d.valueOf() === new Date(0).valueOf()) return "-";
  return dayjs(d).format("YYYY/MM/DD");
}

export async function getItemRecord(): Promise<ItemRecord[]> {
  const raw = await db.inventory.toArray();
  return raw.map((inv) => ({
    id: inv.id,
    name: inv.name,
    directory: inv.directory,
    expiresAt: expiresAtFormat(inv.expiresAt),
    containable: inv.contentAddedAt.valueOf() === new Date(0).valueOf(),
    registeredAt: dayjs(inv.registeredAt).format("YYYY/MM/DD HH:mm:ss"),
  }));
}
