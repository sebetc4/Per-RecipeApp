import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { Recipe } from '../../types/recipe.types';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

interface RecipeDetailsProps {
    recipe: Recipe;
}

export default function RecipeDetailsProps({ recipe }: RecipeDetailsProps) {
    //Hooks
    const router = useRouter();

    return router.isFallback ? <div>Chargement...</div> : <div>Détail de la recette! {recipe.title}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    // const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    return {
        paths: [
            {
                params: {
                    recipeId: '3',
                },
            },
        ],
        fallback: true,
        //false: redirige vers 404 si le slug n'existe pas dans les paths
        //true: fait la requête côté front lorsque le composant est monté (gestion de l'asynch pour attendre la data)
        //      Attention si la requête échoue pas de redirection 404 ds le comportement de base
        //      Not foud: true permet la redir 404
        //blocking: rendu côté serveur
        // True peut permette de faire un rendu statique de certaine page tout en faisant un dynamique des autres
    };
};

interface IParams extends ParsedUrlQuery {
    recipeId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { recipeId } = context.params as IParams;
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${recipeId}`);
    if (!data.ok) {
        return {
            notFound: true,
        };
    }
    const recipe = await data.json();
    return {
        props: {
            recipe,
        },
        revalidate: 20,
    };
};
