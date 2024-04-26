// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { SinonSandbox, SinonSpy, createSandbox } from "sinon";
import { SecretClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/secretsModels";
import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";

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
    const client = new SecretClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.setSecret("secretName", "value");

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      `https://keyvaultname.vault.azure.net/secrets/secretName?api-version=${LATEST_API_VERSION}`,
    );
  });

  // Adding this to the source would change the public API.
  type ApiVersions = "7.0" | "7.1" | "7.2";

  it("it should allow us to specify an API version from a specific set of versions", async function () {
    const versions: ApiVersions[] = ["7.0", "7.1", "7.2"];
    for (const serviceVersion in versions) {
      const client = new SecretClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApiVersions,
        httpClient: mockHttpClient,
      });
      await client.setSecret("secretName", "value");

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `https://keyvaultname.vault.azure.net/secrets/secretName?api-version=${serviceVersion}`,
      );
    }
  });
});
