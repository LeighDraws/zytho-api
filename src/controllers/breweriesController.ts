import { Request, Response } from "express";
import { pool } from "../config/db";
import { count, error } from "console";

// ** CRUD **
// Récupérer les informations principales pour toutes les brasseries
export const getBreweries = async (req: Request, res: Response) => {
  try {
    const breweries = await pool.query(
      `SELECT * FROM breweries`
    );
    res.status(200).json({ breweries: breweries.rows });
  } catch (error: any) {
    console.error("Erreur lors de la récupération des brasseries", error);
    res.status(500).send(error.message);
  }
};

// Récupérer toutes les informations d'une brasserie précise.
export const getBreweryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brewery = await pool.query(
      `SELECT * FROM breweries
        WHERE brewery_id = $1`,
      [id]
    );
    res.status(200).json({ brewery: brewery.rows[0] });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la brasserie`, error);
    res.status(500).send(error.message);
  }
};

// Récupérer une brasserie par l'id de son propriétaire
export const getBreweryByOwnerId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brewery = await pool.query(
      `SELECT * FROM breweries
        WHERE user_id = $1`,
      [id]
    );
    res.status(200).json({ brewery: brewery.rows[0] });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la brasserie`, error);
    res.status(500).send(error.message);
  }
};

// Créer une nouvelle brasserie.
export const createBrewery = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { name, country, region, description, address, picture_url, website_url } = req.body;
    const newBrewery = await pool.query(
      `INSERT INTO breweries (name, country, region, description, address, picture_url, website_url, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
      [name, country, region, description, address, picture_url, website_url, user_id]
    );
    res.status(201).json({ brewery: newBrewery.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la création de la brasserie", error);
    res.status(500).send(error.message);
  }
};

// Mettre à jour les informations d'une brasserie
export const updateBrewery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, country, region, description, address, picture_url, website_url, user_id } = req.body;

    const updatedBrewery = await pool.query(
      `UPDATE breweries
        SET name = $1, country = $2, region = $3, description = $4, address = $5, picture_url =$6, website_url = $7, user_id = $8
        WHERE brewery_id = $9
        RETURNING *`,
      [name, country, region, description, address, picture_url, website_url, user_id, id]
    );

    if (updatedBrewery.rowCount === 0) {
      res.status(404).json({ error: "Brasserie non trouvée ou modification non effectuées"})
      return
    }

    res.status(201).json({ brewery: updatedBrewery.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la création de la brasserie", error);
    res.status(500).send(error.message);
  }
};

// Supprimer une brasserie par son id
export const deleteBreweryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBrewery = await pool.query(
      `DELETE FROM breweries
        WHERE brewery_id = $1
        RETURNING *`,
      [id]
    );
    res.status(201).json({ brewery: deletedBrewery.rows[0] })
  } catch (error: any ) {
    console.error("Erreur lors de la suppression de la brasserie", error);
  }
};
