// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import type { Context } from "mocha";
import { PhoneNumbersClient } from "../../src/index.js";
import { createMockToken } from "./utils/recordedClient.js";

describe("PhoneNumbersClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new PhoneNumbersClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, PhoneNumbersClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new PhoneNumbersClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, PhoneNumbersClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (ctx) {
    const client = new PhoneNumbersClient(endpoint, createMockToken());
    assert.instanceOf(client, PhoneNumbersClient);
  });
});
