// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { createSandbox, SinonSandbox, SinonSpy } from "sinon";
import { KeyVaultAccessControlClient, KeyVaultBackupClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/constants";
import {
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  HttpClient,
} from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "@azure-tools/test-recorder";
import { URL } from "url";

// Adding this to the source would change the public API.
type ApiVersions = "7.2" | "7.3";

const baseUrl = "https://managed_hsm.managedhsm.azure.net/";

describe("The keyvault-admin clients should set the serviceVersion", () => {
  function makeHTTPMock(path: string, status = 200): HttpClient {
    return {
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        return {
          status,
          headers: createHttpHeaders(),
          request: request,
          bodyAsText: JSON.stringify({
            id: `${baseUrl}${path}`,
            startTime: new Date(),
            attributes: {},
          }),
        };
      },
    };
  }

  let mockHttpClient: HttpClient;
  let sandbox: SinonSandbox;
  let spy: SinonSpy<[PipelineRequest], Promise<PipelineResponse>>;
  let credential: ClientSecretCredential;

  beforeEach(async () => {
    credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID || "tenant",
      env.AZURE_CLIENT_ID || "client",
      env.AZURE_CLIENT_SECRET || "secret"
    );
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("KeyVaultAccessControlClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/providers/Microsoft.Authorization/roleDefinitions");
      spy = sandbox.spy(mockHttpClient, "sendRequest");
    });

    it("it should default to the latest API version", async function () {
      const client = new KeyVaultAccessControlClient(baseUrl, credential, {
        httpClient: mockHttpClient,
      });
      await client.listRoleDefinitions("/").next();

      assert.ok(spy.called);
      const calls = spy.getCalls();
      const params = new URL(calls[0].args[0].url);
      assert.equal(params.searchParams.get("api-version"), LATEST_API_VERSION);
    });

    it("it should allow us to specify an API version from a specific set of versions", async function () {
      const serviceVersion = "7.2";
      const client = new KeyVaultAccessControlClient(baseUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.listRoleDefinitions("/").next();

      assert.ok(spy.called);
      const calls = spy.getCalls();
      const params = new URL(calls[0].args[0].url);
      assert.equal(params.searchParams.get("api-version"), serviceVersion);
    });
  });

  describe("KeyVaultBackupClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/backup", 202);
      spy = sandbox.spy(mockHttpClient, "sendRequest");
    });

    it("it should default to the latest API version", async function () {
      const client = new KeyVaultBackupClient(baseUrl, credential, {
        httpClient: mockHttpClient,
      });
      await client.beginBackup("secretName", "value");

      assert.ok(spy.called);
      const calls = spy.getCalls();
      const params = new URL(calls[0].args[0].url);
      assert.equal(params.searchParams.get("api-version"), LATEST_API_VERSION);
    });

    it("it should allow us to specify an API version from a specific set of versions", async function () {
      const serviceVersion = "7.2";
      const client = new KeyVaultBackupClient(baseUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.beginBackup("secretName", "value");

      assert.ok(spy.called);
      const calls = spy.getCalls();
      const params = new URL(calls[0].args[0].url);
      assert.equal(params.searchParams.get("api-version"), serviceVersion);
    });
  });
});
