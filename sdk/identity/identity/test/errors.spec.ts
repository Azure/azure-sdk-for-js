// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { AggregateAuthenticationError } from "../src";

describe("AggregateAuthenticationError", function() {
  it("produces a message containing details of the errors it contains", async () => {
    const aggregateError = new AggregateAuthenticationError([
      new Error("Boom."),
      new Error("Boom again.")
    ]);

    assert.strictEqual(aggregateError.message, "\n\nError: Boom.,Error: Boom again.");
  });
});
