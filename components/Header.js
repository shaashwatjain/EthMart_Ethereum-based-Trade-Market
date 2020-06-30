import React, {Component, createRef} from 'react';
import {Menu, Header, Segment, Button, Icon, Container, Rail, Sticky} from 'semantic-ui-react';
import Router from 'next/router';
import Link from 'next/link';
import web3 from '../ethereum/web3';

class NavBar extends Component {

    onClick = async () => {
        try
        {
            console.log('Using'+window.web3.currentProvider);
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];
            Router.push('/[userAddress]/orders/approvals',`/${userAddress}/orders/approvals`);
        }
        catch (err)
        {
            Router.push('/error');
        }
    }
    onClick2 = async () => {
    try
        {
            console.log('Using'+window.web3.currentProvider);
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];
            Router.push('/[userAddress]/orders/show', `/${userAddress}/orders/show`);
        }
    catch (err)
        {
            Router.push('/error');
        }
    }

    contextref = createRef();

    render() {
        return (
            <Segment
            basic
            vertical
            style = {{left: '0', width: '100%', overflow: 'hidden'}}
        >
                <Header as='h2' align='center' vertical = 'true' textAlign = "center" style = {{padding: '1em 0em'}}>
                    <Link href='/'>
                        <a className="item" style= {{color:"black"}}>
                            EthMart
                        </a>
                            </Link>
                </Header>
            <Sticky>
            <Segment   
                inverted
            >             
                <Menu inverted borderless>
                    <Container>
                    <Link href='/'>
                    <Menu.Item style={{ marginLeft: '1ex' }}>
                        Home
                    </Menu.Item>
                    </Link>
                    <Menu.Menu position="right">
                        <Menu.Item>
                        <Link href='/items/new' >
                        <Button animated inverted style={{ marginLeft: '2ex' }}>
                            <Button.Content visible>
                                Sell
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="plus"/>
                            </Button.Content>
                        </Button>
                        </Link>
                        <Button inverted onClick = {this.onClick2} style={{ marginLeft: '2ex' }}>
                            View Orders
                        </Button>
                            <Button inverted onClick = {this.onClick} style={{ marginLeft: '2ex' }}>
                                View Approvals
                            </Button>
                            </Menu.Item>
                        
                    </Menu.Menu>
                    </Container>
                </Menu>
            </Segment>
            </Sticky>
            </Segment>
        );
    }
}

export default NavBar;