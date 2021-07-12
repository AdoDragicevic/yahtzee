import { Component } from "react";
import "./Dice.css";

class Dice extends Component {

    handleClick = () => {
        this.props.lock(this.props.indx);
    };

    render() {
        const { name } = this.props;
        return <i className={`Dice fas fa-dice-${name}`} onClick={this.handleClick}></i>
    };

};

export default Dice;