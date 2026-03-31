import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { UserRole } from "../generated/prisma/enums.js";

const favoriteRouter = Router();
const controller = new FavoriteController();

// all routes protected only for USER role
favoriteRouter.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite properties management (User role only)
 */

/**
 * @swagger
 * /api/v1/favorites/add:
 *   post:
 *     summary: Add a property to favorites
 *     description: Adds a property to the logged-in user's favorites list.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Property ID to add to favorites
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *             properties:
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the property to favorite
 *     responses:
 *       201:
 *         description: Property added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 propertyId:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 property:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     image:
 *                       type: string
 *                       example: "http://localhost:3000/uploads/image.png"
 *       400:
 *         description: Bad request / Property already favorited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
favoriteRouter.post("/", controller.add.bind(controller));

/**
 * @swagger
 * /api/v1//favorites/remove:
 *   delete:
 *     summary: Remove a property from favorites
 *     description: Removes a property from the logged-in user's favorites list.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Property ID to remove from favorites
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *             properties:
 *               propertyId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Favorite removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Favorite removed successfully
 *       400:
 *         description: Bad request / Favorite not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
favoriteRouter.delete("/", controller.remove.bind(controller));

/**
 * @swagger
 * /api/v1//favorites:
 *   get:
 *     summary: List all favorite properties for logged-in user
 *     description: Retrieves all favorite properties for the authenticated user.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   propertyId:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   property:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                         example: "http://localhost:3000/uploads/image.png"
 *       401:
 *         description: Unauthorized / Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
favoriteRouter.get("/", controller.list.bind(controller));

export default favoriteRouter;
