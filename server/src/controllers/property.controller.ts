import { Request, Response } from "express";
import { PropertyService } from "../services/peroperty.service.js";
import { CreatePropertyDto, UpdatePropertyDto } from "../dto/property.dto.js";

export class PropertyController {
  private service = new PropertyService();

  // CREATE Property
  async create(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const file = req.file;

      if (!name || !description || !price || !file) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const dto: CreatePropertyDto = {
        name,
        description,
        price: Number(price),
      };

      const property = await this.service.create(dto, file.filename, req);

      return res.status(201).json(property);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE Property
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { name, description, price } = req.body;
      const file = req.file;

      const dto: UpdatePropertyDto = {
        name,
        description,
        price: price,
      };

      const property = await this.service.update(id, dto, req, file?.filename);

      return res.status(200).json(property);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET ALL Properties
  async getAll(req: Request, res: Response) {
    try {
      const properties = await this.service.getAll(req);
      return res.status(200).json(properties);
} catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // GET Property by ID
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const property = await this.service.getById(id, req);
      return res.status(200).json(property);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE Property
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await this.service.delete(id);
      return res.status(200).json({ message: "Property deleted successfully" });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
