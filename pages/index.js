import React, {Component} from 'react';
import deployer from '../ethereum/deployer';
import item from '../ethereum/item';
import Layout from '../components/layout';
import { Card,Search } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import _ from 'lodash';

const initialState = { isLoading: false, results: [], value: '' };

class IndexPage extends Component {
    static async getInitialProps() {
        const items = await deployer.methods.getDeployedItems().call();
        let address;
        var details = [];
        let inc = 0;
        for (address of items)
        {
            const contract = item(address);
            const temp_details = await contract.methods.retrieveItem().call();
            details.push({
                contractAddress: address,
                name:temp_details[0],
                description:temp_details[1],
                price: temp_details[2],
                quantity: temp_details[3],
                seller:temp_details[4]
            });
        }

        return {details};
    }

    renderItems() {
        var items = [];
        let inc = 0;
        while (inc < this.props.details.length)
        {
            var ethPrice = web3.utils.fromWei(this.props.details[inc].price,'ether');
            const cAddress = this.props.details[inc].contractAddress;
            if (this.props.details[inc].quantity > '0')
            {    
                items.push({
                    href: `/items/${cAddress}`,
                    header: this.props.details[inc].name,
                    description: this.props.details[inc].description,
                    meta: ethPrice + ' ether'
                });
            }
            inc++;
        }
        return <Card.Group itemsPerRow = '2' items = {items} />;
    }

    state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        var source = [];
        let inc = 0;
        while (inc < this.props.details.length)
        {
            if (this.props.details[inc].quantity > '0')
            {
                source.push({
                    href: `/items/${this.props.details[inc].contractAddress}`,
                    title: this.props.details[inc].name ,
                    description: this.props.details[inc].description
                }
                );
            }
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
                <h3>Check out and buy listed products/services</h3>
                {this.renderItems()}
            </Layout>
        )
    }
}

export default IndexPage;