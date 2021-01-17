export class Graph {
    constructor(noOfVertices) {
        this.adjList = new Map();
    }

    addVertex(v) {
        this.adjList.set(v, []);
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    printGraph() {
        // get all the vertices
        const get_keys = this.adjList.keys();

        // iterate over the vertices
        for (const i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            const get_values = this.adjList.get(i);
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
            if (current === end) {
                return path;
            }
            path.push(current)
            const neighbours = this.adjList.get(current);
            if (this.adjList.get(current).length > 0) {
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
            if (current === end) {
                return path;
            }
            path.push(current)
            const neighbours = this.adjList.get(current);
            if (this.adjList.get(current).length > 0) {
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

    dijkstra(start, end) {
        // Init helper variables that we will need for Dijkstra algorithm.
        const distances = {};
        const visitedVertices = {};
        const previousVertices = {};
        const queue = new PriorityQueue();

        // Init all distances with infinity assuming that currently we can't reach
        // any of the vertices except the start one.
        this.adjList().forEach((vertex) => {
            distances[vertex.getKey()] = Infinity;
            previousVertices[vertex.getKey()] = null;
        });

        // We are already at the startVertex so the distance to it is zero.
        distances[start.getKey()] = 0;

        // Init vertices queue.
        queue.add(start, distances[start.getKey()]);

        // Iterate over the priority queue of vertices until it is empty.
        while (!queue.isEmpty()) {
            // Fetch next closest vertex.
            const currentVertex = queue.poll();

            // Iterate over every unvisited neighbor of the current vertex.
            const neighbors = this.adjList.get(currentVertex);
            neighbors.forEach((neighbor) => {
                // Don't visit already visited vertices.
                if (!visitedVertices[neighbor.getKey()]) {
                    // Update distances to every neighbor from current vertex.
                    // const edge = graph.findEdge(currentVertex, neighbor);

                    const existingDistanceToNeighbor = distances[neighbor.getKey()];
                    // const distanceToNeighborFromCurrent = distances[currentVertex.getKey()] + edge.weight;
                    const distanceToNeighborFromCurrent = distances[currentVertex.getKey()] + 1;

                    // If we've found shorter path to the neighbor - update it.
                    if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
                        distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

                        // Change priority of the neighbor in a queue since it might have became closer.
                        if (queue.hasValue(neighbor)) {
                            queue.changePriority(neighbor, distances[neighbor.getKey()]);
                        }

                        // Remember previous closest vertex.
                        previousVertices[neighbor.getKey()] = currentVertex;
                    }

                    // Add neighbor to the queue for further visiting.
                    if (!queue.hasValue(neighbor)) {
                        queue.add(neighbor, distances[neighbor.getKey()]);
                    }
                }
            });

            // Add current vertex to visited ones to avoid visiting it again later.
            visitedVertices[currentVertex.getKey()] = currentVertex;
        }


    }
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
