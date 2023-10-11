export default class Rules {
    constructor(moves) {
        this.moves = moves;
    }

    determineOutcome(pcMove, playerMove) {
        const i = this.moves.indexOf(pcMove);
        const j = this.moves.indexOf(playerMove);

        return i - j === 0
            ? 'Draw'
            : this.constructor.mod(i - j, this.moves.length) <=
              Math.floor(this.moves.length / 2)
            ? 'Lose'
            : 'Win';
    }

    static mod(n, m) {
        return ((n % m) + m) % m;
    }
}
