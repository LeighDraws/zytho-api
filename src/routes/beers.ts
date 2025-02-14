import { Router } from "express";
import { getBeers, createBeer, getBeerById, getBeersFromBrewery, getIngredientOfBeer, updateBeer, deleteBeerById } from "../controllers/beersController";
export const router = Router();

/**
 * @swagger
 * /beers:
 *   get:
 *     summary: Récupérer toutes les bières et les informations principales
 *     tags:
 *       - Beers
 *     responses:
 *       200:
 *         description: Liste des bières récupérée avec succès.
 *       404:
 *         description: Liste des bières non trouvée.
 */
router.get("/", getBeers);

/**
 * @swagger
 * /beers/{id}:
 *   get:
 *     summary: Récupérer toutes les informations d'une bière précise grâce à son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bière trouvée.
 *       404:
 *         description: Bière introuvable.
 */
router.get("/:id", getBeerById);

/**
 * @swagger
 * /beers/breweries/{id}:
 *   get:
 *     summary:  Récupérer toutes les bières d'une brasserie précise grâce à son ID
 *     tags:
 *       - Beers
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
router.get("/breweries/:id", getBeersFromBrewery);

/**
 * @swagger
 * /beers/ingredients/{id}:
 *   get:
 *     summary: Récupérer les ingrédients d'une bière précise grâce à son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bière trouvée.
 *       404:
 *         description: Bière introuvable.
 */
router.get("/ingredients/:id", getIngredientOfBeer);

/**
 * @swagger
 * /beers:
 *   post:
 *     summary: Ajouter une bière à la base de données
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: brewery_id
 *         in: path
 *         required: true
 *         description: ID de la brasserie qui produit la bière
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
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               abv:
 *                 type: number
 *               picture_url:
 *                 type: string
 *               production_date:
 *                 type: string
 *                 format: date
 *             required:
 *               - name
 *               - price
 *               - description
 *               - color
 *               - abv
 *               - picture_url
 *               - production_date
 *     responses:
 *       201:
 *         description: Bière ajoutée avec succès.
 *       400:
 *         description: Données invalides ou manquantes.
 */
router.post("/:brewery_id", createBeer);

/**
 * @swagger
 * /beers/{id}:
 *   put:
 *     summary: Modifier les informations d'une bière précise grâce à son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière
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
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               abv:
 *                 type: number
 *               picture_url:
 *                 type: string
 *               production_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Bière modifiée.
 *       404:
 *         description: Bière introuvable.
 *       400:
 *         description: Informations incomplètes.
 */
router.put("/:id", updateBeer);

/**
 * @swagger
 * /beers/{id}:
 *   delete:
 *     summary: Supprimer une bière grâce à son ID
 *     tags:
 *       - Beers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la bière
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bière supprimée avec succès.
 *       404:
 *         description: Bière introuvable.
 */
router.delete("/:id", deleteBeerById)