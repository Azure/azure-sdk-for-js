// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { KeyVaultAccessControlClient, KeyVaultBackupClient } from "../../src/index.js";
import { LATEST_API_VERSION } from "../../src/constants.js";
import {
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  HttpClient,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "@azure-tools/test-recorder";
import { URL } from "url";
import { describe, it, assert, expect, beforeEach, afterEach, vi, MockInstance } from "vitest";

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
  let spy: MockInstance<SendRequest>;
  let credential: ClientSecretCredential;

  beforeEach(async () => {
    credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID || "tenant",
      env.AZURE_CLIENT_ID || "client",
      env.AZURE_CLIENT_SECRET || "secret",
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("KeyVaultAccessControlClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/providers/Microsoft.Authorization/roleDefinitions");
      spy = vi.spyOn(mockHttpClient, "sendRequest");
    });

    it("it should default to the latest API version", async function () {
      const client = new KeyVaultAccessControlClient(baseUrl, credential, {
        httpClient: mockHttpClient,
      });
      await client.listRoleDefinitions("/").next();

      expect(spy).toHaveBeenCalled();
      const params = new URL(spy.mock.calls[0][0].url);
      assert.equal(params.searchParams.get("api-version"), LATEST_API_VERSION);
    });

    it("it should allow us to specify an API version from a specific set of versions", async function () {
      const serviceVersion = "7.2";
      const client = new KeyVaultAccessControlClient(baseUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.listRoleDefinitions("/").next();

      expect(spy).toHaveBeenCalled();
      const params = new URL(spy.mock.calls[0][0].url);
      assert.equal(params.searchParams.get("api-version"), serviceVersion);
    });
  });

  describe("KeyVaultBackupClient", () => {
    beforeEach(async () => {
      mockHttpClient = makeHTTPMock("/backup", 202);
      spy = vi.spyOn(mockHttpClient, "sendRequest");
    });

    it("it should default to the latest API version", async function () {
      const client = new KeyVaultBackupClient(baseUrl, credential, {
        httpClient: mockHttpClient,
      });
      await client.beginBackup("secretName", "value");

      expect(spy).toHaveBeenCalled();
      const params = new URL(spy.mock.calls[0][0].url);
      assert.equal(params.searchParams.get("api-version"), LATEST_API_VERSION);
    });

    it("it should allow us to specify an API version from a specific set of versions", async function () {
      const serviceVersion = "7.2";
      const client = new KeyVaultBackupClient(baseUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.beginBackup("secretName", "value");

      expect(spy).toHaveBeenCalled();
      const params = new URL(spy.mock.calls[0][0].url);
      assert.equal(params.searchParams.get("api-version"), serviceVersion);
    });
  });
});
