import { Component } from "react";
import "./Rule.css";

class Rule extends Component {

    handleClick = () => {
        this.props.updateScore(this.props.rule);
    };

    render() {
        const { name, score, description } = this.props.rule;
        return  (
            <li className="Rule" onClick={this.handleClick}>
                <span className="Rule-name"> {name} </span>
                <span className="Rule-info"> {score === null ? description : score} </span>
            </li>
        )
    }
};

export default Rule;