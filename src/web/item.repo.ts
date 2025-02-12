// src/repositories/item.repo.ts
import { Item } from "./type";

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
