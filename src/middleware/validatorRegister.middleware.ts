import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User'

export const validateRegister = (req : Request, res : Response, next : NextFunction): void => {
    // Vérifie que les champs attendus soient bien remplis
    const { first_name, last_name, email, password } : User = req.body

    // S'ils ne sont pas remplis, envoie une erreur
    if(!first_name || !last_name || !email || !password){
        res.status(400).json({ message: 'Tous les champs sont obligatoires.'});
        return
    }

    // Définission d'une regex pour accepter un email
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    // Condition pour vérifier si l'email est correcte
    if(!email.match(re)){
       res.status(400).json({ message: 'Ce n\'est pas une adresse mail.'});
       return
    }

    // Condition sur le mdp, doit faire au minimum 8 caractères
    if(password.length < 8) {
        res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères'});
        return
    }

    // next() de express envoie la fonction d'après (ou middleware suivant) si les conditions sont validées
    next()
  }

