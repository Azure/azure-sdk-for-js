// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";
import type { MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SecretClient } from "@azure/keyvault-secrets";
import { LATEST_API_VERSION } from "$internal/secretsModels.js";

describe("The Secrets client should set the serviceVersion", () => {
  const keyVaultUrl = `https://keyVaultName.vault.azure.net`;

  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({
          id: `${keyVaultUrl}/secrets/secretName/id`,
          attributes: {},
        }),
      };
    },
  };

  let spy: MockInstance<SendRequest>;
  let credential: ClientSecretCredential;
  beforeEach(async () => {
    spy = vi.spyOn(mockHttpClient, "sendRequest");

    credential = new ClientSecretCredential("tenant", "client", "secret");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("it should default to the latest API version", async () => {
    const client = new SecretClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.setSecret("secretName", "value");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `https://keyvaultname.vault.azure.net/secrets/secretName?api%2Dversion=${LATEST_API_VERSION}`,
      }),
    );
  });

  // Adding this to the source would change the public API.
  type ApiVersions = "7.0" | "7.1" | "7.2";

  it("it should allow us to specify an API version from a specific set of versions", async () => {
    const versions: ApiVersions[] = ["7.0", "7.1", "7.2"];
    for (const serviceVersion in versions) {
      const client = new SecretClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.setSecret("secretName", "value");

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          url: `https://keyvaultname.vault.azure.net/secrets/secretName?api%2Dversion=${serviceVersion}`,
        }),
      );
    }
  });
});
