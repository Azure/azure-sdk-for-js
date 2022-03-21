// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DependencyGraph } from "../../../src/codeGenerator";
import { expect } from "chai";

describe("DependencyGraph", function() {
  it("add nodes to graph", function() {
    const dg = new DependencyGraph();
    dg.addNode("A");
    dg.addNode("B");
    dg.addNode("C");
    dg.addNode("D");
    expect(dg.nodes).to.deep.equal(["A", "B", "C", "D"]);
  });

  it("add directional edges", function() {
    const dg = new DependencyGraph();
    dg.addNode("A");
    dg.addNode("B");
    dg.addDirectedEdge("A", "B");

    expect(dg.nodes).to.deep.equal(["A", "B"]);
    expect(dg.edges).to.deep.equal({ A: ["B"] });
  });

  it("sorts edges", function() {
    const dg = new DependencyGraph();
    dg.addNode("A");
    dg.addNode("B");
    dg.addNode("C");
    dg.addNode("D");
    dg.addDirectedEdge("A", "B");
    dg.addDirectedEdge("A", "C");
    dg.addDirectedEdge("C", "D");
    dg.addDirectedEdge("B", "C");

    const sortedNodes = dg.topologicalSort();
    const expectedOutput = ["D", "C", "B", "A"];
    expect(sortedNodes).to.deep.equal(expectedOutput);
  });
});
