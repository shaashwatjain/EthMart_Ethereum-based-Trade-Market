import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Item from '../ethereum/item';
import Router from 'next/router';

class RequestOrderRow extends Component {

    state = {
        loading : false
    };

    onClick = async () => {
        this.setState({loading : true});
        try {    
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            const item = Item(this.props.contract);
            await item.methods.completeOrder(this.props.item.id).send({
                from : account
            });}
        catch(err) {}
        this.setState({loading : false});
        Router.reload();
    }

    render () {
        const {Row, Cell} = Table;
        const {id, item, price} = this.props;
        const stringPrice = JSON.stringify(price*item.qty);
        const total = web3.utils.fromWei(stringPrice, 'ether');
        

        return (
            <Row disabled = {item.complete || item.declined} positive = {item.approved} negative = {item.declined}>
                <Cell>{id}</Cell>
                <Cell>{item.qty}</Cell>
                <Cell>{total}</Cell>
                <Cell>
                    {!item.approved && !item.declined ? (
                        <Button color = "grey" basic disabled>
                            Pending
                        </Button>
                    ) : 
                    (
                        item.approved ? (
                            <Button color = "green" basic disabled>
                                Approved
                            </Button>
                        ) : 
                        (
                            <Button color = "red" basic disabled>
                                Declined
                            </Button>
                        )
                    )
                    }
                </Cell>
                <Cell>
                    {!item.approved ? (
                        <Button color = "red" basic disabled >
                            Complete
                        </Button>
                    ) : (
                        !item.complete ? (
                            <Button color = "green" basic onClick = {this.onClick} loading = {this.state.loading}>
                                Complete
                            </Button>
                        ) : (
                            <Button color = "green" basic disabled>
                                Completed
                            </Button>
                        )
                    )
                }
                </Cell>
            </Row>
        )
    }
}

export default RequestOrderRow;