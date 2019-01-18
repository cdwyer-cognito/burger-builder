import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const buildControls = ( props ) => {

    const controls = Object.keys( props.ingredients ).map( key => {
        return { label: key.charAt(0).toUpperCase() + key.substring(1), type: key.toLowerCase() }
    });

    return (
        <div className={ classes.BuildControls }>
            <p>Current Price: £ <strong>{ props.price.toFixed(2) } </strong></p>
            { controls.map( ctrl => (
                <BuildControl 
                    key={ ctrl.label } 
                    label={ ctrl.label }
                    more={ () => props.ingredientAdded( ctrl.type ) }
                    less={ () => props.ingredientRemoved( ctrl.type ) }
                    disabled={ props.disabled[ctrl.type] } />
            ))}
            <button 
                className={ classes.OrderButton }
                disabled={ !props.purchasable}
                onClick={ props.ordered } >ORDER NOW</button>
        </div>
    );
};

export default buildControls