// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { parseConnectionString } from "../../src";
import { assertPropertyNames } from "./utils/credentialUtils";

const CONNECTION_STRING =
  "endpoint=https://contoso.communicationservices.azure.com:443/;accesskey=secret";

describe("ConnectionString", function () {
  it("handles valid connection string", function () {
    const { endpoint, credential } = parseConnectionString(CONNECTION_STRING);
    assert.equal(endpoint, "https://contoso.communicationservices.azure.com:443/");
    /* Instead of 'instanceOf' check (as the AzureKeyCredential object might be referenced from different package version), 
       we are manually checking if object has same properties (includes both fields (objects) and functions) 
       as AzureKeyCredential object. */
    assertPropertyNames(AzureKeyCredential.prototype, Object.getPrototypeOf(credential));
  });

  it("throws if invalid connection string", function () {
    assert.throws(() => {
      parseConnectionString("Lorem ipsum dolor connection string");
    }, "Invalid connection string");
  });
});
