// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { createSandbox } from "sinon";
import { CertificateClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/certificatesModels";
import { HttpClient, WebResourceLike, HttpOperationResponse, HttpHeaders } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "@azure/test-utils-recorder";

describe("The Certificates client should set the apiVersion", () => {
  const keyVaultUrl = `https://keyVaultName.vault.azure.net`;
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: 200,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: {
          id: `${keyVaultUrl}/certificates/certificateName/id`,
          attributes: {}
        }
      };
    }
  };

  it("it should default to the latest API version", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(mockHttpClient, "sendRequest");

    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );
    const client = new CertificateClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient
    });
    await client.getCertificate("certificateName");

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      `https://keyVaultName.vault.azure.net/certificates/certificateName/?api-version=${LATEST_API_VERSION}`
    );

    sandbox.restore();
  });

  it("it should allow us to specify an API version", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(mockHttpClient, "sendRequest");

    const credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );
    const client = new CertificateClient(keyVaultUrl, credential, {
      apiVersion: "7.0",
      httpClient: mockHttpClient
    });
    await client.getCertificate("certificateName");

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      "https://keyVaultName.vault.azure.net/certificates/certificateName/?api-version=7.0"
    );

    sandbox.restore();
  });
});
