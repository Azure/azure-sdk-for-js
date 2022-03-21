// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class DependencyGraph {
  edges: { [key: string]: string[] };
  nodes: string[];

  constructor() {
    this.edges = {};
    this.nodes = [];
  }

  addNode(name: string): void {
    this.nodes.push(name);
  }

  addDirectedEdge(start: string, end: string): void {
    if (start in this.edges) {
      this.edges[start].push(end);
    } else {
      this.edges[start] = [end];
    }
  }

  _topologicalSortHelper(node: string, explored: Set<string>, s: Array<string>): void {
    explored.add(node);
    if (this.edges[node] !== undefined) {
      this.edges[node].forEach((n: string) => {
        if (!explored.has(n)) {
          this._topologicalSortHelper(n, explored, s);
        }
      });
    }

    // finished exploring dependencies
    s.push(node);
  }

  topologicalSort(): Array<string> {
    const sortedArray: string[] = [];
    const explored = new Set<string>();

    this.nodes.forEach((node) => {
      if (!explored.has(node)) {
        this._topologicalSortHelper(node, explored, sortedArray);
      }
    });
    return sortedArray;
  }
}
