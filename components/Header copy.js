import React, {Component} from 'react';
import {Menu, Header, Segment, Button, Icon, Container} from 'semantic-ui-react';
import Router from 'next/router';
import Link from 'next/link';
import web3 from '../ethereum/web3';

class NavBar extends Component {

    onClick = async () => {
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        Router.push('/[userAddress]/orders/approvals',`/${userAddress}/orders/approvals`);
    }
    onClick2 = async () => {
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        Router.push('/[userAddress]/orders/show', `/${userAddress}/orders/show`);
    }

    render() {
        return (
            <Segment
            inverted
            vertical
            style = {{top : '0', left: '0', width: '100%', margin: '0 !important', padding: '0 !important'}}
        >
            <Segment 
                inverted 
                textAlign = "center"
                style = {{padding: '1em 0em', marginTop : '0ex'}}
                vertical
            >
                <Header as='h2' align='center' vertical = 'true'>
                    <Link href='/'>
                        <a className="item" style= {{color:"white"}}>
                            EthMart
                        </a>
                            </Link>
                </Header>
                </Segment>
            <Segment
                inverted   
                style = {{padding: '1em 0em', marginTop : '0ex', position: 'sticky'}}
                vertical
            >             
                <Menu inverted borderless style = {{padding : '0px'}}>
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
            </Segment>
        );
    }
}

export default NavBar;