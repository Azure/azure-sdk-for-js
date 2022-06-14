// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { assert } from "chai";
import { createMockToken } from "./utils/recordedClient";

describe("ShortCodesClient - constructor", function () {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", function () {
    const client = new ShortCodesClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, ShortCodesClient);
  });

  it("throws with invalid connection string", function () {
    assert.throws(() => {
      new ShortCodesClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", function () {
    const client = new ShortCodesClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, ShortCodesClient);
  });

  it("successfully instantiates with with endpoint and managed identity", function (this: Context) {
    const client = new ShortCodesClient(endpoint, createMockToken());
    assert.instanceOf(client, ShortCodesClient);
  });
});
