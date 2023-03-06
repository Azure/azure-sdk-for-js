// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { VerifiedRecipientsClient } from "../../src";
import { assert } from "chai";
import { createMockToken } from "./utils/recordedClient";

describe("VerifiedRecipientsClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new VerifiedRecipientsClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, VerifiedRecipientsClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new VerifiedRecipientsClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new VerifiedRecipientsClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, VerifiedRecipientsClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new VerifiedRecipientsClient(endpoint, createMockToken());
    assert.instanceOf(client, VerifiedRecipientsClient);
  });
});
