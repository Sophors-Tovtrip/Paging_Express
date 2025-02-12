import knex from "../db/knex";
import { Item, ItemCreateSchema } from "./type";
import { v4 as uuidv4 } from "uuid";

export class ItemService {
  
  async createItem(data: unknown): Promise<Item> {
    const parsedData = ItemCreateSchema.parse(data); 
    const uniqueId = `ITEM-${uuidv4().toUpperCase().replace(/-/g, '').slice(0, 8)}`;
    const itemData = { ...parsedData, uniqueId };

    const [item] = await knex("items").insert(itemData).returning("*");

    console.log(item);
    return item;
  }

  async getItems(
    page: number = 1,
    limit: number = 10,
    filters: Record<string, any> = {}
  ): Promise<{ data: Item[]; total: number }> {
    // Base query to fetch items, applying the filters
    const baseQuery = knex("items").where((builder) => {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === "string") {
          builder.where(key, "like", `%${value}%`);
        } else if (!isNaN(Number(value))) {
          builder.where(key, "=", Number(value));
        }
      });
    });

    // Get the total number of items after filtering
    const totalQuery = baseQuery.clone().count("* as count").first();
    const total = Number((await totalQuery)?.count) || 0;

    // Calculate pagination (offset) based on the page and limit
    const offset = (page - 1) * limit;

    // Fetch the paginated data after applying filters
    const data = await baseQuery
      .offset(offset)
      .limit(limit)
      .select("*");

    return { data, total };
  }




}