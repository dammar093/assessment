import { Request, Response } from "express";
import { FavoriteService } from "../services/favorite.service.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export class FavoriteController {
  private service = new FavoriteService();

  async add(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { propertyId } = req.body;

      const favorite = await this.service.addFavorite(userId, propertyId);
      return res.status(201).json(favorite);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async remove(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { propertyId } = req.body;

      await this.service.removeFavorite(userId, propertyId);
      return res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      // Pass the request object to generate URLs
      const favorites = await this.service.getFavorites(userId, req);

      return res.status(200).json(favorites);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
