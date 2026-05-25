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
import { KnownContentType, SecretClient } from "../../src/index.js";
import { LATEST_API_VERSION } from "../../src/secretsModels.js";

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

  it("it should allow us to specify an API version from a specific set of versions", async () => {
    const versions = [
      "7.0",
      "7.1",
      "7.2",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "2025-07-01",
      "2026-01-01-preview",
      "2026-03-01-preview",
    ] as const;
    for (const serviceVersion of versions) {
      const client = new SecretClient(keyVaultUrl, credential, {
        serviceVersion,
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

  it("should include outContentType=PEM in the URL when specified in getSecret", async () => {
    const client = new SecretClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.getSecret("secretName", { outContentType: KnownContentType.PEM });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining("outContentType=application%2Fx-pem-file"),
      }),
    );
  });

  it("should include outContentType=PFX in the URL when specified in getSecret", async () => {
    const client = new SecretClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.getSecret("secretName", { outContentType: KnownContentType.PFX });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining("outContentType=application%2Fx-pkcs12"),
      }),
    );
  });

  it("should not include outContentType in the URL when not specified in getSecret", async () => {
    const client = new SecretClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.getSecret("secretName");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.not.stringContaining("outContentType"),
      }),
    );
  });
});
