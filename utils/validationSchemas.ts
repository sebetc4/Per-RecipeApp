import * as yup from 'yup';
import { ISignInParams, ISignUpParams } from '../types/params.types';

export const signUpSchema: yup.SchemaOf<ISignUpParams> = yup.object().shape({
    username: yup
        .string()
        .required('Le pseudo est requis')
        .min(6, 'Le pseudo doit faire au minimum 6 caractères')
        .max(20, 'Le pseudo doit faire au maximum 20 caractères'),
    email: yup.string().required("L'email est requis").email('Email non valide'),
    password: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Le mot de passe doit faire au minimum 6 caractères')
        .max(40, 'Le mot de passe doit faire au maximum 20 caractères'),
});

export const signInSchema: yup.SchemaOf<ISignInParams> = yup.object().shape({
    email: yup.string().required("L'email est requis").email('Email non valide'),
    password: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Mot de passe incorrect')
        .max(40, 'Mot de passe incorrect'),
});