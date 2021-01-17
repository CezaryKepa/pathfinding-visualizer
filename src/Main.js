import {Graph, sleep} from "./Graph";
import {SIZE_X, SIZE_Y} from "./Constants"

export class Main {
    constructor() {
        this.graph = new Graph(SIZE_X * SIZE_Y);
        this.table = document.querySelector('table');
        this.board = [];
        this.setUpGrid();
        this.setUpGraph();
    }
    setUpGrid() {
        for (let i = 0; i < SIZE_Y; i++) {
            this.board[i] = new Array(SIZE_X);
            const row = document.createElement('tr');
            for (let j = 0; j < SIZE_X; j++) {
                this.board[i][j] = i + ' ' + j;
                this.graph.addVertex(i + ' ' + j);
                const cell = document.createElement('td');
                cell.id = i + ' ' + j;
                row.append(cell);
            }
            this.table.append(row);
        }
    }
    //TODO: REFACTOR
    setUpGraph() {
        for (let i = 0; i < SIZE_Y; i++) {
            for (let j = 0; j < SIZE_X; j++) {
                if (this.board[i][j - 1]) {
                    this.graph.addEdge(i + ' ' + j, i + ' ' + (j - 1)); //W
                }
                if (this.board[i - 1]) {
                    if (this.board[i - 1][j - 1]) {
                        this.graph.addEdge(i + ' ' + j, (i - 1) + ' ' + (j - 1)) //NW
                    }
                    if (this.board[i - 1][j]) {
                        this.graph.addEdge(i + ' ' + j, (i - 1) + ' ' + j) //N
                    }
                    if (this.board[i - 1][j + 1]) {
                        this.graph.addEdge(i + ' ' + j, (i - 1) + ' ' + (j + 1)) //NE
                    }
                }
                if (this.board[i][j + 1]) {
                    this.graph.addEdge(i + ' ' + j, i + ' ' + (j + 1)); //E
                }
                if (this.board[i + 1]) {
                    if (this.board[i + 1][j + 1]) {
                        this.graph.addEdge(i + ' ' + j, (i + 1) + ' ' + (j + 1)) //SE
                    }
                    if (this.board[i + 1][j]) {
                        this.graph.addEdge(i + ' ' + j, (i + 1) + ' ' + j) //S
                    }
                    if (this.board[i + 1][j - 1]) {
                        this.graph.addEdge(i + ' ' + j, (i + 1) + ' ' + (j - 1)) //SW
                    }
                }
            }
        }
    }
    async runDFS() {
        const path = await this.graph.DFS(0 + ' ' + 0, 25 + ' ' + 26);
        for (const e of path) {
            const elementById = document.getElementById(e);
            elementById.style.background = '#26BE26';
            await sleep(1);
        }
    }

}
