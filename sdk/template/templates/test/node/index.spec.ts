// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as lib from "../../src/index";
import EventEmitter from "events";

// another node built-in that has to be shimmed for the browser
import assert from "assert";

describe("Hello function - node", () => {
  it("should create an event emitter", () => {
    const result = lib.createEventEmitter();
    assert(result instanceof EventEmitter);
  });

  it("should create a digest", () => {
    assert(lib.URLBuilder instanceof Object);
  });
});
