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

app.use(cors());

app.use("/beers", cors(), beersRoutes);
app.use("/breweries", cors(), breweriesRoutes);
app.use("/users", cors(), usersRoutes);
app.use("/auth", cors(), authRoutes);
app.use("/fave", cors(), faveRoutes);

setupSwagger(app)

app.get('/', (req, res) => {
    // envoie une réponse 'Hello World!' au client
    res.send("Bienvenue sur l'API Zythologue!");
  })

export default app;

