import inquirer from 'inquirer';
import chalk from 'chalk';
import { HMACGenerator } from './HMACGenerator.js';
import Rules from './Rules.js';
import { Table } from './Table.js';

export class Game {
    constructor(moves) {
        this.moves = moves;
        this.numOfMoves = moves.length;
        this.pcMove = null;
        this.playerMove = null;
        this.isReady = false;
    }

    checkGameParameters() {
        this.isReady =
            this.checkMinNumMoves() &&
            this.checkIsOdd() &&
            this.checkIsUnique();
    }

    startGame() {
        this.pcMove = this.generatePCMove();
        this.hmac = new HMACGenerator(this.pcMove);
        this.displayMenu();
    }

    generatePCMove() {
        return this.moves[Math.floor(Math.random() * this.numOfMoves)];
    }

    checkMinNumMoves() {
        if (this.numOfMoves < 3) {
            this.displayError('three or more');
            return false;
        }
        return true;
    }

    checkIsOdd() {
        if (this.numOfMoves % 2 === 0) {
            this.displayError('odd');
            return false;
        }
        return true;
    }

    checkIsUnique() {
        const uniqueMoves = new Set(this.moves);
        if (this.numOfMoves !== uniqueMoves.size) {
            this.displayError('unique');
            return false;
        }
        return true;
    }

    displayError(errType) {
        let errLog = chalk.bgRed(
            'Sorry! Please enter three or more, odd and unique moves.'
        );

        errLog = errLog.replace(
            errType,
            chalk.underline(errType.toUpperCase())
        );

        const examples = chalk.yellowBright(
            '\nExamples:\n   I.   Rock Paper Scissors \n   II.  1 2 3 4 5 6 7'
        );

        console.log(errLog + examples);
    }

    async displayMenu() {
        console.log(
            `HMAC:\n${
                this.hmac.value
            }\nAvailable moves: ${this.determineAvailableMoves()}\n0 - exit\n? - help`
        );

        const userInput = await this.askPlayerMove();

        this.processUserInput(userInput);
    }

    determineAvailableMoves() {
        let availableMoves = '';
        this.moves.forEach(function (val, i) {
            availableMoves += `\n${i + 1} - ${val}`;
        });
        return availableMoves;
    }

    async askPlayerMove() {
        const answers = await inquirer.prompt({
            name: 'player_move',
            type: 'input',
            message: 'Enter your move:',
        });

        return answers.player_move;
    }

    async askToContinue() {
        const answers = await inquirer.prompt({
            name: 'continue',
            type: 'list',
            message: chalk.bold.yellowBright('\n\nContinue playing?'),
            choices: ['Yes', 'No'],
        });

        return answers.continue;
    }

    async processUserInput(userInput) {
        let choices = [...new Array(this.numOfMoves + 1).keys(), '?'].map(
            String
        );

        switch (true) {
            case !choices.includes(userInput):
                console.clear();
                this.displayMenu();
                break;
            case userInput === '0':
                process.exit();
                break;
            case userInput === '?':
                console.clear();
                new Table(this.moves).displayHelpTable();
                const answer = await this.askToContinue();
                if (answer === 'Yes') {
                    console.clear();
                    this.displayMenu();
                } else {
                    process.exit();
                }
                break;
            default:
                this.playerMove = this.moves[parseInt(userInput) - 1];
                this.displayGameResult();
        }
    }

    displayGameResult() {
        const outcome = new Rules(this.moves).determineOutcome(
            this.pcMove,
            this.playerMove
        );

        const mappingOutcomeToMessage = {
            Win: 'You win!',
            Draw: "It's a draw :)",
            Lose: 'You lose :(',
        };

        console.log(
            `Your move: ${this.playerMove}\nComputer move: ${this.pcMove}\n${
                mappingOutcomeToMessage[outcome]
            }\nHMAC key:\n${this.hmac.getKey()}`
        );
    }
}
