import React, { Component } from 'react'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

export default class CreateOrder extends Component {
    defaultQuantity = 1;

    constructor(props){
        super(props);
        this.state = {
            quantity: this.defaultQuantity,
            ticker: "aapl",
            order_type: "market",
            limit_price: 0,
            stop_price: 0,
            trail_price: 0,
            trail_percent: 0,
            time_in_force: "day",
        };
        
        this.handlePlaceButtonClicked = this.handlePlaceButtonClicked.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleTickerChange = this.handleTickerChange.bind(this);
        this.handleLimitPriceChange = this.handleLimitPriceChange.bind(this);
        this.handleStopPriceChange = this.handleStopPriceChange.bind(this);
        this.handleTrailPriceChange = this.handleTrailPriceChange.bind(this);
        this.handleTrailPercentChange = this.handleTrailPercentChange.bind(this);
        this.handleTimeInForceChange = this.handleTimeInForceChange.bind(this);
    }

    handleLimitPriceChange(e){
        this.setState({limit_price: parseFloat(e.target.value).toFixed(2)})
    }

    handleStopPriceChange(e){
        this.setState({stop_price: parseFloat(e.target.value).toFixed(2)})
    }

    handleTrailPriceChange(e){
        this.setState({trail_price: parseFloat(e.target.value).toFixed(2)})
    }

    handleTrailPercentChange(e){
        this.setState({trail_percent: parseFloat(e.target.value).toFixed(2)})
    }

    handleQuantityChange(e) {
        this.setState({
            quantity: e.target.value,
        });
    }

    handleTickerChange(e){
        this.setState({
            ticker: e.target.value,
        });
    }

    handleTypeChange(e){
        this.setState({
            order_type: e.target.value,
        });
    }

    handleTimeInForceChange(e){
        this.setState({
            time_in_force: e.target.value,
        })
    }

    handlePlaceButtonClicked() {
        console.log(this.state)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                quantity: this.state.quantity,
                ticker: this.state.ticker,
                order_type: this.state.order_type,
                limit_price: this.state.limit_price,
                stop_price: this.state.stop_price,
                trail_price: this.state.trail_price,
                trail_percent: this.state.trail_percent,
                time_in_force: this.state.time_in_force,
            })
        };
        fetch('/api/create-order', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    render() {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Place An Order
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField 
                                required={true}
                                defaultValue="AAPL"
                                inputProps= {{ style:{textAlign: "center"}}}
                                onChange={this.handleTickerChange}
                            />
                            <FormHelperText>
                                <div align="center">
                                    ticker goes here
                                </div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <FormHelperText>
                                <div align="center">
                                    Test
                                </div>
                            </FormHelperText>
                            <RadioGroup row defaultValue="market" onChange={this.handleTypeChange}>
                                <FormControlLabel 
                                    value="market" 
                                    control={<Radio color="primary"/>} 
                                    label="Market"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="limit" 
                                    control={<Radio color="secondary"/>} 
                                    label="Limit"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="stop" 
                                    control={<Radio color="secondary"/>} 
                                    label="Stop"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="stop_limit" 
                                    control={<Radio color="secondary"/>} 
                                    label="Stop Limit"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="trailing_stop" 
                                    control={<Radio color="secondary"/>} 
                                    label="Trailing Stop"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        {this.state.order_type === "limit" ? 
                            <FormControl>
                                <TextField 
                                    required={true}
                                    type="number"
                                    defaultValue={this.defaultQuantity}
                                    inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                    onChange = {this.handleLimitPriceChange}
                                />
                                <FormHelperText>
                                    <div align="center">
                                        Limit Price
                                    </div>
                                </FormHelperText>
                            </FormControl>
                        : this.state.order_type === "stop" ? 
                            <FormControl>
                                <TextField 
                                    required={true}
                                    type="number"
                                    defaultValue={this.defaultQuantity}
                                    inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                    onChange = {this.handleStopPriceChange}
                                />
                                <FormHelperText>
                                    <div align="center">
                                        Stop Price
                                    </div>
                                </FormHelperText>
                            </FormControl>
                        : this.state.order_type === "stop_limit" ? 
                            <div>
                                <FormControl>
                                    <TextField 
                                        required={true}
                                        type="number"
                                        defaultValue={this.defaultQuantity}
                                        inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                        onChange = {this.handleStopPriceChange}
                                    />
                                    <FormHelperText>
                                        <div align="center">
                                            Stop Price
                                        </div>
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField 
                                        required={true}
                                        type="number"
                                        defaultValue={this.defaultQuantity}
                                        inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                        onChange = {this.handleLimitPriceChange}
                                    />
                                    <FormHelperText>
                                        <div align="center">
                                            Limit Price
                                        </div>
                                    </FormHelperText>
                                </FormControl>
                            </div>
                        : this.state.order_type === "trailing_stop" ? 
                            <div>
                                <FormControl>
                                    <TextField 
                                        required={true}
                                        type="number"
                                        defaultValue={this.defaultQuantity}
                                        inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                        onChange = {this.handleTrailPriceChange}
                                    />
                                    <FormHelperText>
                                        <div align="center">
                                            Trailing Price
                                        </div>
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField 
                                        required={true}
                                        type="number"
                                        defaultValue={this.defaultQuantity}
                                        inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                        onChange = {this.handleTrailPercentChange}
                                    />
                                    <FormHelperText>
                                        <div align="center">
                                            Trailing Percent
                                        </div>
                                    </FormHelperText>
                                </FormControl>
                            </div>
                        :""}
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField 
                                required={true}
                                type="number"
                                defaultValue={this.defaultQuantity}
                                inputProps= {{ min: 1, style:{textAlign: "center"}}}
                                onChange={this.handleQuantityChange}
                            />
                            <FormHelperText>
                                <div align="center">
                                    asldfkjasldkfj
                                </div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <FormHelperText>
                                <div align="center">
                                    Time In Force
                                </div>
                            </FormHelperText>
                            <RadioGroup row defaultValue="day" onChange={this.handleTimeInForceChange}>
                                <FormControlLabel 
                                    value="day" 
                                    control={<Radio color="primary"/>} 
                                    label="Day"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="gtc" 
                                    control={<Radio color="secondary"/>} 
                                    label="GTC"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="opg" 
                                    control={<Radio color="secondary"/>} 
                                    label="OPG"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="cls" 
                                    control={<Radio color="secondary"/>} 
                                    label="CLS"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="ioc" 
                                    control={<Radio color="secondary"/>} 
                                    label="IOC"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value="fok" 
                                    control={<Radio color="secondary"/>} 
                                    label="FOK"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="primary" variant="contained" onClick={this.handlePlaceButtonClicked}>Place an order</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" to="/" component={Link}>Cancel</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
