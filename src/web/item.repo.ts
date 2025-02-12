import { Item, ItemCreateSchema } from "./type";
import { z } from "zod";

export interface ItemRepoCreateParam {
  data: z.infer<typeof ItemCreateSchema> & {
    uniqueId: string;
  };
}

export class ItemRepo {
  private items: Item[] = [];

  async create(item: Item): Promise<Item> {
    this.items.push(item);
    return item;
  }

  async getAll(): Promise<Item[]> {
    return this.items;
  }
}
