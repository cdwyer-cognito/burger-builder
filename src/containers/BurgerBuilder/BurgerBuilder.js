import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES =  {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    chicken: 2.0
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            chicken: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( ( igKey ) => {
                return ingredients[ igKey ]
            })
            .reduce( ( sum, el ) => {
                return sum + el;
            } , 0);
        
            this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        let oldCount = this.state.ingredients[ type ];
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = oldCount + 1;

        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + INGREDIENT_PRICES[type]

        this.setState( {totalPrice: newPrice, ingredients: updatedIngredients} );
        this.updatePurchaseState( updatedIngredients );
    }

    removeIngredientHandler = ( type ) => {
        let oldCount = this.state.ingredients[ type ];

        if  ( oldCount <= 0 ) {
            return;
        }

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = oldCount - 1;

        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - INGREDIENT_PRICES[type]

        this.setState( {totalPrice: newPrice, ingredients: updatedIngredients} );
        this.updatePurchaseState( updatedIngredients );

    }

    purchaseHandler = () => {
        this.setState( { purchasing: true} )
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false} )
    }

    purchaseContinueHandler = () => {
        alert('You Continue!')
    }

    render() {
        // copy the state ingredients
        const disabledInfo = {
            ...this.state.ingredients
        };
        // loop though checking if the count is 0, return bool
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler } >
                    <OrderSummary
                        ingredients={ this.state.ingredients } 
                        purchasedCancelled={ this.purchaseCancelHandler }
                        purchaseContinue={ this.purchaseContinueHandler }
                        price={ this.state.totalPrice }
                        />
                </Modal>
                <Burger ingredients={ this.state.ingredients }/>
                <BuildControls 
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={ this.removeIngredientHandler }
                    disabled={ disabledInfo }
                    purchasable={ this.state.purchasable }
                    ordered={ this.purchaseHandler }
                    price={ this.state.totalPrice }
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;