import { Request, Response } from "express";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

// Créer un nouvel utilisateur -- Mot de passe enregistré hashé avec bCrypt
export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, role } : User = req.body;
    const hash = await bcrypt.hash(password, 13)
    const newUser = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, email, hash, role]
    );
    res.status(201).json({ user: newUser.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la création de la utilisateur", error);
    res.status(500).send(error.message);
  }
};

// Se connecter en tant qu'utilisateur
export const logUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const userFound = await pool.query(
            `SELECT * FROM users
             WHERE email = $1`,
             [email]
        );

        if (userFound.rowCount > 0) {
            const user = userFound.rows[0]
            const isPasswordValid = await bcrypt.compare(password, user.password)
            // Suppression du mdp de l'objet user pour éviter la fuite de donnée
            delete user.password
            if (isPasswordValid) {
                res.status(200).json({ user: user })
            } else {
                res.status(401).json({ error: "Email ou mot de passe incorrect"})
            }
        } else {
            res.status(401).json({ error: "Email ou mot de passe incorrect"})
        }

    } catch (error: any) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        res.status(500).send(error.message);
    }
}