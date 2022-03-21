// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { Context } from "mocha";
import { OperatorConnectClient } from "../../src";
import { createMockToken } from "./utils/recordedClient";

describe("OperatorConnectClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new OperatorConnectClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, OperatorConnectClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new OperatorConnectClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new OperatorConnectClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, OperatorConnectClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new OperatorConnectClient(endpoint, createMockToken());
    assert.instanceOf(client, OperatorConnectClient);
  });
});
