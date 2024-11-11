// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import type { Context } from "mocha";
import { TieringClient } from "../../src/index.js";
import { assert } from "chai";
import { createMockToken } from "./utils/recordedClient.js";

describe("RecipientVerificationClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new TieringClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, TieringClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new TieringClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new TieringClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, TieringClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (ctx) {
    const client = new TieringClient(endpoint, createMockToken());
    assert.instanceOf(client, TieringClient);
  });
});
