// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { createSandbox, SinonSandbox, SinonSpy } from "sinon";
import { CertificateClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/certificatesModels";
import {
  HttpClient,
  createHttpHeaders,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";

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

  let sandbox: SinonSandbox;
  let spy: SinonSpy<[PipelineRequest], Promise<PipelineResponse>>;
  let credential: ClientSecretCredential;
  beforeEach(async () => {
    sandbox = createSandbox();
    spy = sandbox.spy(mockHttpClient, "sendRequest");

    credential = new ClientSecretCredential("tenant", "client", "secret");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("it should default to the latest API version", async function () {
    const client = new CertificateClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.getCertificate("certificateName");
    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      `https://keyvaultname.vault.azure.net/certificates/certificateName/?api-version=${LATEST_API_VERSION}`,
    );
  });

  // Adding this to the source would change the public API.
  type ApiVersions = "7.0" | "7.1" | "7.2" | "7.3" | "7.4";

  it("it should allow us to specify an API version from a specific set of versions", async function () {
    const versions: ApiVersions[] = ["7.0", "7.1", "7.2", "7.3", "7.4"];
    for (const serviceVersion in versions) {
      const client = new CertificateClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.getCertificate("certificateName");

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `https://keyvaultname.vault.azure.net/certificates/certificateName/?api-version=${serviceVersion}`,
      );
    }
  });
});
