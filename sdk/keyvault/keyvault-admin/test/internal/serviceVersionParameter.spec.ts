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
  function makeHTTPMock(path: string, status = 200): HttpClient {
    return {
      async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
        return {
          status,
          headers: new HttpHeaders(),
          request: httpRequest,
          parsedBody: {
            id: `${env.KEYVAULT_URI}${path}`,
            attributes: {}
          }
        };
      }
    };
  }

  let mockHttpClient: HttpClient;
  let sandbox: SinonSandbox;
  let spy: SinonSpy<[WebResourceLike], Promise<HttpOperationResponse>>;
  let credential: ClientSecretCredential;

  beforeEach(async () => {
    credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("KeyVaultAccessControlClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/providers/Microsoft.Authorization/roleDefinitions");
      sandbox = createSandbox();
      spy = sandbox.spy(mockHttpClient, "sendRequest");
    });

    it("it should default to the latest API version", async function() {
      const client = new KeyVaultAccessControlClient(env.KEYVAULT_URI, credential, {
        httpClient: mockHttpClient
      });
      await client.listRoleDefinitions("/").next();
      const calls = spy.getCalls();
      assert.equal(
        calls[0].args[0].url,
        `${env.KEYVAULT_URI}///providers/Microsoft.Authorization/roleDefinitions?api-version=${LATEST_API_VERSION}`
      );
    });

    it("it should allow us to specify an API version from a specific set of versions", async function() {
      const serviceVersion = "7.2-preview";
      const client = new KeyVaultAccessControlClient(env.KEYVAULT_URI, credential, {
        serviceVersion: serviceVersion as ApIVersions,
        httpClient: mockHttpClient
      });
      await client.listRoleDefinitions("/").next();

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `${env.KEYVAULT_URI}///providers/Microsoft.Authorization/roleDefinitions?api-version=${serviceVersion}`
      );
    });
  });

  describe("KeyVaultBackupClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/backup", 202);
      sandbox = createSandbox();
      spy = sandbox.spy(mockHttpClient, "sendRequest");
    });

    it("it should default to the latest API version", async function() {
      const client = new KeyVaultBackupClient(env.KEYVAULT_URI, credential, {
        httpClient: mockHttpClient
      });
      await client.beginBackup("secretName", "value");

      const calls = spy.getCalls();
      assert.equal(
        calls[0].args[0].url,
        `${env.KEYVAULT_URI}/backup?api-version=${LATEST_API_VERSION}`
      );
    });

    it("it should allow us to specify an API version from a specific set of versions", async function() {
      const serviceVersion = "7.2-preview";
      const client = new KeyVaultBackupClient(env.KEYVAULT_URI, credential, {
        serviceVersion: serviceVersion as ApIVersions,
        httpClient: mockHttpClient
      });
      await client.beginBackup("secretName", "value");

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `${env.KEYVAULT_URI}/backup?api-version=${serviceVersion}`
      );
    });
  });
});
