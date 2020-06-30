import React, {Component} from 'react';
import NavBar from './Header'; 
import {Segment, Container} from 'semantic-ui-react';
import Head from 'next/head';
import Footer from './Footer';

export default props => {
    return (
        <Segment
        raised
        vertical>
            <Head>
                <title>EthMart</title>
                <link rel="icon" href="http://www.userlogos.org/files/ethereum1.png" type="image/icon type" />
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            </Head>
        <NavBar />
        <Container
        style = {{minHeight: '75vh'}}>
        <div style = {{marginTop: '40px', marginBottom: '40px'}}>
            {props.children}
        </div>
        </Container>
            <Footer />
        </Segment>
    );
};