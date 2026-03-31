import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { UserRole } from "../generated/prisma/enums.js";
import { PropertyController } from "../controllers/property.controller.js";
import { upload } from "../config/multer.config.js";

const propertyRouter = Router();
const propertyController = new PropertyController();

/**
 * @swagger
 * tags:
 *   name: Property
 *   description: Property management APIs
 */

/**
 * @swagger
 * /api/v1/properties:
 *   post:
 *     summary: Create a new property (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Luxury Villa
 *               description:
 *                 type: string
 *                 example: Beautiful villa with sea view
 *               price:
 *                 type: integer
 *                 example: 500000
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Property created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
propertyRouter.post(
  "/",
  authenticate,
  authorize([UserRole.ADMIN]),
  upload.single("image"),
  propertyController.create.bind(propertyController),
);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   patch:
 *     summary: Update property (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
propertyRouter.patch(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN]),
  upload.single("image"),
  propertyController.update.bind(propertyController),
);

/**
 * @swagger
 * /api/v1/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Property]
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: integer
 *                   image:
 *                     type: string
 */
propertyRouter.get("/", propertyController.getAll?.bind(propertyController));

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Property]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property details
 *       404:
 *         description: Property not found
 */
propertyRouter.get(
  "/:id",
  propertyController.getById?.bind(propertyController),
);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   delete:
 *     summary: Delete property (Admin only)
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Property not found
 */
propertyRouter.delete(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN]),
  propertyController.delete.bind(propertyController),
);

export default propertyRouter;
