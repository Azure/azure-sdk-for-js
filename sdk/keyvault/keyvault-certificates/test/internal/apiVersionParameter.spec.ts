// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { createSandbox } from "sinon";
import { CertificateClient } from "../../src";
import { ServiceClient } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "@azure/test-utils-recorder";
import { testPollerProperties } from "../utils/recorderUtils";

describe("The Certificates client should set the apiVersion", () => {
  const keyVaultUrl = `https://keyVaultName.vault.azure.net`;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert"
  };

  it("it should default to the latest API version", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(ServiceClient.prototype, "sendRequest");

    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );
    const client = new CertificateClient(keyVaultUrl, credential);
    try {
      const poller = await client.beginCreateCertificate(
        "certificateName",
        basicCertificatePolicy,
        testPollerProperties
      );
      await poller.pollUntilDone();
    } catch {}

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      "https://keyVaultName.vault.azure.net/certificates/certificateName/create?api-version=7.1-preview"
    );

    sandbox.restore();
  });

  it("it should allow us to specify an API version", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(ServiceClient.prototype, "sendRequest");

    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );
    const client = new CertificateClient(keyVaultUrl, credential, {
      apiVersion: "7.0"
    });

    try {
      const poller = await client.beginCreateCertificate(
        "certificateName",
        basicCertificatePolicy,
        testPollerProperties
      );
      await poller.pollUntilDone();
    } catch {}

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      "https://keyVaultName.vault.azure.net/certificates/certificateName/create?api-version=7.0"
    );

    sandbox.restore();
  });
});
