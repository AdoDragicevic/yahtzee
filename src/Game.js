import { Component } from "react";
import "./Game.css";
import { getRandEl } from "./helper";
import Dice from "./Dice";
import Rule from "./Rule";
import rules from "./rules";

class Game extends Component {

    static defaultProps = {
        diceNames: ["one", "two", "three", "four", "five", "six"],
        numOfDices: 5
    };

    state = {
        dices: this.props.diceNames.slice(0, this.props.numOfDices),
        locked: Array(this.props.numOfDices).fill(false),
        rollsRemaining: 2,
        isRolling: false,
        rules: [ ...rules ]
    };

    reroll = () => {
        const { dices, locked } = this.state;
        const newDices = dices.map( (d, i) => locked[i] ? d : getRandEl(this.props.diceNames) );
        this.setState(st => ({ dices: newDices, rollsRemaining: --st.rollsRemaining, isRolling: true }));
        setTimeout(() => this.setState({ isRolling: false }) , 1000);
    };

    lock = indx => {
        const newLocked = [ ...this.state.locked ];
        newLocked[indx] = !newLocked[indx];
        this.setState({ locked: newLocked });
    };

    getBtnTxt() {
        const msg = ["0 Rolls Remaining", "1 Roll Remaining", "2 Rolls Remaining"];
        return msg[this.state.rollsRemaining];
    };

    updateScore = name => {
        const rls = [ ...this.state.rules ];
        const rule = rls.find( r => r.name === name );
        rule.calc(this.state.dices);
        this.setState({ rules: rls });
    };

    renderRules = (start, end = rules.length) => {
        const ruleList = [];
        for(let i = start-1; i < end; i++) {
            ruleList.push( <Rule rule={rules[i]} key={i} updateScore={this.updateScore} /> );
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
                        {this.state.dices.map( (d,i) => <Dice key={i} indx={i} val={d} lock={this.lock} />)}
                    </div>
                    <button 
                        className="Game-btn"
                        disabled={this.state.isRolling || this.state.rollsRemaining < 1}
                        onClick={this.reroll}
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