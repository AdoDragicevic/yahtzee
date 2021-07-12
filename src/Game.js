import { Component } from "react";
import "./Game.css";
import Dice from "./Dice";
import Rule from "./Rule";
import rules from "./rules";

class Game extends Component {

    static defaultProps = {
        diceNames: ["one", "two", "three", "four", "five", "six"],
        nOfDices: 5
    };

    state = {
        dices: [1, 2, 3, 4, 5],
        locked: Array(this.props.nOfDices).fill(false),
        rollsRemaining: 2,
        isRolling: false,
        rules: [...rules]
    };

    roll = () => {
        const { dices, locked } = this.state;
        const dcs = dices.map( (d, i) => locked[i] ? d : Math.floor(Math.random() * this.props.diceNames.length));
        this.setState(st => ({ dices: dcs, isRolling: true, rollsRemaining: --st.rollsRemaining }));
        setTimeout( () => this.setState({ isRolling: false }), 1000 );
    };

    lock = indx => {
        const lck = [ ...this.state.locked ];
        lck[indx] = !lck[indx];
        this.setState({ locked: lck });
    };

    getBtnTxt() {
        const msg = ["0 Rolls Remaining", "1 Roll Remaining", "2 Rolls Remaining"];
        return msg[this.state.rollsRemaining];
    };

    updateScore = (oldRule) => {
        const rls = [ ...this.state.rules ];
        const newRule = rls.find( r => r.name === oldRule.name );
        newRule.calc(this.state.dices);
        this.setState({ rules: rls });
    };

    renderRules = (start, end = rules.length) => {
        const ruleList = [];
        for(let i = start-1; i < end; i++) {
            ruleList.push( 
                <Rule rule={rules[i]} key={i} updateScore={this.updateScore} /> 
            );
        };
        return ruleList;
    };

    sumScores() {
        let sum = 0;
        for(let rule of rules) {
            const score = rule.score || 0;
            sum += score;
        } 
        return sum;
    };

    render() {
        return (
            <div className="Game">
                <header className="Game-header">
                    <h1 className="Game-title"> Yahtzee! </h1>
                    <div className="Game-dices">
                        {this.state.dices.map( (d,i) => (
                            <Dice 
                                key={i} 
                                indx={i} 
                                val={d} 
                                name={this.props.diceNames[d]} 
                                lock={this.lock} 
                            />
                        ))}
                    </div>
                    <button 
                        className="Game-btn"
                        disabled={this.state.isRolling || this.state.rollsRemaining < 1}
                        onClick={this.roll}
                    >
                        {this.state.isRolling ? "Rolling..." : this.getBtnTxt()}
                    </button>
                </header>
                <main className="Game-scores">
                    <article className="Game-scores-box">
                        <h2 className="Game-socres-header">Upper</h2>
                        <ul className="Game-scores-list">
                            {this.renderRules(1, 6)}
                        </ul>
                    </article>
                    <article className="Game-scores-box">
                        <h2 className="Game-scores-header">Lower</h2>
                        <ul className="Game-scores-list">
                            {this.renderRules(7)}
                        </ul>
                    </article>
                    <article className="Game-scores-box">
                        <h2>Total: {this.sumScores()}</h2>
                    </article>
                </main>
            </div>
        )
    }
};

export default Game;