import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User'

export const validateLogin = (req : Request, res : Response, next : NextFunction): void => {
    // Vérifie que les champs attendus soient bien remplis
    const { email, password } : User = req.body

    // S'ils ne sont pas remplis, envoie une erreur
    if(!email || !password){
        res.status(400).json({ message: 'L\'email et le mot de passe sont des champs obligatoires.'});
        return
    }

    // Définission d'une regex pour accepter un email
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    // Condition pour vérifier si l'email est correcte
    if(!email.match(re)){
       res.status(400).json({ message: 'Ce n\'est pas une adresse mail.'});
       return
    }

    // next() de express envoie la fonction d'après (ou middleware suivant) si les conditions sont validées
    next()
  }

