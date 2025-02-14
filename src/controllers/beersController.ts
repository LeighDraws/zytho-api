import { Request, Response } from "express";
import { pool } from "../config/db";

// ** CRUD **
// Récupérer toutes les bières et le nom de la brasserie
export const getBeers = async (req: Request, res: Response) => {
  try {
    const data = await pool.query(
      `SELECT 
        beers.*,
        breweries.name AS brewery,
        breweries.country AS country,
        categories.name AS category
        FROM beers
        JOIN breweries
        ON beers.brewery_id = breweries.brewery_id
        LEFT JOIN beer_has_category
        ON beer_has_category.beer_id = beers.beer_id
        LEFT JOIN categories
        ON categories.category_id = beer_has_category.category_id`
    );
    res.status(200).json({ beers: data.rows });
  } catch (error: any) {
    console.error("Erreur lors de la récupération des bières", error);
    res.status(500).send(error.message);
  }
};

// Récupérer toutes les informations d'une bière précise.
export const getBeerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const beer = await pool.query(
      `SELECT beers.*, breweries.name AS brewery, breweries.country AS country, categories.name AS category
        FROM beers 
        LEFT JOIN breweries
        ON beers.brewery_id = breweries.brewery_id
        LEFT JOIN beer_has_category
        ON beer_has_category.beer_id = beers.beer_id
        LEFT JOIN categories
        ON categories.category_id = beer_has_category.category_id
        WHERE beers.beer_id = $1`,
      [id]
    );
    res.status(200).json({ beer: beer.rows[0] });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la bière`, error);
    res.status(500).send(error.message);
  }
};

// Récupérer les bières d'une brasserie
export const getBeersFromBrewery = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const beers = await pool.query(
      `SELECT * FROM beers
      WHERE brewery_id = $1`,
      [id]
    );
    res.status(200).json({ beers: beers.rows });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération des bières de la brasserie`, error);
    res.status(500).send(error.message);
  }
};

// Récupérer les ingrédients d'une bière
export const getIngredientOfBeer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient = await pool.query(
      `SELECT ingredients.name AS ingredient, ingredients.type
        FROM ingredients
        JOIN beer_has_ingredient
        ON beer_has_ingredient.ingredient_id = ingredients.ingredient_id
        JOIN beers
        ON beer_has_ingredient.beer_id = beers.beer_id
        WHERE beers.beer_id = $1`,
      [id]
    );
    res.status(200).json({ ingredients: ingredient.rows });
  } catch (error: any) {
    console.error(`Erreur lors de la récupération des ingrédients de la bière`, error);
    res.status(500).send(error.message);
  }
};

// Créer une nouvelle bière à partir de l'espace de la brasserie.
export const createBeer = async (req: Request, res: Response) => {
  try {
    const { brewery_id } = req.params;
    const { name, price, description, color, abv, picture_url } = req.body;
    const production_date = new Date().toJSON().slice(0, 10);
    const newBeer = await pool.query(
      `INSERT INTO beers (name, price, description, color, abv, picture_url, production_date, brewery_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        price,
        description,
        color,
        abv,
        picture_url,
        production_date,
        brewery_id,
      ]
    );
    res.status(201).json({ beer: newBeer.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la création de la bière", error);
    res.status(500).send(error.message);
  }
};

// Mettre à jour les informations d'une bière
export const updateBeer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, color, abv, picture_url, date } =
      req.body;
    const updatedBeer = await pool.query(
      `UPDATE beers
        SET name = $1, price = $2, description = $3, color = $4, abv = $5, picture_url =$6, production_date = $7
        WHERE beer_id = $8
        RETURNING *`,
      [name, price, description, color, abv, picture_url, date, id]
    );
    res.status(201).json({ beer: updatedBeer.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la création de la bière", error);
    res.status(500).send(error.message);
  }
};

// Supprimer une bière par son id
export const deleteBeerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBeer = await pool.query(
      `DELETE FROM beers
        WHERE beer_id = $1
        RETURNING *`,
      [id]
    );
    res.status(201).json({ beer: deletedBeer.rows[0] });
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la bière", error);
  }
};
