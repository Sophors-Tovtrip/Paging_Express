// src/services/item.service.ts
import knex from "../db/knex";
import { Item, ItemSchema } from "./type";

export class ItemService {
  async createItem(data: unknown): Promise<Item> {
    const parsedData = ItemSchema.parse(data); 
    const [item] = await knex("items").insert(parsedData).returning("*");

    console.log(item);
    return item;
  }

 async getItems(
    page: number = 1,
    limit: number = 10,
    filter: Partial<Item> = {}
  ): Promise<{ data: Item[]; total: number }> {
    const defaultPageSize = 10;
    const baseOffset = (page - 1) * defaultPageSize;
    const offset = baseOffset;

    const baseQuery = knex('items').where((builder) => {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          builder.where(key, 'like', `%${value}%`);
        }
      });
    });

    const totalQuery = baseQuery.clone().count('* as count').first();
    const total = Number((await totalQuery)?.count) || 0;

    const data = await baseQuery.clone()
      .orderBy('id', 'asc')
      .offset(offset)
      .limit(limit)
      .select('*');

    return { data, total };
  }

}