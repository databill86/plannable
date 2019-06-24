/**
 * the graph model and algorithm used primarily for schedule rendering
 * @author Hanzhi Zhou
 * @module algorithm
 */

/**
 * The vertex of the graph.
 * It holds many attributes that are modified **in-place** when running a graph algorithm
 */
export class Vertex<T> {
    public visited: boolean = false;
    /**
     * depth of the node relative to the root
     */
    public depth: number = 0;
    /**
     * the maximum depth of the path starting from the root that the current node is on
     */
    public pathDepth: number = 0;
    /**
     * the parent of this vertex in the depth first tree
     */
    public parent?: Vertex<T>;
    /**
     * the all of the paths starting at the root and ending at one of the leaves.
     * if this vertex is not the root, then `path` will be empty
     */
    public readonly path: Vertex<T>[][] = [];
    /**
     * @param val the value contained in this node
     */
    constructor(public readonly val: T) {}

    // the following code is for debug purposes only
    // /**
    //  * represent this node without creating cyclic reference
    //  */
    // data() {
    //     const data: any = {
    //         visited: this.visited,
    //         val: this.val,
    //         path: this.path.map(x => x.map(y => y.val)),
    //         depth: this.depth,
    //         pathDepth: this.pathDepth
    //     };
    //     if (this.parent) {
    //         data.parent = this.parent.val;
    //     }
    //     return data;
    // }
}

/**
 * adjacency list representation of a graph
 */
export type Graph<T> = Map<Vertex<T>, Vertex<T>[]>;

export function getConnectedComponents(adjList: Int16Array[]) {
    const len = adjList.length;
    let visited = new Int8Array(len);
    let visitedCopy = visited.slice();
    const components: Int16Array[][] = [];
    for (let i = 0; i < len; i++) {
        if (!visited[i]) {
            DFS(i, visitedCopy, adjList);

            const component: number[] = [];
            for (let j = 0; j < len; j++) {
                if (visitedCopy[j] && !visited[j]) {
                    component.push(j);
                }
            }
            components.push(
                adjList.map((list, n) =>
                    component.includes(n)
                        ? list.filter(j => component.includes(j))
                        : new Int16Array()
                )
            );
            visited = visitedCopy;
            visitedCopy = visitedCopy.slice();
        }
    }
    return components;
}

function DFS(start: number, visited: Int8Array, adjList: Int16Array[]) {
    const stack = [start];
    while (stack.length) {
        start = stack.pop()!;
        if (!visited[start]) {
            visited[start] = 1;
        }

        const neighbors = adjList[start];
        for (const n of neighbors) {
            if (!visited[n]) stack.push(n);
        }
    }
}
