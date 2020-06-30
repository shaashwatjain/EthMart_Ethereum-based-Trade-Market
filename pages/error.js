import React from 'react';
import Layout from '../components/layout';
import {Header, Container} from 'semantic-ui-react';

export default () => {
    return (
        <Layout>
            <Container>
            <Header as="h2" textAlign="center">
                You seem to have no access to an Ethereum Wallet.
            </Header>
            <Header as="h4" textAlign="center">
                Please install <a href="https://metamask.io/">metamask</a> in chrome or an alternative and set it up to Rinkeby Test Network.
            </Header>
            </Container>
        </Layout>
    )
};