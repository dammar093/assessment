import { prisma } from "../lib/prisma.lib.js";
import { CreatePropertyDto, UpdatePropertyDto } from "../dto/property.dto.js";

export class PropertyRepository {
  async create(data: CreatePropertyDto & { image: string }) {
    return prisma.property.create({ data });
  }

  async findById(id: string) {
    return prisma.property.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdatePropertyDto & { image: string }) {
    return prisma.property.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.property.delete({ where: { id } });
  }

  async getAll() {
    return prisma.property.findMany({
      orderBy: { created_at: "desc" },
    });
  }
}
