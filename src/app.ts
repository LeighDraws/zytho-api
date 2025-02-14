// importe le module Express et le Router
import express, { Application, Router } from "express";
import cors from "cors";
import {router as beersRoutes} from "./routes/beers";
import {router as breweriesRoutes} from "./routes/breweries";
import {router as usersRoutes} from "./routes/users"
import {router as authRoutes} from "./routes/auth"
import {router as faveRoutes} from "./routes/favorites"
import { setupSwagger } from "./swagger";

// const express = require('express');
const app:Application = express();

// pour recevoir des données en json
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5175'], // Remplace par l'URL de ton front
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

app.use(cors(corsOptions));

app.use("/beers", cors(corsOptions), beersRoutes);
app.use("/breweries", cors(corsOptions), breweriesRoutes);
app.use("/users", cors(corsOptions), usersRoutes);
app.use("/auth", cors(corsOptions), authRoutes);
app.use("/fave", cors(corsOptions), faveRoutes);

setupSwagger(app)

app.get('/', (req, res) => {
    // envoie une réponse 'Hello World!' au client
    res.send("Bienvenue sur l'API Zythologue!");
  })

export default app;

