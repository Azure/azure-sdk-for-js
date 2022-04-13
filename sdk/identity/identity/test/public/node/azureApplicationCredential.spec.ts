// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { getError } from "../../authTestUtils";
import { Context } from "mocha";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

// TODO: Use the real one once we decide to re-enable this on the public API.
class AzureApplicationCredential implements TokenCredential {
  getToken(_scope: string | string[], _getTokenOptions?: GetTokenOptions): Promise<AccessToken> {
    throw new Error("Not implemented");
  }
}

// TODO: Re-enable this when possible.
describe.skip("AzureApplicationCredential", function () {
  let cleanup: MsalTestCleanup;
  const environmentVariableNames = ["AZURE_TENANT_ID", "AZURE_CLIENT_ID", "AZURE_CLIENT_SECRET"];
  const cachedValues: Record<string, string | undefined> = {};

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    environmentVariableNames.forEach((name) => {
      cachedValues[name] = process.env[name];
      delete process.env[name];
    });
  });
  afterEach(async function () {
    await cleanup();
    environmentVariableNames.forEach((name) => {
      process.env[name] = cachedValues[name];
    });
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates with a client secret on the environment variables", async function () {
    // The following environment variables must be set for this to work.
    // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
    process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
    process.env.AZURE_CLIENT_SECRET = cachedValues.AZURE_CLIENT_SECRET;

    const credential = new AzureApplicationCredential();

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp > Date.now());
  });

  it("supports tracing with environment client secret", async () => {
    await assert.supportsTracing(
      async (tracingOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_CLIENT_SECRET = cachedValues.AZURE_CLIENT_SECRET;

        const credential = new AzureApplicationCredential();

        await credential.getToken(scope, tracingOptions);
      },
      [
        "ChainedTokenCredential.getToken",
        "EnvironmentCredential.getToken",
        "ClientSecretCredential.getToken",
      ]
    );
  });

  it("throws an AggregateAuthenticationError when getToken is called and no credential was configured", async () => {
    const credential = new AzureApplicationCredential();
    const error = await getError(credential.getToken(scope));
    assert.equal(error.name, "AggregateAuthenticationError");
    assert.ok(error.message.indexOf(`CredentialUnavailableError: EnvironmentCredential`) > -1);
    assert.ok(error.message.indexOf(`CredentialUnavailableError: ManagedIdentityCredential`) > -1);
  });

  it("throws an AuthenticationError when getToken is called and AzureApplicationCredential authentication failed", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const credential = new AzureApplicationCredential();

    const error = await getError(credential.getToken(scope));
    assert.equal(error.name, "AuthenticationError");
    assert.ok(error.message.indexOf("EnvironmentCredential authentication failed.") > -1);
  });
});
