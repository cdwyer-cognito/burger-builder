import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = ( err ) => {
    console.log( err );
    return {
        type: actionTypes.PURCAHSE_BURGER_FAIL,
        error: err
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};


export const purchaseBurger = ( oderData ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post('/orders.json', oderData)
            .then( res => {
                console.log( "[store/actions/order.js]", res );
                dispatch( purchaseBurgerSuccess( res.data.name, oderData ));
            })
            .catch(err => {
                dispatch( purchaseBurgerFail( err ) );
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = () => {
    return dispatch => {
        dispatch( fetchOrdersStart() );
        axios.get('/orders.json')
            .then( res => {
                const fetchedOrders = [];
                console.log( res.data );
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[ key ],
                        id: key
                    });
                }

                dispatch( fetchOrdersSuccess( fetchedOrders ) );
            })
            .catch( err => { 
                dispatch( fetchOrdersFail( err ) );
            })
    }

}