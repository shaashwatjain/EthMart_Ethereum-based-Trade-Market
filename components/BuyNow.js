import React ,{Component} from 'react';
import {Form, Button, Message, Dropdown} from 'semantic-ui-react';
import Item from '../ethereum/item';
import web3 from '../ethereum/web3';
import {useRouter, Router} from 'next/router';

class BuyNow extends Component {
    state = {
        price : web3.utils.fromWei(this.props.price, 'ether'),
        available: this.props.quantity,
        quantity: '0',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const router = useRouter();
        const {address} = router.props;
        const item = await Item(address);
        this.setState({errorMessage : '', loading: true});
        try {
            const accounts = await web3.eth.getAccounts();
            const priceWei = web3.utils.toWei(this.state.price, 'ether');
            const finalPrice = priceWei*this.state.quantity;
            await item.methods.orderItem(this.state.quantity).send({
                from : accounts[0],
                value :  finalPrice
            });
            Router.push('/items/success', `/items/${address}/success` );
        }
        catch (err)
        {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading:false});
    }

    handleChange = (e, {value}) => this.setState({quantity : value})

    renderDropdown() {
        var options = [];
        let inc = 0;
        while (inc < this.state.available)
        {
            options[inc] = {
                key : inc,
                text : `${inc + 1}`,
                value : `${inc + 1}`
            };
            inc++;
        }
        return <Dropdown 
            selection 
            options = {options} 
            defaultValue = {1}
            compact
            onChange = {this.handleChange}           
         />;
    }

    render() {
        return (
            <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
                <Form.Group widths = "equal">
                    <Form.Field>
                        <Button type = "submit" color="green" loading = {this.state.loading} size = "huge" fluid >
                            Buy Now
                        </Button>
                    </Form.Field>
                    <Form.Field>
                        Total : {this.state.price} x {this.state.quantity} = {this.state.price * this.state.quantity} ether
                    </Form.Field>
                    <Form.Field>
                        <label>Quantity : </label>
                        {this.renderDropdown()}
                    </Form.Field>
                </Form.Group>
                <Message error header = "Oops!" content = {this.state.errorMessage} />
            </Form>
        );
    }
}

export default BuyNow;