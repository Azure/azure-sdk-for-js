// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { ApplicationCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { getError } from "../../authTestUtils";
import { Context } from "mocha";

describe("ApplicationCredential", function() {
  let cleanup: MsalTestCleanup;
  const environmentVariableNames = ["AZURE_TENANT_ID", "AZURE_CLIENT_ID", "AZURE_CLIENT_SECRET"];
  const cachedValues: Record<string, string | undefined> = {};

  beforeEach(function(this: Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;
    environmentVariableNames.forEach((name) => {
      cachedValues[name] = process.env[name];
      delete process.env[name];
    });
  });
  afterEach(async function() {
    await cleanup();
    environmentVariableNames.forEach((name) => {
      process.env[name] = cachedValues[name];
    });
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates with a client secret on the environment variables", async function() {
    // The following environment variables must be set for this to work.
    // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
    process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
    process.env.AZURE_CLIENT_SECRET = cachedValues.AZURE_CLIENT_SECRET;

    const credential = new ApplicationCredential();

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp > Date.now());
  });

  it(
    "supports tracing with environment client secret",
    testTracing({
      test: async (tracingOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_CLIENT_SECRET = cachedValues.AZURE_CLIENT_SECRET;

        const credential = new ApplicationCredential();

        await credential.getToken(scope, {
          tracingOptions
        });
      },
      children: [
        {
          name: "Azure.Identity.ChainedTokenCredential-getToken",
          children: [
            {
              name: "Azure.Identity.EnvironmentCredential.getToken",
              children: [
                {
                  name: "Azure.Identity.ClientSecretCredential.getToken",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    })
  );

  it("throws an AggregateAuthenticationError when getToken is called and no credential was configured", async () => {
    const credential = new ApplicationCredential();
    const error = await getError(credential.getToken(scope));
    assert.equal(error.name, "AggregateAuthenticationError");
    console.log(`${error.message}`);
    assert.ok(
      error.message.indexOf(
        `CredentialUnavailableError: EnvironmentCredential is unavailable. No underlying credential could be used.\nCredentialUnavailableError: ManagedIdentityCredential authentication failed.`
      ) > -1
    );
  });

  it("throws an AuthenticationError when getToken is called and ApplicationCredential authentication failed", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const credential = new ApplicationCredential();

    const error = await getError(credential.getToken(scope));
    assert.equal(error.name, "AuthenticationError");
    assert.ok(error.message.indexOf("EnvironmentCredential authentication failed.") > -1);
  });
});
