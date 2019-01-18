import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState() {
        const sum = Object.keys( this.props.ings )
            .map( ( igKey ) => {
                return this.props.ings[ igKey ]
            })
            .reduce( ( sum, el ) => {
                return sum + el;
            } , 0);
        
            return sum > 0;
    }
    
    purchaseHandler = () => {;
        this.setState( { purchasing: true} )
    }

    purchaseCancelHandler = () => {
        this.props.onInInitPurchase();
        this.setState( { purchasing: false} );
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        // copy the state ingredients
        const disabledInfo = {
            ...this.props.ings
        };
        // loop though checking if the count is 0, return bool
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
        
        if ( this.props.ings ) {
            burger =
                <Aux>
                    <Burger ingredients={ this.props.ings }/>
                    <BuildControls 
                        ingredients={ this.props.ings }
                        ingredientAdded={ this.props.onIngredientAdded }
                        ingredientRemoved={ this.props.onIngredientRemove }
                        disabled={ disabledInfo }
                        purchasable={ this.updatePurchaseState() }
                        ordered={ this.purchaseHandler }
                        price={ this.props.price }/>
                </Aux>;

            
            orderSummary = 
                <OrderSummary
                    ingredients={ this.props.ings } 
                    purchasedCancelled={ this.purchaseCancelHandler }
                    purchaseContinue={ this.purchaseContinueHandler }
                    price={ this.props.price }/>;
            
            if ( this.state.loading ){
                orderSummary = <Spinner />
            }
        }

        

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler } >
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error  
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ( ingName ) => dispatch( actions.addIngredient( ingName ) ),
        onIngredientRemove: ( ingName ) => dispatch( actions.removeIngredient( ingName )),
        onInitIngredients: () => dispatch( actions.initIngredients() ),
        onInInitPurchase: () => dispatch( actions.purchaseInit() )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( BurgerBuilder, axios ));