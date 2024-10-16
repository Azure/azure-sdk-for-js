// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { AlphaIdsClient } from "../../src";
import { assert } from "chai";
import { createMockToken } from "./utils/recordedClient";

describe("AlphaIdsClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new AlphaIdsClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, AlphaIdsClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new AlphaIdsClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new AlphaIdsClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, AlphaIdsClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new AlphaIdsClient(endpoint, createMockToken());
    assert.instanceOf(client, AlphaIdsClient);
  });
});
