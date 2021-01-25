// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { ClientSecretCredential } from "@azure/identity";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src";

describe("PhoneNumbersClient Constructor", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";

  it("successfully instantiates with valid connection string", () => {
    const client = new PhoneNumbersClient(`endpoint=${endpoint};accesskey=${accessKey}`);
    assert.instanceOf(client, PhoneNumbersClient);
  });

  it("throws with invalid connection string", () => {
    assert.throws(() => {
      new PhoneNumbersClient(`endpoints=${endpoint};accesskey=${accessKey}`);
    });
  });

  it("successfully instantiates with with endpoint and access key", () => {
    const client = new PhoneNumbersClient(endpoint, new AzureKeyCredential(accessKey));
    assert.instanceOf(client, PhoneNumbersClient);
  });

  it("successfully instantiates with with endpoint and managed identity", () => {
    const client = new PhoneNumbersClient(
      endpoint,
      new ClientSecretCredential("<azure_tenant_id>", "<azure_client_id>", "<azure_client_secret>")
    );
    assert.instanceOf(client, PhoneNumbersClient);
  });
});
