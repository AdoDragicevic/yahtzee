class Rule {

    constructor(name, description, calc, defaultVal = null) {
        this.name = name;
        this.description = description;
        this.defaultVal = defaultVal;
        this.calc = this[calc];
        this.score = null;
    };

    sumSame(vals) {
        return (vals.filter( v => v === this.defaultVal )).length * this.defaultVal; 
    };

    sumAll(vals) {
        return vals.reduce( (acc, curr) => acc += curr, 0 );
    };
    
    yahtzee(vals) {
        for (let v of vals) if (v !== vals[0]) return 0;
        return 50;
    };

    frequencyCounter = vals => {
        const f = {};
        vals.forEach( v => f[v] = (f[v] || 0) +1 );
        return f;
    };

    sumFrequency = (location, freq) => {
        for (let key in location) {
            if (location[key] === freq) return parseInt(key) * location[key];
        }
        return null;
    };

    threeOfKind(vals) {
        const f = this.frequencyCounter(vals);
        return this.sumFrequency(f, 3) || 0;
    };

    fourOfKind(vals) {
        const f = this.frequencyCounter(vals);
        return this.sumFrequency(f, 4) || 0;
    };

    fullHouse(vals) {
        const f = this.frequencyCounter(vals);
        const v = Object.values(f);
        return (v.length === 2 && v.includes(2) && v.includes(3)) ? 25 : 0;
    };

    smStraight(vals) {
        let v = new Set(vals);
        return v.size > 3 && (v.has(1,2,3,4) || v.has(2,3,4,5) || v.has(3,4,5,6)) ? 30 : 0;
    };

    lgStraight(vals) {
        const v = new Set(vals);
        return v.size === 5 ? 40 : 0;
    };

};

const rules = [
    new Rule("Ones", "1 point per 1", "sumSame", 1),
    new Rule("Twos", "2 poins per 2", "sumSame", 2),
    new Rule("Threes", "3 points per 3", "sumSame", 3),
    new Rule("Fours", "4 points per 4", "sumSame", 4),
    new Rule("Fives", "5 points per 5", "sumSame", 5),
    new Rule("Sixes", "6 points per 6", "sumSame", 6),
    new Rule("Three of Kind", "Sum 3 of a kind", "threeOfKind"),
    new Rule("Four of Kind", "Sum 4 of a kind", "fourOfKind"),
    new Rule("Full House", "25 points", "fullHouse"),
    new Rule("Small Straight", "30 points", "smStraight"),
    new Rule("Large Straight", "40 points", "lgStraight"),
    new Rule("Yahtzee", "50 points", "yahtzee"),
    new Rule("Chance", "Sum all dices", "sumAll")
];


export default rules;