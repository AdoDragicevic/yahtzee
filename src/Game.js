import { Component } from "react";
import "./Game.css";
import Dice from "./Dice";
import Rule from "./Rule";
import rules from "./rules";

class Game extends Component {

    static defaultProps = { nOfDices: 5 };

    state = {
        dices: Array(this.props.nOfDices).fill(1),
        locked: Array(this.props.nOfDices).fill(false),
        rotation: Array(this.props.nOfDices).fill(0),
        rollsRemaining: 3,
        isRolling: false,
        rules: [...rules]
    };

    componentDidMount() {
        this.roll();
    };

    roll = () => {
        const { dices, locked, rotation, rollsRemaining } = this.state;
        const dcs = dices.map( (d, i) => locked[i] ? d : Math.floor(Math.random() * dices.length + 1));
        const rot = rotation.map( (r, i) => locked[i] ? r : Math.random() * (Math.random() < .5 ? - 10 : 10));
        this.setState({ dices: dcs, rotation: rot, isRolling: true, rollsRemaining: rollsRemaining - 1 });
        setTimeout( () => this.setState({ isRolling: false }), 500 );
    };

    lock = indx => {
        const locked = [ ...this.state.locked ];
        locked[indx] = !locked[indx];
        this.setState({ locked });
    };

    getBtnTxt = () => {
        const { isRolling, rollsRemaining } = this.state;
        if (isRolling && rollsRemaining >= 2) return "Starting round...";
        if (isRolling) return "Rolling...";
        const msg = ["0 Rolls Remaining", "1 Roll Remaining", "2 Rolls Remaining"];
        return msg[rollsRemaining];
    };

    updateScore = rule => {
        const rules = [ ...this.state.rules ];
        const curr = rules.find( r => r.name === rule.name);
        curr.score = curr.calc(this.state.dices);
        const locked = this.state.locked.map( el => el = false);
        this.setState({ rules, locked, rollsRemaining: 3 }, this.roll);
    };

    renderRules = (start = 0, end = rules.length) => {
        const ruleList = [];
        for(let i = start; i < end; i++) {
            const disabled = rules[i].score !== null;
            ruleList.push(
                <Rule 
                    rule={rules[i]} 
                    key={i}
                    isDisabled={disabled}
                    updateScore={this.updateScore} 
                /> 
            );
        };
        return ruleList;
    };

    sumScores() {
        return this.state.rules.reduce( (acc, curr) => acc += (curr.score ? curr.score : 0), 0);
    };

    render() {
        const { dices, isRolling, rollsRemaining, locked, rotation } = this.state;
        return (
            <div className="Game">
                <header className="Game__header">
                    <h1 className="Game__title"> Yahtzee! </h1>
                    <div className="Game__dices">
                        {dices.map( (d,i) => (
                            <Dice 
                                key={i}
                                indx={i} 
                                val={d}
                                isLocked={locked[i] ? true : false}
                                isRolling={isRolling}
                                rotation={`${rotation[i]}deg`}
                                lock={this.lock}
                            />
                        ))}
                    </div>
                    <button 
                        className="Game__btn"
                        disabled={isRolling || rollsRemaining < 1}
                        onClick={this.roll}
                    >
                        {this.getBtnTxt()}
                    </button>
                </header>
                <main className="Game__scores">
                    <article className="Game__scores-box">
                        <h2 className="Game__scores-header">Upper</h2>
                        <ul className="Game__scores-list">
                            {this.renderRules(0, 6)}
                        </ul>
                    </article>
                    <article className="Game__scores-box">
                        <h2 className="Game__scores-header">Lower</h2>
                        <ul className="Game__scores-list">
                            {this.renderRules(6)}
                        </ul>
                    </article>
                    <article className="Game__scores-box">
                        <h2 className="Game__scores-header">Total: {this.sumScores()}</h2>
                    </article>
                </main>
            </div>
        )
    }
};

export default Game;