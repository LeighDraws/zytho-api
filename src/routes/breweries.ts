import { Router } from "express";
import { createBrewery, deleteBreweryById, getBreweries, getBreweryById, updateBrewery, getBreweryByOwnerId } from "../controllers/breweriesController";
export const router = Router();

/**
 * @swagger
 * /breweries:
 *   get:
 *     summary: Récupérer toutes les brasseries et les informations principales
 *     tags:
 *       - Breweries
 *     responses:
 *       200:
 *         description: Liste des brasseries récupérée avec succès.
 *       404:
 *         description: Liste des brasseries non trouvée.
 */
router.get("/", getBreweries);

/**
 * @swagger
 * /breweries/{id}:
 *   get:
 *     summary: Récupérer toutes les informations d'une brasserie précise grâce à son ID
 *     tags:
 *       - Breweries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la brasserie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Brasserie trouvée.
 *       404:
 *         description: Brasserie introuvable.
 */
router.get("/:id", getBreweryById);

/**
 * @swagger
 * /breweries/owner/{id}:
 *   get:
 *     summary: Récupérer une brasserie grâce à l'ID de son propriétaire
 *     tags:
 *       - Breweries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du propriétaire
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Brasserie trouvée.
 *       404:
 *         description: Brasserie introuvable.
 */
router.get("/owner/:id", getBreweryByOwnerId);

/**
 * @swagger
 * /breweries/{user_id}:
 *   post:
 *     summary: Ajouter une brasserie à la base de données
 *     tags:
 *       - Breweries
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: ID de la personne qui possède la brasserie
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               region:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               picture_url:
 *                 type: string
 *               website_url:
 *                 type: string
 *             required:
 *               - name
 *               - country
 *               - region
 *               - description
 *               - address
 *               - picture_url
 *               - website_url
 *     responses:
 *       201:
 *         description: Brasserie ajoutée avec succès.
 *       400:
 *         description: Données invalides ou manquantes.
 */
router.post("/:user_id", createBrewery);

/**
 * @swagger
 * /breweries/{id}:
 *   put:
 *     summary: Modifier les informations d'une brasserie précise grâce à son ID
 *     tags:
 *       - Breweries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la brasserie à modifier
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               region:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               picture_url:
 *                 type: string
 *               website_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Brasserie modifiée.
 *       404:
 *         description: Brasserie introuvable.
 *       400:
 *         description: Informations incomplètes.
 */
router.put("/:id", updateBrewery);

/**
 * @swagger
 * /breweries/{id}:
 *   delete:
 *     summary: Supprimer une bière grâce à son ID
 *     tags:
 *       - Breweries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la brasserie à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Brasserie supprimée avec succès.
 *       404:
 *         description: Brasserie introuvable.
 */
router.delete("/:id", deleteBreweryById);