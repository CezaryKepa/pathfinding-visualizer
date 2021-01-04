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

}
