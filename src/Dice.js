import { Component } from "react";
import "./Dice.css";

class Dice extends Component {

    handleClick = () => {
        this.props.lock(this.props.indx);
    };

    render() {
        const { val } = this.props;
        return <i className={`Dice fas fa-dice-${val}`} onClick={this.handleClick}></i>
    };

};

export default Dice;