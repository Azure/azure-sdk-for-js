// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { SinonSandbox, SinonSpy, createSandbox } from "sinon";
import { KeyClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/keysModels";
import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";
import { versionsToTest } from "@azure-tools/test-utils";
import { serviceVersions } from "../public/utils/common";

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
    const client = new KeyClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient,
    });
    await client.createKey("keyName", "RSA");

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      `https://keyvaultname.vault.azure.net/keys/keyName/create?api-version=${LATEST_API_VERSION}`,
    );
  });

  versionsToTest(serviceVersions, {}, (serviceVersion) => {
    it("it should allow us to specify an API version from a specific set of versions", async function () {
      const client = new KeyClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion,
        httpClient: mockHttpClient,
      });
      await client.createKey("keyName", "RSA");

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `https://keyvaultname.vault.azure.net/keys/keyName/create?api-version=${serviceVersion}`,
      );
    });
  });
});
