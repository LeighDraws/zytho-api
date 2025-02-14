import { Request, Response } from "express";
import { pool } from "../config/db";

// Ajouter une bière à ses favoris pour un utilisateur connecté
export const newFavoriteBeerById = async (req: Request, res: Response) => {
    try {
      const { beer_id, user_id } = req.params;
      const addBeer = await pool.query(
        `INSERT INTO favorites (beer_id, user_id)
         VALUES ($1, $2)
         RETURNING *`,
        [beer_id, user_id]
      );
      res.status(200).json({ favorites: addBeer.rows[0] });
    } catch (error: any) {
      console.error(`Erreur lors de la récupération des favoris de l'utilisateur`, error);
      res.status(500).send(error.message);
    }
  };

// Supprimer une bière à ses favoris pour un utilisateur connecté
export const deleteFavoriteBeerById = async (req: Request, res: Response) => {
    try {
      const { user_id, beer_id } = req.params;
      const deletedBeer = await pool.query(
        `DELETE FROM favorites
         WHERE user_id = $1 AND beer_id = $2
         RETURNING *`,
        [user_id, beer_id]
      );
      res.status(200).json({ favorites: deletedBeer.rows[0] });
    } catch (error: any) {
      console.error(`Erreur lors de la récupération des favoris de l'utilisateur`, error);
      res.status(500).send(error.message);
    }
  };

// Récupérer les bières favorites pour un utilisateur précis.
export const getUserFavoritesById = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const favoritesBeers = await pool.query(
        `SELECT beers.beer_id, beers.name, beers.price, beers.picture_url
        FROM users 
        JOIN favorites
        ON users.user_id = favorites.user_id
        JOIN beers
        ON beers.beer_id = favorites.beer_id
        WHERE users.user_id = $1`,
        [user_id]
      );
      res.status(200).json({ favorites: favoritesBeers.rows });
    } catch (error: any) {
      console.error(`Erreur lors de la récupération des favoris de l'utilisateur`, error);
      res.status(500).send(error.message);
    }
  };