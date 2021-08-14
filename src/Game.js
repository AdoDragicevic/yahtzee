import { Component } from "react";
import "./Game.css";
import Dice from "./Dice";
import Rule from "./Rule";

class Game extends Component {

    state = {
        dices: Array(this.props.nOfDices).fill(1),
        locked: Array(this.props.nOfDices).fill(false),
        rotation: Array(this.props.nOfDices).fill(0),
        rollsRemaining: 3,
        isRolling: false,
        rules: this.props.rules.map( r => ({...r})),
        score: 0,
        bestScore: window.localStorage.getItem("bestScore") || "0"
    };

    componentDidMount() {
        this.roll();
    };

    roll = () => {
        const { dices, locked, rotation, rollsRemaining } = this.state;
        const dcs = dices.map( (d, i) => locked[i] ? d : this.getRandDiceNum());
        const rot = rotation.map( (rotation, i) => locked[i] ? rotation : this.getRandRotation());
        this.setState({ dices: dcs, rotation: rot, isRolling: true, rollsRemaining: rollsRemaining - 1 });
        setTimeout( () => this.setState({ isRolling: false }), 500 );
    };

    getRandRotation() {
        return Math.random() * (Math.random() < .5 ? - 10 : 10);
    };

    getRandDiceNum() {
        return Math.floor(Math.random() * 6) +1;
    };

    lock = indx => {
        const locked = [ ...this.state.locked ];
        locked[indx] = !locked[indx];
        this.setState({ locked });
    };

    getBtnTxt = () => {
        const { isRolling, rollsRemaining, rules } = this.state;
        if (this.isGameOver(rules)) return "Game over";
        if (isRolling && rollsRemaining >= 2) return "Starting round...";
        if (isRolling) return "Rolling...";
        const msg = ["0 Rolls Remaining", "1 Roll Remaining", "2 Rolls Remaining"];
        return msg[rollsRemaining];
    };

    updateScore = rule => {
        const rules = this.state.rules.map( r => ({...r}));
        const curr = rules.find( r => r.name === rule.name);
        curr.score = curr.calc(this.state.dices);
        const locked = this.state.locked.map( el => el = false);
        const score = this.sumScores(rules);
        this.setState({ rules, locked, rollsRemaining: 3, score }, this.roll);
    };

    renderRules = (start = 0, end = this.state.rules.length) => {
        const ruleList = [];
        for(let i = start; i < end; i++) {
            const disabled = this.state.rules[i].score !== null;
            ruleList.push(
                <Rule 
                    rule={this.state.rules[i]} 
                    key={i}
                    isDisabled={disabled}
                    updateScore={this.updateScore} 
                /> 
            );
        };
        return ruleList;
    };

    sumScores(rules) {
        return rules.reduce( (acc, curr) => acc += (curr.score ? curr.score : 0), 0);
    };

    reset = () => {
        const { score, bestScore } = this.state;
        const newBestScore = this.getBestScore(score, bestScore);
        this.setState({
            dices: Array(this.props.nOfDices).fill(1),
            locked: Array(this.props.nOfDices).fill(false),
            rotation: Array(this.props.nOfDices).fill(0),
            rollsRemaining: 3,
            isRolling: false,
            rules: this.props.rules.map( r => ({...r})),
            score: 0,
            bestScore: newBestScore
        }, this.roll);
    };

    getBestScore(score, bestScore) {
        if (score > bestScore) {
            window.localStorage.setItem("bestScore", score);
            return score;
        }
        return bestScore;
    };

    isGameOver(rules) {
        for (let r of rules) {
            if (r.score === null) return false;
        }
        return true;
    };

    render() {
        const { dices, isRolling, rollsRemaining, locked, rotation, rules, score, bestScore } = this.state;
        const isGameOver = this.isGameOver(rules);
        return (
            <div className="Game">
                <p className="Game__best-score">Best score: {bestScore}</p>
                <button 
                    className={`Game__reset-btn ${isGameOver && "Game__reset-btn--active"}`}
                    onClick={this.reset}
                >
                    Reset
                </button>
                <header className="Game__header">
                    <h1 className="Game__title"> Yahtzee! </h1>
                    <div className="Game__dices">
                        {dices.map( (d,i) => (
                            <Dice 
                                key={i}
                                indx={i} 
                                val={d}
                                isLocked={(locked[i] || isGameOver) ? true : false}
                                isRolling={isRolling}
                                rotation={`${rotation[i]}deg`}
                                lock={!isGameOver ? this.lock : null}
                            />
                        ))}
                    </div>
                    <button 
                        className="Game__btn"
                        disabled={isGameOver || isRolling || rollsRemaining < 1}
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
                        <h2 className="Game__scores-header">Total: {score}</h2>
                    </article>
                </main>
            </div>
        )
    }
};

export default Game;