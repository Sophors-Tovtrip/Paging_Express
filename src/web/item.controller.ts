import { Request, Response } from "express";
import { ItemService } from "./item.service";

const itemService = new ItemService();

export class ItemController {
  public async createItem(req: Request, res: Response) {
    try {
      const item = await itemService.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

 public async getItems(req: Request, res: Response) {
  try {
    // Extract page, limit-items, and filter from query params
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);
    const filters: Record<string, any> = { ...req.query };

    // delete filters.page;
    // delete filters.limit;

    // Convert numeric filters to actual numbers (ex: price)
    for (const key in filters) {
      if (!isNaN(Number(filters[key]))) {
        filters[key] = Number(filters[key]);
      }
    }

    // Fetch filtered data and total count
    const { data, total } = await itemService.getItems(page, limit, filters);
    res.json({ data, total, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
}




}