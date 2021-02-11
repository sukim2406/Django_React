import React, { Component } from 'react'

export default class PersonalInfo extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="personalInfo">
                    <div className="personalInfo__header">
                        <h1>Hello {this.props.accountInfo.username}</h1>
                    </div>
                    <div className="personalInfo__content">

                    </div>
            </div>
        )
    }
}
