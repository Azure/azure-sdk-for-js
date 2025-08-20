// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CertificateClient } from "@azure/keyvault-certificates";
import { LATEST_API_VERSION } from "$internal/certificatesModels.js";
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

describe("The Certificates client should set the serviceVersion", () => {
  const keyVaultUrl = `https://keyvaultname.vault.azure.net`;

  const mockHttpClient: HttpClient = {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: request,
        bodyAsText: JSON.stringify({
          id: `${keyVaultUrl}/certificates/certificateName/id`,
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
    const client = new CertificateClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.getCertificate("certificateName");
    expect(spy).toHaveBeenCalled();
    const url = spy.mock.lastCall![0].url;
    expect(url).toEqual(
      `https://keyvaultname.vault.azure.net/certificates/certificateName/?api%2Dversion=${LATEST_API_VERSION}`,
    );
  });

  // Adding this to the source would change the public API.
  type ApiVersions = "7.0" | "7.1" | "7.2" | "7.3" | "7.4";

  it("it should allow us to specify an API version from a specific set of versions", async () => {
    const versions: ApiVersions[] = ["7.0", "7.1", "7.2", "7.3", "7.4"];
    for (const serviceVersion in versions) {
      const client = new CertificateClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.getCertificate("certificateName");

      expect(spy).toHaveBeenCalled();
      const url = spy.mock.lastCall![0].url;
      expect(url).toEqual(
        `https://keyvaultname.vault.azure.net/certificates/certificateName/?api%2Dversion=${serviceVersion}`,
      );
    }
  });
});
