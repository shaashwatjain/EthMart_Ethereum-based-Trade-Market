import React, {Component} from 'react';
import {Segment, Container, Grid, Header} from 'semantic-ui-react';

class Footer extends Component {
    render() {
        return (
            <Segment inverted vertical style={{ padding: '4em 0em', bottom: '0', left: '0', width: '100%', position: 'absolute' }}>
            <Container>
              <Grid divided inverted stackable >
                <Grid.Row>
                    <Grid.Column width = {3} verticalAlign = "middle" textAlign = "right">
                        <Header as='h2' inverted>
                            EthMart
                        </Header>
                    </Grid.Column>
                  <Grid.Column width = {7}>
                    <Header as='h4' inverted>
                      Created for Ethereum Network
                    </Header>
                    <p>
                      by Shaashwat Jain
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        )
    }
}

export default Footer;