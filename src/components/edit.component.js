import React, {Component} from 'react';

import axios from 'axios';

class EditComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductDes = this.onChangeProductDes.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productName: '',
            productDes: '',
            productPrice: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    productName: response.data.productName,
                    productDes: response.data.productDes,
                    productPrice: response.data.productPrice
                });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeProductName(e) {
        this.setState( {
            productName: e.target.value
        });
    }

    onChangeProductDes(e) {
        this.setState( {
            productDes: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState( {
            productPrice: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            productName: this.state.productName,
            productDes: this.state.productDes,
            productPrice: this.state.productPrice
        };

        //post change to put
        axios.post('http://localhost:4000/products/update/'+ this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        // Redirect to Product List
        this.props.history.push('/list');
    }

    render() {
        return (
            <div>
                <p>welcome to edit component</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Product Name</label>
                        <input type="text" className="form-control" value={this.state.productName} onChange={this.onChangeProductName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Product Description</label>
                        <input type="text" className="form-control" value={this.state.productDes} onChange={this.onChangeProductDes}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Product Price</label>
                        <input type="text" className="form-control" value={this.state.productPrice} onChange={this.onChangeProductPrice}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditComponent;
