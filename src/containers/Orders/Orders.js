import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
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

                this.setState( { loading: false, orders: fetchedOrders } );
            })
            .catch( err => { 
                this.setState( { loading: false } );
                console.log( err );
            })
    }

    render() {

        let orders = <h1 style={{ textAlign: 'center'}}>There are no orders to show</h1>;

        if ( this.loading ) {
            orders = <Spinner />;
            
        } else if ( !this.loading && this.state.orders.length > 0 ) {
            orders = (
                this.state.orders.map( order => ( 
                    <Order 
                        key={ order.id }
                        ingredients={ order.ingredients }
                        price={ +order.price }/>) )
            )
        }

        return(
            <div>
                { orders }
            </div>
        )
    }
}

export default withErrorHandler( Orders, axios );