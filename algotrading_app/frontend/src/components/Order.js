import React, { Component } from 'react'

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manual_order: true,
            quantity: 0,
            ticker: "aapl",
            order_type: "market",
            limit_price: 0,
            stop_price: 0,
            trail_price: 0,
            trail_percent: 0,
            time_in_force: "day",
        };
        this.order_id = this.props.match.params.order_id;
        this.getOrderDetails();
    }

    getOrderDetails(){
        fetch('/api/get-order' + '?order_id=' + this.order_id).then((response) => 
            response.json()
        ).then((data) => {
            this.setState({
                manual_order: data.manual_order,
                quantity: data.quantity,
                ticker: data.ticker,
                order_type: data.order_type,
                limit_price: data.limit_price,
                stop_price: data.stop_price,
                trail_price: data.trail_price,
                trail_percent: data.trail_percent,
                time_in_force: data.time_in_force,
            });
        });
    }

    render() {
        return (
            <div>
                <h3>{this.order_id}</h3>
                <p>Was Manual: {this.state.manual_order.toString()}</p>
                <p>Ticker: {this.state.ticker}</p>
                <p>Order Type: {this.state.order_type}</p>
                <p>Time in Force: {this.state.time_in_force}</p>
                <p>Quantity: {this.state.quantity}</p>
                <p>Limit Price: {this.state.limit_price}</p>
                <p>Stop Price: {this.state.stop_price}</p>
                <p>Trail Price: {this.state.trail_price}</p>
                <p>Trail Percent: {this.state.trail_percent}</p>
            </div>
        )
    }
}
