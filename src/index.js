import {Graph} from "./Graph";

const table = document.querySelector('table');

function setUp() {
    const graph = new Graph(10*10);
    const board = [];
    for(let i = 0; i<10; i++) {
        board[i] = new Array(10);
        const row = document.createElement('tr');
        for(let j = 0; j<10; j++) {
            board[i][j] = i + ' ' + j;
            graph.addVertex(i+ ' ' +j);
            const cell = document.createElement('td');
            row.append(cell);
        }
        table.append(row);
    }
    for(let i = 0; i<10; i++) {
        for(let j = 0; j<10; j++) {
            if (board[i][j - 1]) {
                graph.addEdge(i + ' ' + j, i + ' ' + (j - 1)); //W
            }
            if (board[i - 1]) {
                if (board[i - 1][j - 1]) {
                    graph.addEdge(i + ' ' + j, (i - 1) + ' ' + (j - 1)) //NW
                }
                if (board[i - 1][j]) {
                    graph.addEdge(i + ' ' + j, (i - 1) + ' ' + j) //N
                }
                if (board[i - 1][j + 1]) {
                    graph.addEdge(i + ' ' + j, (i - 1) + ' ' + (j + 1)) //NE
                }
            }
            if (board[i][j + 1]) {
                graph.addEdge(i + ' ' + j, i + ' ' + (j + 1)); //E
            }
            if (board[i + 1]) {
                if (board[i + 1][j + 1]) {
                    graph.addEdge(i + ' ' + j, (i + 1) + ' ' + (j + 1)) //SE
                }
                if (board[i + 1][j]) {
                    graph.addEdge(i + ' ' + j, (i + 1) + ' ' + j) //S
                }
                if (board[i + 1][j-1]) {
                    graph.addEdge(i + ' ' + j, (i + 1) + ' ' + (j - 1)) //SW
                }
            }

        }
    }
    graph.printGraph()

}
setUp()
