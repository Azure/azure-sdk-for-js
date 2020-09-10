// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { createSandbox, SinonSandbox, SinonSpy } from "sinon";
import { KeyVaultAccessControlClient, KeyVaultBackupClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/constants";
import { HttpClient, WebResourceLike, HttpOperationResponse, HttpHeaders } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "@azure/test-utils-recorder";

// Adding this to the source would change the public API.
type ApIVersions = "7.2-preview";

describe("The keyvault-admin clients should set the serviceVersion", () => {
  const keyVaultUrl = `https://eastus2.keyvault_name.managedhsm-int.azure-int.net`;

  describe("KeyVaultAccessControlClient", () => {
    const mockHttpClient: HttpClient = {
      async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
        return {
          status: 200,
          headers: new HttpHeaders(),
          request: httpRequest,
          parsedBody: {
            id: `${keyVaultUrl}/providers/Microsoft.Authorization/roleDefinitions`,
            attributes: {}
          }
        };
      }
    };
  
    let sandbox: SinonSandbox;
    let spy: SinonSpy<[WebResourceLike], Promise<HttpOperationResponse>>;
    let credential: ClientSecretCredential;
  
    beforeEach(async () => {
      sandbox = createSandbox();
      spy = sandbox.spy(mockHttpClient, "sendRequest");
  
      credential = await new ClientSecretCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        env.AZURE_CLIENT_SECRET!
      );
    });
  
    afterEach(() => {
      sandbox.restore();
    });
  
    it("it should default to the latest API version", async function() {
      const client = new KeyVaultAccessControlClient(keyVaultUrl, credential, {
        httpClient: mockHttpClient
      });
      await client.listRoleDefinitions("/").next();
      const calls = spy.getCalls();
      assert.equal(
        calls[0].args[0].url,
        `${keyVaultUrl}///providers/Microsoft.Authorization/roleDefinitions?api-version=${LATEST_API_VERSION}`
      );
    });

    it("it should allow us to specify an API version from a specific set of versions", async function() {
      const serviceVersion = "7.2-preview";
      const credential = await new ClientSecretCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        env.AZURE_CLIENT_SECRET!
      );
      const client = new KeyVaultAccessControlClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApIVersions,
        httpClient: mockHttpClient
      });
      await client.listRoleDefinitions("/").next();

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `${keyVaultUrl}///providers/Microsoft.Authorization/roleDefinitions?api-version=${serviceVersion}`
      );
    });
  });

  describe("KeyVaultBackupClient", () => {
    const mockHttpClient: HttpClient = {
      async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
        return {
          status: 200,
          headers: new HttpHeaders(),
          request: httpRequest,
          parsedBody: {
            id: `${keyVaultUrl}/backup`,
            attributes: {}
          }
        };
      }
    };
  
    let sandbox: SinonSandbox;
    let spy: SinonSpy<[WebResourceLike], Promise<HttpOperationResponse>>;
    let credential: ClientSecretCredential;
  
    beforeEach(async () => {
      sandbox = createSandbox();
      spy = sandbox.spy(mockHttpClient, "sendRequest");
  
      credential = await new ClientSecretCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        env.AZURE_CLIENT_SECRET!
      );
    });
  
    afterEach(() => {
      sandbox.restore();
    });
  
    it("it should default to the latest API version", async function() {
      const client = new KeyVaultBackupClient(keyVaultUrl, credential, {
        httpClient: mockHttpClient
      });
      const backupPoller = await client.beginBackup("secretName", "value");
      await backupPoller.pollUntilDone();

      const calls = spy.getCalls();
      assert.equal(calls[0].args[0].url, `${keyVaultUrl}/backup?api-version=${LATEST_API_VERSION}`);
    });

    it("it should allow us to specify an API version from a specific set of versions", async function() {
      const serviceVersion = "7.2-preview";
      const credential = await new ClientSecretCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        env.AZURE_CLIENT_SECRET!
      );
      const client = new KeyVaultBackupClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApIVersions,
        httpClient: mockHttpClient
      });
      const backupPoller = await client.beginBackup("secretName", "value");
      await backupPoller.pollUntilDone();

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(lastCall.args[0].url, `${keyVaultUrl}/backup?api-version=${serviceVersion}`);
    });
  });
});
