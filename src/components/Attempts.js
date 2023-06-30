import { Component, useState } from "react"



export default class Attempts extends Component {

    constructor() {
        super();
        this.state = { attempts: 5 };
    }

    renderAttempts() {
        let str = "";
        for (let i = 0; i < this.state.attempts; i++) {
            str += " ■";
        }
        return str;
    }

    decrement() {
        this.setState({ attempts: this.state.attempts - 1 });
    }

    increment() {
        if (this.state.attempts >= 5) {
            return;
        }
        this.setState({ attempts: this.state.attempts + 1});
    }

    render() {
        return (
            <div>
                <p>Attempts: { this.renderAttempts() }</p>
            </div>
        )
    }
}