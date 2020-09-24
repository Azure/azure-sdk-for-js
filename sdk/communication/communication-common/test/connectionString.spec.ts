// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { parseConnectionString } from "../src/credential/connectionString";

const CONNECTION_STRING =
  "endpoint=https://contoso.communicationservices.azure.com:443/;accesskey=secret";

describe("ConnectionString", () => {
  it("handles valid connection string", () => {
    const { endpoint, credential } = parseConnectionString(CONNECTION_STRING);
    assert.equal(endpoint, "https://contoso.communicationservices.azure.com:443/");
    assert.instanceOf(credential, AzureKeyCredential);
  });

  it("throws if invalid connection string", () => {
    assert.throws(() => {
      parseConnectionString("Lorem ipsum dolor connection string");
    }, "Invalid connection string");
  });
});
