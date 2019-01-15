import React, { Component } from "react";
import axios from "axios";

export default class OrgApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitApp = event => {
        event.preventDefault();
        const { org_id, user_id } = this.props;
        const arr = Object.entries(this.state);
        const newArr = arr.map(array => array.join(" "));
        const string = newArr.join("/0");
        axios
            .post("/api/application", { org_id, user_id, string })
            .then(() => this.props.hideApp())
            .catch(err => console.log(err));
    };

    render() {
        const app = this.props.application.split("/0");
        const inputs = app.map(inputField => {
            return (
                <>
                    <span>{inputField}</span>
                    <input
                        name={inputField}
                        onChange={this.handleInputChange}
                    />
                </>
            );
        });
        return (
            <div>
                <form onSubmit={this.submitApp}>
                    {inputs}
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={() => this.props.hideApp()}>X</button>
            </div>
        );
    }
}
