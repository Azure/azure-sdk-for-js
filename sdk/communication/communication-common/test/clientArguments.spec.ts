// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { parseClientArguments } from "../src/credential/clientArguments";
import { parseConnectionString } from "../src/credential/connectionString";

const mockCredential = new AzureKeyCredential("secret");
const host = "https://contoso.communicationservices.azure.com";
const connectionString =
  "endpoint=https://contoso.communicationservices.azure.com:443/;accesskey=secret";

describe("ClientArguments", () => {
  it("accepts valid host URL", () => {
    const { url, credential } = parseClientArguments(host, mockCredential);
    assert.equal(url, host);
    assert.equal(credential, mockCredential);
  });

  it("throws if invalid host URL", () => {
    assert.throws(() => {
      parseClientArguments("file://banana/fofana.txt", mockCredential);
    }, "Invalid endpoint");
  });

  it("handles valid connection string", () => {
    const { url, credential } = parseClientArguments(connectionString);
    assert.equal(url, "https://contoso.communicationservices.azure.com:443/");
    assert.instanceOf(credential, AzureKeyCredential);
  });

  it("throws if invalid connection string", () => {
    assert.throws(() => {
      parseConnectionString("Lorem ipsum dolor connection string");
    }, "Invalid connection string");
  });
});
