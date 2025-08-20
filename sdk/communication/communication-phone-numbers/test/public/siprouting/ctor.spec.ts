// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { SipRoutingClient } from "@azure/communication-phone-numbers";
import { createMockToken } from "./utils/recordedClient.js";
import { describe, it, assert } from "vitest";

describe("SipRoutingClient - constructor", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "accessKey";

  it("successfully instantiates with valid connection string", () => {
    const client = new SipRoutingClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, SipRoutingClient);
  });

  it("throws with invalid connection string", () => {
    assert.throws(() => {
      new SipRoutingClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", () => {
    const client = new SipRoutingClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, SipRoutingClient);
  });

  it("successfully instantiates with with endpoint and managed identity", () => {
    const client = new SipRoutingClient(endpoint, createMockToken());
    assert.instanceOf(client, SipRoutingClient);
  });
});
