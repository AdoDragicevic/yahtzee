import { Component } from "react";
import "./Rule.css";

class Rule extends Component {

    handleClick = () => {
        if (this.props.isDisabled) return;
        this.props.updateScore(this.props.rule);
    };

    render() {
        const { name, score, description } = this.props.rule;
        const { isDisabled } = this.props;
        return  (
            <li className={`Rule ${isDisabled && "Rule--disabled"}`} onClick={this.handleClick}>
                <span className={`Rule__name ${score !== null && "Rule--crossed"}`}> {name} </span>
                <span className="Rule__info"> {score === null ? description : score} </span>
            </li>
        )
    }
};

export default Rule;