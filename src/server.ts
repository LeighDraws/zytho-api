import app from "./app";

// on utilisera le port 3000 pour accéder au serveur
const port = 3000;

// démarrage du serveur sur le port défini
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  })