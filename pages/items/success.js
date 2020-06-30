import React, {Component} from 'react';
import Layout from '../../components/layout';
import {Step, Header, Icon} from 'semantic-ui-react';

class Success extends Component {
    render() {
    return (
        <Layout>
            <Step.Group ordered align = "center" attached = "top"  widths = {3}>
                <Step completed>
                    <Step.Content>
                        <Step.Title>Order Placed</Step.Title>
                        <Step.Description>Order will start processing once approved</Step.Description>
                    </Step.Content>
                </Step>

                <Step active>
                    <Step.Content>
                        <Step.Title>Order Approval</Step.Title>
                        <Step.Description>Order starts processing once approved</Step.Description>
                    </Step.Content>
                </Step>

                <Step>
                    <Step.Content>
                        <Step.Title>Order Complete</Step.Title>
                        <Step.Description>Order is complete</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>
            <Header as='h1' icon style={{marginTop : '50px', marginBottom : '50px'}} textAlign = "center">
                <Icon name="paper plane" />
                Order Placed
                <Header.Subheader>
                    You can see your order status in the All Orders Section above
                </Header.Subheader>
                <Header.Subheader>
                    If your order is rejected then your transaction will be reverted
                </Header.Subheader>
            </Header>
            <hr />
        </Layout>
    );
    }
}

export default Success;