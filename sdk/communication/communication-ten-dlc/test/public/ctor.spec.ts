// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { TenDlcClient } from "@azure-tools/communication-ten-dlc";
import { createMockToken } from "../utils/recordedClient.js";
import { describe, it, assert } from "vitest";

describe("TenDlcClient - constructor", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new TenDlcClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, TenDlcClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new TenDlcClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new TenDlcClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, TenDlcClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new TenDlcClient(endpoint, createMockToken());
    assert.instanceOf(client, TenDlcClient);
  });
});
