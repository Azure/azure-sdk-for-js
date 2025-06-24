// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KeyClient } from "../../src/index.js";
import { LATEST_API_VERSION } from "../../src/keysModels.js";
import type {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";
import type { MockInstance } from "vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("The Keys client should set the serviceVersion", () => {
  const keyVaultUrl = `https://keyvaultname.vault.azure.net`;

  const mockHttpClient: HttpClient = {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: request,
        bodyAsText: JSON.stringify({
          key: {
            kid: `${keyVaultUrl}/keys/keyName/id`,
          },
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
    const client = new KeyClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.createKey("keyName", "RSA");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `https://keyvaultname.vault.azure.net/keys/keyName/create?api%2Dversion=${LATEST_API_VERSION}`,
      }),
    );
  });

  it("it should allow us to specify an API version from a specific set of versions", async () => {
    const client = new KeyClient(keyVaultUrl, credential, {
      serviceVersion: "7.0",
      httpClient: mockHttpClient,
    });
    await client.createKey("keyName", "RSA");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `https://keyvaultname.vault.azure.net/keys/keyName/create?api%2Dversion=7.0`,
      }),
    );
  });
});
