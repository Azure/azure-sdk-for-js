// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as lib from "../../src/index";
import EventEmitter from "events";

describe("Hello function -  browser", () => {
  it("should create an event emitter", () => {
    const result = lib.createEventEmitter();
    if (!(result instanceof EventEmitter)) {
      throw new Error("Error occurred while creating an event emitter");
    }
  });
});
