// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";
import { createMockToken } from "./utils/recordedClient.js";
import { describe, it, assert } from "vitest";

describe("ShortCodesClient - constructor", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", () => {
    const client = new ShortCodesClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, ShortCodesClient);
  });

  it("throws with invalid connection string", () => {
    assert.throws(() => {
      new ShortCodesClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", () => {
    const client = new ShortCodesClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, ShortCodesClient);
  });

  it("successfully instantiates with with endpoint and managed identity", () => {
    const client = new ShortCodesClient(endpoint, createMockToken());
    assert.instanceOf(client, ShortCodesClient);
  });
});
