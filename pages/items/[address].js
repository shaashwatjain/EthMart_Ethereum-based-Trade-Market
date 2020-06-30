import React, {Component} from 'react';
import Layout from '../../components/layout';
import Item from '../../ethereum/item';
import web3 from '../../ethereum/web3';
import { Card, Button, Grid } from 'semantic-ui-react';
import BuyNow from '../../components/BuyNow';

class itemDetails extends Component {
    static async getInitialProps(props) {
        const item = await Item(props.query.address);
        const details = await item.methods.retrieveItem().call();

        return {
            contractAddress: props.query.address,
            name: details[0],
            description: details[1],
            price: details[2],
            quantity: details[3],
            seller: details[4]
        };
    }

    renderCards() {
        const {
            contractAddress,
            name,
            description,
            price,
            quantity,
            seller
        } = this.props;

        const items = [
            {
                header: 'Description',
                description : description
            },
            {
                header: 'Price (in ether)',
                description: JSON.stringify(web3.utils.fromWei(price, 'ether'))
            },
            {
                header: 'Quantity Available',
                description: quantity
            },
            {
                header: 'Seller Address',
                description: seller,
                style : {overflowWrap: 'break-word'}
            }
        ];

        return <Card.Group centered itemsPerRow='2' items={items} />;
    }

    onClick = async (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <Layout>
                <h1>{this.props.name}</h1>
                <hr />
                <Grid divided stretched celled="internally">
                    <Grid.Row >
                        <Grid.Column>
                            {this.renderCards()}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns = {1}>
                        <Grid.Column>
                            <BuyNow 
                                address = {this.props.contractAddress} 
                                price = {this.props.price}
                                quantity = {this.props.quantity}
                             />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default itemDetails;