import { Component } from "react";
import "./Rule.css";

class Rule extends Component {

    handleClick = () => {
        const { name, calc } = this.props.rule;
        this.props.updateScore(name, calc);
    };

    render() {
        const { name, score, descirpiton } = this.props.rule;
        return  (
            <li className="Rule" onClick={this.handleClick}>
                <span className="Rule-name"> {name} </span>
                <span className="Rule-info"> {score === null ? descirpiton : score} </span>
            </li>
        )
    }
};

export default Rule;