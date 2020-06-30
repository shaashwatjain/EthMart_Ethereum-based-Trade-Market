import React, {Component} from 'react';
import Layout from '../../../../components/layout';
import Item from '../../../../ethereum/item';
import {Table} from 'semantic-ui-react';
import RequestRow from '../../../../components/RequestRow';

class Approvals extends Component {
    static async getInitialProps(props) {
        const cAddress = props.query.contractAddress;
        const item = Item(cAddress);
        const orderCount = await item.methods.orderCount().call();

        const orders = await Promise.all(
            Array(parseInt(orderCount))
                .fill()
                .map((element, index) => {
                    return item.methods.orders(index).call();
                })
        );

        return {cAddress, orders, orderCount};
    }

    renderRow() {
        return this.props.orders.map((order,index) => {
            return <RequestRow 
                key = {index}
                id = {index}
                order = {order}
                address = {this.props.cAddress}
            />
        })
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;
        return (
            <Layout>
                <h2> Here are your approvals</h2>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Buyer</HeaderCell>
                            <HeaderCell>Quantity</HeaderCell>
                            <HeaderCell>Total Amount (ether)</HeaderCell>
                            <HeaderCell>Approval</HeaderCell>
                            <HeaderCell>Decline</HeaderCell>
                            <HeaderCell>Order Status</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
            </Layout>
        );
    }
}

export default Approvals;