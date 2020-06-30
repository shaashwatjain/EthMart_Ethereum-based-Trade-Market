import React, {Component} from 'react';
import deployer from '../../../ethereum/deployer';
import Item from '../../../ethereum/item';
import Layout from '../../../components/layout';
import {Card, Search} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import _ from 'lodash';

const initialState = { isLoading: false, results: [], value: '' };

class Show extends Component {

    static async getInitialProps(props) {
        const address = props.query.userAddress;
        const allContracts = await deployer.methods.getDeployedItems().call();
        var items = [];
        for (var cAddress of allContracts)
        {
            const item = await Item(cAddress);
            const existence = await item.methods.existence(address).call();
            const details = await item.methods.retrieveItem().call();
            const ethPrice = web3.utils.fromWei(details[2]);
            if(existence)
            {
                items.push({
                    href: `/${address}/orders/${cAddress}`,
                    header: details[0],
                    description: details[1],
                    meta: ethPrice + ' ether'
                });
            }
        }
        return {items};
    }

    renderCards () {
        const {items} = this.props;
        return <Card.Group itemsPerRow = {1} items = {items} />;
    }

    
    state = initialState;

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        var source = [];
        let inc = 0;
        while (inc < this.props.items.length)
        {
            source[inc] = {
                href: this.props.items[inc].href,
                title: this.props.items[inc].header ,
                description: this.props.items[inc].description
            };
            inc++;
        }

    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Layout>
                <Search
                    size = "large"
                    loading = {isLoading}
                    onResultSelect = {this.handleResultSelect}
                    onSearchChange = {_.debounce(this.handleSearchChange, 500, {
                    leading : true,
                    })}
                    results={results}
                    value={value}
                    {...this.props}
                />
                <h3>Here are your Orders!</h3>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default Show;