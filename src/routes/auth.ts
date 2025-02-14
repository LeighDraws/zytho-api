import { Router } from "express";
import { createUser, logUser } from "../controllers/authController";
import { validateRegister } from "../middleware/validatorRegister.middleware";
import { validateLogin } from "../middleware/validatorLogin.middleware";

export const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur à la base de données
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès.
 *       400:
 *         description: Données invalides ou manquantes.
 */
router.post("/register", validateRegister, createUser);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Se connecter en tant qu'utilisateur
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur connecté avec succès.
 *       400:
 *         description: Données invalides ou manquantes.
 */
router.post("/login", validateLogin, logUser)