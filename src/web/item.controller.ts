// src/controllers/item.controller.ts
import { Request, Response } from "express";
import { ItemService } from "./item.service";

const itemService = new ItemService();

export class ItemController {
  public async createItem(req: Request, res: Response) {
    try {
      const item = await itemService.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }

  public async getItems(req: Request, res: Response) {
    try {
      const page = Math.max(parseInt(req.query.page as string) || 1, 1); // Ensure page is at least 1
      const limit = Math.max(parseInt(req.query.limit as string) || 10, 1); // Ensure limit is positive
      const filter = req.query.filter ? JSON.parse(req.query.filter as string) : {};

      const { data, total } = await itemService.getItems(page, limit, filter);
      res.json({ data, total, page, limit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching items" });
    }
  }

}