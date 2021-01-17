export class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
    addVertex(v) {
        this.AdjList.set(v, []);
    }
    addEdge(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v);
    }
    printGraph()
    {
        // get all the vertices
        const get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (const i of get_keys)
        {
            // great the corresponding adjacency list
            // for the vertex
            const get_values = this.AdjList.get(i);
            let conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (const j of get_values)
                conc += j + " | ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    async DFS(start, end) {
        let stack = [start]
        let path = []
        const visited = {};

        while (stack.length) {
            let current = stack.pop()
            visited[current] = true;
            const elementById = document.getElementById(current);
            elementById.style.background = '#757C81';
            await sleep(1);
            if(current === end) {
                return path;
            }
            path.push(current)
            const neighbours = this.AdjList.get(current);
            if (this.AdjList.get(current).length > 0) {
                for (const index in neighbours) {
                    const element = neighbours[index];
                    if (!visited[element])
                        stack.push(element);
                }
            }
        }

        return path.reverse()
    }

    async BFS(start, end) {
        let queue = [start]
        let path = []
        const visited = {};

        while (queue.length) {
            let current = queue.shift();
            const elementById = document.getElementById(current);
            elementById.style.background = '#757C81';
            await sleep(1);
            if(current === end) {
                return path;
            }
            path.push(current)
            const neighbours = this.AdjList.get(current);
            if (this.AdjList.get(current).length > 0) {
                for (const index in neighbours) {
                    const element = neighbours[index];
                    if (!visited[element]) {
                        visited[element] = true;
                        queue.push(element);
                    }
                }
            }
        }

        return path;
    }

}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
