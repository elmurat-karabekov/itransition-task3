import chalk from 'chalk';
import AsciiTable from 'ascii-table';
import Rules from './Rules.js';

export class Table {
    constructor(moves) {
        this.title = "Outcomes of the game from User's POV";
        this.xY = 'v PC\\User >';

        this.table = new AsciiTable(this.title);
        this.moves = moves;
        this.rules = new Rules(this.moves);
    }

    displayHelpTable() {
        this.table.setHeading(this.xY, ...this.moves);

        this.moves.forEach((pcMove) => {
            let row = [pcMove];
            this.moves.forEach((playerMove) => {
                row.push(this.rules.determineOutcome(pcMove, playerMove));
            });

            this.table.addRow(row);
            this.table.addRow(' ');
        });

        this.table.setJustify();

        const tableFormatted = this.formatTable(this.table.toString());

        console.log(tableFormatted);
    }

    formatTable(table) {
        table = table.replace(this.title, chalk.bold.green(this.title));

        return table;
    }
}
