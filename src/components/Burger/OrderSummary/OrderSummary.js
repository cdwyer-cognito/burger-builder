import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functional component, only a class to demo the nested updates from the Modal component
    componentWillUpdate(){
        console.log("[OrderSummary.js] Will Update");
    }

    render() {

        const ingredientSummary = Object.keys( this.props.ingredients)
        .map( igKey => {
            if ( this.props.ingredients[ igKey ] > 0 ) {
                return ( <li key={ igKey }>
                            <span style={ {textTransform: 'capitalize'} }>{igKey}</span>: { this.props.ingredients[ igKey ] }
                        </li>);
            }
            return null;
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: £ { this.props.price.toFixed(2) }</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={ this.props.purchasedCancelled } >CANCEL</Button>
                <Button btnType="Success" clicked={ this.props.purchaseContinue } >OK</Button>
            </Aux>
        );

    }
};

export default OrderSummary;