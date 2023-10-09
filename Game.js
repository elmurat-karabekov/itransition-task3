import inquirer from 'inquirer';
import chalk from 'chalk';
import { HMACGenerator } from './HMACGenerator.js';

export class Game {
    constructor(moves) {
        this.moves = moves;
        this.numOfMoves = moves.length;
    }

    checkGameParameters() {
        switch (true) {
            case !this.hasMinNumMoves(this.moves):
                this.displayError(
                    'Please enter THREE OR MORE odd number of moves.'
                );
                break;
            case !this.hasOddNumMoves(this.moves):
                this.displayError(
                    'Please enter three or more ODD number of moves.'
                );
                break;
            case !this.hasUniqueMoves(this.moves):
                this.displayError('All moves must be UNIQUE.');
                break;
            default:
                this.startGame();
        }
    }

    async startGame() {
        const pcMove = this.generatePCMove();
        const hmac = new HMACGenerator(pcMove);
        await this.displayMenu(hmac.value, this.moves);
    }

    generatePCMove() {
        return this.moves[Math.floor(Math.random() * this.numOfMoves)];
    }

    hasMinNumMoves(moves) {
        return this.numOfMoves >= 3;
    }

    hasOddNumMoves(moves) {
        return this.numOfMoves % 2 == 1;
    }

    hasUniqueMoves(moves) {
        const uniqueMoves = new Set(moves);
        return this.numOfMoves === uniqueMoves.size;
    }

    displayError(message) {
        console.log('\x1b[41m%s\x1b[0m', `Sorry! ${message}`);
        console.log(
            '\x1b[33m%s\x1b[0m',
            'Examples:\n   I.   Rock Paper Scissors \n   II.  1 2 3 4 5 6 7'
        );
    }

    async displayMenu(hmac, moves) {
        console.log(`HMAC: 
${hmac}
Available moves: ${(function () {
            let availableMoves = '';
            moves.forEach(function (val, i) {
                availableMoves += `\n${i + 1} - ${val}`;
            });
            return availableMoves;
        })()}
0 - exit
? - help`);
        await this.askPlayerMove();
    }

    async askPlayerMove() {
        const answers = await inquirer.prompt({
            name: 'player_move',
            type: 'input',
            message: 'Enter your move:',
        });

        this.playerMove = answers.player_move;
        let choices = [...new Array(this.moves.length + 1).keys(), '?'].map(
            String
        );
        if (!choices.includes(this.playerMove)) {
            console.clear();
            await this.displayMenu(this.moves, hmac);
        } else if (this.playerMove === '0') {
            process.exit();
        } else {
            console.log('You Win!!!');
        }
    }
}
