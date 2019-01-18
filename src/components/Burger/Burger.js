import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    // console.log( '[Burger.js] ingredients', props.ingredients );
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [ ...Array( props.ingredients[igKey] ) ].map( ( _, i ) => {
                return <BurgerIngredient key={ igKey + i } type={ igKey } />
            });
        }).reduce( (arr, el) => {
            return arr.concat(el);
        }, [] );

    // console.log( '[Burger.js] transformedIngredients', transformedIngredients);

    if ( transformedIngredients.length === 0 ) {
        transformedIngredients = <p> Please start adding ingredients!</p>
    } 

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient  type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient  type="bread-bottom" />
        </div>
    );
}

export default burger;