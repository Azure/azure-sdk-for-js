// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { StorageCRC64Calculator } from "../../src/StorageCRC64Calculator.js";

describe("StorageCRC64Calculator", () => {
  it("adds no process-wide error handlers when it initializes", async () => {
    const uncaughtExceptionListeners = process.listenerCount("uncaughtException");
    const unhandledRejectionListeners = process.listenerCount("unhandledRejection");

    await StorageCRC64Calculator.init();

    assert.equal(process.listenerCount("uncaughtException"), uncaughtExceptionListeners);
    assert.equal(process.listenerCount("unhandledRejection"), unhandledRejectionListeners);
  });
});
