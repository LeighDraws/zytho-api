import { Request, Response } from "express";
import { pool } from "../config/db";

// ** CRUD **
// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await pool.query(
      `SELECT *
        FROM users`
    );
    res.status(200).json({ users: data.rows });
  } catch (error: any) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
    res.status(500).send(error.message);
  }
};

// Récupérer toutes les informations d'un utilisateur précis.
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      `SELECT *
        FROM users
        WHERE users.user_id = $1`,
      [id]
    );
    res.status(200).json({ user: user.rows[0] });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la utilisateur`, error);
    res.status(500).send(error.message);
  }
};

// Récupérer les informations du propriétaire d'une brasserie
export const getUserFromBrewery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      `SELECT first_name, last_name, email, profile_pic FROM users
      JOIN breweries
      ON breweries.user_id = users.user_id
      WHERE brewery_id = $1`,
      [id]
    );
    res.status(200).json({ user: user.rows[0] });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du propriétaire de la brasserie`, error);
    res.status(500).send(error.message);
  }
};

// Mettre à jour les informations d'un utilisateur
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password, role } = req.body;
    const updatedUser = await pool.query(
      `UPDATE users
        SET first_name = $1, last_name = $2, email = $3, password = $4, role = $5
        WHERE user_id = $6
        RETURNING *`,
      [first_name, last_name, email, password, role, id]
    );
    res.status(201).json({ user: updatedUser.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'utilisateur", error);
    res.status(500).send(error.message);
  }
};

// Supprimer un utilisateur par son id
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await pool.query(
      `DELETE FROM users
        WHERE user_id = $1
        RETURNING *`,
      [id]
    );
    res.status(201).json({ beer: deletedUser.rows[0] })
  } catch (error: any ) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
  }
};
