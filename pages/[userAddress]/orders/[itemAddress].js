import React, {Component} from 'react';
import Layout from '../../../components/layout';
import Item from '../../../ethereum/item';
import {Table, Header} from 'semantic-ui-react';
import RequestOrderRow from '../../../components/RequestOrderRow';

class Status extends Component {
    static async getInitialProps(props) {
        const cAddress = props.query.itemAddress;
        const uAddress = props.query.userAddress;
        const item = await Item(cAddress);
        const seller = await item.methods.seller().call();
        const price = await item.methods.price().call();
        const orderIndex = await item.methods.orderRetrival(uAddress).call();
        var items = [];
        var inc = 0;
        for (var index of orderIndex)
        {
            const detail = await item.methods.orders(index).call();
            items[inc] = {
                qty : detail[0],
                value : detail[1],
                orderer : detail[2],
                complete : detail[3],
                approved : detail[4],
                declined : detail[5],
                id : index
            }
            inc++;
        }
        const length = items.length;
        return {cAddress, seller, items, length, price, inc};
    }

    renderRows() {
        return this.props.items.map((item,index) => {
            return <RequestOrderRow 
                key={index}
                id = {index}
                item={item}
                contract = {this.props.cAddress}
                address={this.props.seller}
                length = {this.props.length}
                price = {this.props.price}
            />;
        });
    }

    render () {
        const { Row, HeaderCell, Body} = Table;
        return (
            <Layout>
                <h2>Statusboard</h2>
                <h4>This item is sold by : {this.props.seller}</h4>
                <Table>
                    <Table.Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Quantity</HeaderCell>
                            <HeaderCell>Total Amount</HeaderCell>
                            <HeaderCell>Approval Status</HeaderCell>
                            <HeaderCell>Completion Status</HeaderCell>
                        </Row>
                    </Table.Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <Header as="h3" textAlign="center">
                    You have {this.props.inc} number of orders for the item!
                </Header>
            </Layout>
        )
    }
}

export default Status;