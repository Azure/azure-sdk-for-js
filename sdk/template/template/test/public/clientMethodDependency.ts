// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientMethodDependency } from "../../src";

// another node built-in that has to be shimmed for the browser
import { assert } from "chai";

describe("Tests for the ClientMethodDependency class", function() {
  it("The ClientMethodDependency should initialize and set its history property properly", function() {
    const client = new ClientMethodDependency();
    assert.deepEqual(client.history, ["constructor"]);
  });

  it("The ClientMethodDependency's A method should alter the client's history", function() {
    const client = new ClientMethodDependency();
    client.A();
    assert.deepEqual(client.history, ["constructor", "A"]);
  });

  it("The ClientMethodDependency's AB method should throw if it's called before A", function() {
    const client = new ClientMethodDependency();
    assert.throws(client.AB);
  });

  it("The ClientMethodDependency's AB method should alter the client's history after A is called", function() {
    const client = new ClientMethodDependency();
    client.A();
    assert.deepEqual(client.history, ["constructor", "A"]);
    client.AB();
    assert.deepEqual(client.history, ["constructor", "A", "AB"]);
  });
});
