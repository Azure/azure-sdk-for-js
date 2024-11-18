// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AggregateAuthenticationError } from "../../src/index.js";
import { describe, it, assert } from "vitest";

describe("AggregateAuthenticationError", function () {
  it("produces a message containing details of the errors it contains", async () => {
    const aggregateError = new AggregateAuthenticationError([
      new Error("Boom."),
      new Error("Boom again."),
    ]);

    assert(aggregateError.message.includes("Error: Boom.\nError: Boom again."));
  });
});
