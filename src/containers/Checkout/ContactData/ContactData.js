import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false

    }

    orderHandler = ( event ) => {
        event.preventDefault();
        
        this.setState({ loading: true });

        console.log( this.props );

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                address: {
                    country: "UK",
                    postCode: "AB12 3CD",
                    street: "An Address",
                },
                email: "test@test.com",
                name: "Chris"
            },
            deliveryMethod: 'fastest'
        }
       
        console.log('[ContactData.js] order obj', order);
        axios.post('/orders.json', order)
            .then( res => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            })
            .catch( err => {
                this.setState( { loading: false } );
            });
    }

    render() {
        let form = (
            <form>
                <input className={ classes.Input } type="text" name="name" placeholder="Your name" />
                <input className={ classes.Input } type="text" name="email" placeholder="Your email" />
                <input className={ classes.Input } type="text" name="street" placeholder="Your street" />
                <input className={ classes.Input } type="text" name="postcode" placeholder="Your postcode" />
                <Button btnType="Success" clicked={ this.orderHandler } >ORDER</Button>
            </form>
        );

        if ( this.state.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={ classes.ContactData }>
                <h4>Enter Your Contact Details</h4>
                { form }
            </div>
        );
    }
}

export default ContactData;