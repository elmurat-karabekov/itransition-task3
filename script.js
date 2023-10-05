#!/usr/bin/env node
import inquirer from 'inquirer';

const moves = process.argv.slice(2);

switch (true) {
    case !hasMinNumMoves(moves):
        displayError('Please enter THREE OR MORE odd number of moves.');
        break;
    case !hasOddNumMoves(moves):
        displayError('Please enter three or more ODD number of moves.');
        break;
    case !hasUniqueMoves(moves):
        displayError('All moves must be UNIQUE.');
        break;
    default:
        console.log('default');
}

function hasMinNumMoves(moves) {
    return moves.length >= 3;
}

function hasOddNumMoves(moves) {
    return moves.length % 2 == 1;
}

function hasUniqueMoves(moves) {
    const uniqueMoves = new Set(moves);
    return moves.length === uniqueMoves.size;
}

function displayError(message) {
    console.log('\x1b[41m%s\x1b[0m', `Sorry! ${message}`);
    console.log(
        '\x1b[33m%s\x1b[0m',
        'Examples:\n   I.   Rock Paper Scissors \n   II.  1 2 3 4 5 6 7'
    );
}
