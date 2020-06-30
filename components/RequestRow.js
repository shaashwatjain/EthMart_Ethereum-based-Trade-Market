import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Item from '../ethereum/item';
import Router from 'next/router';

class RenderRow extends Component {

    state = {
        loading : false
    };

    onDecline = async () => {
        this.setState({loading : true});
        try {    const accounts = await web3.eth.getAccounts();
                const account = accounts[0];

                const item = Item(this.props.address);
                await item.methods.declinedOrder(this.props.id).send({
                    from : account
            });}
        catch(err) {}
        this.setState({loading : false});
        Router.reload();
    }

    onApprove = async () => {
        this.setState({loading : true});
    try {    const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            const item = Item(this.props.address);
            await item.methods.approveOrder(this.props.id).send({
                from : account
            });
        }
        catch (err) {}
        this.setState({loading : false});
        Router.reload();
    }

    render () {
        const {Row, Cell} = Table;
        const {id, order} = this.props;
        const stringPrice = JSON.stringify(order.value*order.qty);
        const total = web3.utils.fromWei(stringPrice, 'ether');
        

        return (
            <Row disabled = {order.complete} positive = {order.approved} negative = {order.declined}>
                <Cell>{id}</Cell>
                <Cell>{order.orderer}</Cell>
                <Cell>{order.qty}</Cell>
                <Cell>{total}</Cell>
                <Cell>
                    {order.approved || order.declined ? null : (
                        <Button color = "green" basic onClick = {this.onApprove} loading = {this.state.loading}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {order.declined || order.approved ? null : (
                        <Button color = "red" basic onClick = {this.onDecline} loading = {this.state.loading}>
                            Decline
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {!order.complete ? (
                        <Button color = "red" basic disabled>
                            Not completed
                        </Button>
                    ) : (
                        <Button color = "green" basic disabled>
                            Completed
                        </Button>
                    )
                }
                </Cell>
            </Row>
        )
    }
}

export default RenderRow;