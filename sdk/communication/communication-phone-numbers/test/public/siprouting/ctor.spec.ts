// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { Context } from "mocha";
import { SipRoutingClient } from "../../../src";
import { createMockToken } from "./utils/recordedClient";

describe("SipRoutingClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "accessKey";

  it("successfully instantiates with valid connection string", function () {
    const client = new SipRoutingClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, SipRoutingClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new SipRoutingClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new SipRoutingClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, SipRoutingClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new SipRoutingClient(endpoint, createMockToken());
    assert.instanceOf(client, SipRoutingClient);
  });
});
