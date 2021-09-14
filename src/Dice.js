import { Component } from "react";
import "./Dice.css";

class Dice extends Component {

    handleClick = () => {
        this.props.lock(this.props.indx);
    };

    render() {
        const { val, isLocked, isRolling, rotation } = this.props;
        const classes = `Dice ${isLocked && "Dice--locked"} ${isRolling && !isLocked && "rotate"}`;
        return (
            <div 
                className={classes}
                style={{ transform: `rotate(${rotation})`}} 
                onClick={this.props.lock ? this.handleClick : null}
            >
                <span className="Dot top left" hidden={val !== 2 && val !== 3 && val !== 4 && val !== 5 && val !== 6}></span>
                <span className="Dot top center" hidden={val !== 6}></span>
                <span className="Dot top right" hidden={val !== 4 && val !== 5 && val !== 6}></span>
                <span className="Dot middle left" hidden></span>
                <span className="Dot center-center" hidden={val !== 1 && val !== 3 && val !== 5}></span>
                <span className="Dot middle right" hidden></span>
                <span className="Dot bottom left" hidden={val !== 4 && val !== 5 && val !== 6}></span>
                <span className="Dot bottom center" hidden={val !== 6}></span>
                <span className="Dot bottom right" hidden={val !== 2 && val !== 3 && val !== 4 && val !== 5 && val !== 6}></span>
            </div>
        )
    };

};

export default Dice;