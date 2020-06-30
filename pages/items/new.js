import React, {Component} from 'react';
import deployer from '../../ethereum/deployer';
import Layout from '../../components/layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Router from 'next/router';

class NewItem extends Component {
    state = {
        name: '',
        description: '',
        price: '',
        quantity: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading:true});

        try {
            const accounts = await web3.eth.getAccounts();
            const weiPrice = await web3.utils.toWei(this.state.price,'ether');
            await deployer.methods
                .deployItem(this.state.name,this.state.description,weiPrice,this.state.quantity)
                .send({
                    from:accounts[0]
                });
            Router.push('/');
        }
        catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading:false});
    }

    render() {
        return (
            <Layout>
                <h1>Start Selling</h1>
                <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name</label>
                        <Input 
                            placeholder="Name of item to be sold"
                            value = {this.state.name}
                            onChange = {event => this.setState({name:event.target.value})}     
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            placeholder="Description of the item"
                            value = {this.state.description}
                            onChange = {event => this.setState({description: event.target.value})} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <Input 
                            placeholder="Please enter price"
                            value = {this.state.price}
                            label = "ether"
                            labelPosition = "right"
                            onChange = {event => this.setState({price: event.target.value})} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity Available</label>
                        <Input 
                            placeholder="Enter the quantity available to be sold"
                            value = {this.state.value}
                            onChange = {event => this.setState({quantity: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header = "Oops!" content= {this.state.errorMessage}/>
                    <Button loading = {this.state.loading} secondary>Sell!</Button>
                </Form>
            </Layout>
        )
    }
}

export default NewItem;