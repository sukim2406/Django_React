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

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            api_key: "",
            secret_key: "",
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
        this.handleSecretKeyChange = this.handleSecretKeyChange.bind(this);
        this.handleRegisterButtonClicked = this.handleRegisterButtonClicked.bind(this);
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }
    
    handleUsernameChange(e){
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    handleApiKeyChange(e){
        this.setState({
            api_key: e.target.value
        })
    }

    handleSecretKeyChange(e){
        this.setState({
            secret_key: e.target.value
        })
    }

    handleRegisterButtonClicked(){
        console.log(this.state);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                api_key: this.state.api_key,
                secret_key: this.state.secret_key,
            })
        };
        fetch('/api/create-account', requestOptions)
        .then((response) => response.json())
        .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div>
                <p>This will be register page</p>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Register
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                                required = {true}
                                label = "Email"
                                inputProps = {{ style:{textAlign: "center"}}}
                                onChange = {this.handleEmailChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                                required = {true}
                                label = "Username"
                                inputProps = {{ style:{textAlign: "center"}}}
                                onChange = {this.handleUsernameChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                                required = {true}
                                type = "password"
                                label = "Password"
                                inputProps = {{ style:{textAlign: "center"}}}
                                onChange = {this.handlePasswordChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                                required = {true}
                                label = "API Key"
                                inputProps = {{ style:{textAlign: "center"}}}
                                onChange = {this.handleApiKeyChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField
                                required = {true}
                                label = "SECRET Key"
                                inputProps = {{ style:{textAlign: "center"}}}
                                onChange = {this.handleSecretKeyChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="primary" variant="contained" onClick={this.handleRegisterButtonClicked}>Register</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" to="/" component={Link}>Cancel</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
