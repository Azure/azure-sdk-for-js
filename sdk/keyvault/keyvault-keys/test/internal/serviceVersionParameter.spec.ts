// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { createSandbox, SinonSandbox, SinonSpy } from "sinon";
import { KeyClient } from "../../src";
import { LATEST_API_VERSION } from "../../src/keysModels";
import { HttpClient, HttpOperationResponse, WebResourceLike, HttpHeaders } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";
import { env } from "@azure/test-utils-recorder";

describe("The Keys client should set the serviceVersion", () => {
  const keyVaultUrl = `https://keyVaultName.vault.azure.net`;

  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: 200,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: {
          key: {
            kid: `${keyVaultUrl}/keys/keyName/id`
          }
        }
      };
    }
  };

  let sandbox: SinonSandbox;
  let spy: SinonSpy<[WebResourceLike], Promise<HttpOperationResponse>>;
  let credential: ClientSecretCredential;
  beforeEach(async () => {
    sandbox = createSandbox();
    spy = sandbox.spy(mockHttpClient, "sendRequest");

    credential = await new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("it should default to the latest API version", async function() {
    const client = new KeyClient(keyVaultUrl, credential, {
      httpClient: mockHttpClient
    });
    await client.createKey("keyName", "RSA");

    const calls = spy.getCalls();
    assert.equal(
      calls[0].args[0].url,
      `https://keyVaultName.vault.azure.net/keys/keyName/create?api-version=${LATEST_API_VERSION}`
    );
  });

  // Adding this to the source would change the public API.
  type ApIVersions = "7.0" | "7.1";

  it("it should allow us to specify an API version from a specific set of versions", async function() {
    const versions: ApIVersions[] = ["7.0", "7.1"];
    for (const serviceVersion in versions) {
      const client = new KeyClient(keyVaultUrl, credential, {
        serviceVersion: serviceVersion as ApIVersions,
        httpClient: mockHttpClient
      });
      await client.createKey("keyName", "RSA");

      const calls = spy.getCalls();
      const lastCall = calls[calls.length - 1];
      assert.equal(
        lastCall.args[0].url,
        `https://keyVaultName.vault.azure.net/keys/keyName/create?api-version=${serviceVersion}`
      );
    }
  });
});
