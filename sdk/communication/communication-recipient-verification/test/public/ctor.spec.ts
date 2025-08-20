// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";
import { createMockToken } from "./utils/recordedClient.js";
import { describe, it, assert } from "vitest";

describe("RecipientVerificationClient - constructor", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", () => {
    const client = new RecipientVerificationClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, RecipientVerificationClient);
  });

  it("throws with invalid connection string", () => {
    assert.throws(() => {
      new RecipientVerificationClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", () => {
    const client = new RecipientVerificationClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, RecipientVerificationClient);
  });

  it("successfully instantiates with with endpoint and managed identity", () => {
    const client = new RecipientVerificationClient(endpoint, createMockToken());
    assert.instanceOf(client, RecipientVerificationClient);
  });
});
