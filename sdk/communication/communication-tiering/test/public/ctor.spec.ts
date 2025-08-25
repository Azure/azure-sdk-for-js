// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { TieringClient } from "@azure-tools/communication-tiering";
import { createMockToken } from "./utils/recordedClient.js";
import { describe, it, assert } from "vitest";

describe("RecipientVerificationClient - constructor", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", () => {
    const client = new TieringClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, TieringClient);
  });

  it("throws with invalid connection string", () => {
    assert.throws(() => {
      new TieringClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", () => {
    const client = new TieringClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, TieringClient);
  });

  it("successfully instantiates with with endpoint and managed identity", () => {
    const client = new TieringClient(endpoint, createMockToken());
    assert.instanceOf(client, TieringClient);
  });
});
