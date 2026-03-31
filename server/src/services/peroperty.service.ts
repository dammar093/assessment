import { PropertyRepository } from "../repository/peroperty.repository.js";
import { deleteFile, generateFileUrl } from "../utils/file.util.js";
import { CreatePropertyDto, UpdatePropertyDto } from "../dto/property.dto.js";
import { Request } from "express";

export class PropertyService {
  private repo = new PropertyRepository();

  // create property
  async create(data: CreatePropertyDto, filename: string, req: Request) {
    const property = await this.repo.create({ ...data, image: filename });
    return { ...property, image: generateFileUrl(req, property.image) };
  }

  // update property
  async update(
    id: string,
    data: UpdatePropertyDto,
    req: Request,
    newFilename?: string,
  ) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error("Property not found");

    let image = existing.image;
    if (newFilename) {
      deleteFile(existing.image);
      image = newFilename;
    }

    const updated = await this.repo.update(id, { ...data, image });
    return { ...updated, image: generateFileUrl(req, updated.image) };
  }
  // delete property

  async delete(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error("Property not found");

    deleteFile(existing.image);
    return this.repo.delete(id);
  }

  // get all property
  async getAll(req: Request) {
    const properties = await this.repo.getAll();
    return properties.map((p) => ({
      ...p,
      image: generateFileUrl(req, p.image),
    }));
  }

  // get property by id
  async getById(id: string, req: Request) {
    const property = await this.repo.findById(id);
    if (!property) throw new Error("Property not found");
    return { ...property, image: generateFileUrl(req, property.image) };
  }
}
