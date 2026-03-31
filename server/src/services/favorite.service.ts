import { AuthRequest } from "../middlewares/auth.middleware.js";
import { FavoriteRepository } from "../repository/favorite.repository.js";
import { generateFileUrl } from "../utils/file.util.js";

export class FavoriteService {
  private repo = new FavoriteRepository();

  // add favorie
  async addFavorite(userId: string, propertyId: string) {
    const existing = await this.repo.findOne(userId, propertyId);
    if (existing) throw new Error("Property already favorited");

    return this.repo.create(userId, propertyId);
  }
  // remove favorite
  async removeFavorite(userId: string, propertyId: string) {
    const existing = await this.repo.findOne(userId, propertyId);
    if (!existing) throw new Error("Favorite not found");

    return this.repo.delete(userId, propertyId);
  }
  // get all favorite

  async getFavorites(userId: string, req: AuthRequest) {
    const favorites = await this.repo.findByUser(userId);

    return favorites.map((fav) => ({
      ...fav,
      property: fav.property
        ? {
            ...fav.property,
            image: fav.property.image
              ? generateFileUrl(req, fav.property.image)
              : null,
          }
        : null,
    }));
  }
}
