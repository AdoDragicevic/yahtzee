class Rule {

    constructor(name, description, calc, defaultVal = null) {
        this.name = name;
        this.description = description;
        this.defaultVal = defaultVal;
        this.calc = this[calc];
        this.score = null;
    };

    sumSame(vals) {
        console.log(vals);
        this.score = (vals.filter(v => v === this.defaultVal)).length * this.defaultVal; 
    };

    sumAll(vals) {
        let sum = 0;
        for (let v of vals) sum += v;
        return sum;
    };
    
    yahtzee(vals) {
        const v = new Set(vals);
        return v.size > 1 ? 0 : 50;
    };

    threeOfKind(vals) {

    };

    fourOfKind(vals) {

    };

    fullHouse(vals) {

    };

    smStraight(vals) {

    };

    lgStraight(vals) {

    };

};

const rules = [
    new Rule("Ones", "1 point per 1", "sumSame", 1),
    new Rule("Twos", "2 poins per 2", "sumSame", 2),
    new Rule("Threes", "3 points per 3", "sumSame", 3),
    new Rule("Fours", "4 points per 4", "sumSame", 4),
    new Rule("Fives", "5 points per 5", "sumSame", 5),
    new Rule("Sixes", "6 points per 6", "sumSame", 6),
    new Rule("Three of Kind", "Sum all dice if 3 are same", "threeOfKind"),
    new Rule("Four of Kind", "Sum all dice if 4 are same", "fourOfKind"),
    new Rule("Full House", "25 points for a full house", "fullHouse"),
    new Rule("Small Straight", "30 points for a small straight", "smStraight"),
    new Rule("Large Straight", "40 points for a large straight", "lgStraight"),
    new Rule("Yahtzee", "50 points for Yahtzee", "yahtzee"),
    new Rule("Chance", "Sum all dice", "sumAll")
];


export default rules;