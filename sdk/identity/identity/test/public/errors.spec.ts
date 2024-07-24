// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AggregateAuthenticationError, CredentialUnavailableError } from "../../src";

import { assert } from "chai";

describe("AggregateAuthenticationError", function () {
  it("produces a message containing details of the errors it contains", async () => {
    const aggregateError = new AggregateAuthenticationError([
      new Error("Boom."),
      new Error("Boom again."),
    ]);

    assert(aggregateError.message.includes("Error: Boom.\nError: Boom again."));
  });
});

describe.only("CredentialUnavailableError", function () {
  it("produces a message containing details of the errors it contains", async () => {
    const err = new CredentialUnavailableError("outer error", { cause: new Error("inner error") });
    throw err;
  });
});
