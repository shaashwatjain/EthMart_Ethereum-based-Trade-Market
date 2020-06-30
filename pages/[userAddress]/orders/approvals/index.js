import React, {Component} from 'react';
import web3 from '../../../../ethereum/web3';
import deployer from '../../../../ethereum/deployer';
import Item from '../../../../ethereum/item';
import Layout from '../../../../components/layout';
import _ from 'lodash';
import {Card, Search} from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' };

class Approvals extends Component {

    static async getInitialProps(props) {
        const contracts = await deployer.methods.getContracts(props.query.userAddress).call();
        let address;
        var details = [];
        for (address of contracts)
        {
            const contract = Item(address);
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

    retrieveItem = () => {

        var items = [];
        let inc = 0;
        while (inc < this.props.details.length)
        {
            var ethPrice = web3.utils.fromWei(this.props.details[inc].price,'ether');
            items[inc] = {
                href: `/${this.props.details[inc].seller}/orders/approvals/${this.props.details[inc].contractAddress}`,
                header: this.props.details[inc].name + ' : '+ this.props.details[inc].quantity + ' items available',
                description: this.props.details[inc].description,
                meta: ethPrice + ' ether'
            };
            inc++;
        }
        
        return (
            
                <Card.Group itemsPerRow = {1} items = {items} />
            
        );
    }


    state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        var source = [];
        let inc = 0;
        while (inc < this.props.details.length)
        {
            source[inc] = {
                href: `/${this.props.details[inc].seller}/orders/approvals/${this.props.details[inc].contractAddress}`,
                title: this.props.details[inc].name ,
                description: this.props.details[inc].description
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
                    fluid
                    loading = {isLoading}
                    onResultSelect = {this.handleResultSelect}
                    onSearchChange = {_.debounce(this.handleSearchChange, 500, {
                    leading : true,
                    })}
                    results={results}
                    value={value}
                    {...this.props}
                />
                <h2>Here are all your listed products!</h2>
                {this.retrieveItem()}
            </Layout>
        )
    }
}

export default Approvals;