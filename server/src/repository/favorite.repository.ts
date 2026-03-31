import { prisma } from "../lib/prisma.lib.js";

export class FavoriteRepository {
  async create(userId: string, propertyId: string) {
    return prisma.favorite.create({
      data: { userId, propertyId },
      include: { property: true },
    });
  }

  async delete(userId: string, propertyId: string) {
    return prisma.favorite.delete({
      where: { userId_propertyId: { userId, propertyId } },
    });
  }

  async findByUser(userId: string) {
    return prisma.favorite.findMany({
      where: { userId },
      include: { property: true },
    });
  }

  async findOne(userId: string, propertyId: string) {
    return prisma.favorite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
  }
}
