// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { parseClientArguments } from "../../src";
import { parseConnectionString } from "../../src";
import { assertPropertyNames } from "./utils/credentialUtils";

const mockCredential = new AzureKeyCredential("secret");
const host = "https://contoso.communicationservices.azure.com";
const connectionString =
  "endpoint=https://contoso.communicationservices.azure.com:443/;accesskey=secret";

describe("ClientArguments", function () {
  it("accepts valid host URL", function () {
    const { url, credential } = parseClientArguments(host, mockCredential);
    assert.equal(url, host);
    assert.equal(credential, mockCredential);
  });

  it("throws if invalid host URL", function () {
    assert.throws(() => {
      parseClientArguments("file://banana/fofana.txt", mockCredential);
    }, "Invalid endpoint");
  });

  it("handles valid connection string", function () {
    const { url, credential } = parseClientArguments(connectionString);
    assert.equal(url, "https://contoso.communicationservices.azure.com:443/");
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
