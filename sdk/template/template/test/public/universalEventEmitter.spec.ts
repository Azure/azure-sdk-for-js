// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createEventEmitter, URLBuilder } from "../../src";
import EventEmitter from "events";
import { assert } from "chai";

describe("Hello function - node", () => {
  it("should create an event emitter", () => {
    const result = createEventEmitter();
    assert(result instanceof EventEmitter);
  });

  it("should create a digest", () => {
    assert(URLBuilder instanceof Object);
  });
});
