// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import sinon from "sinon";
import assert from "assert";
import { isPlaybackMode } from "@azure/test-utils-recorder";
import {
  AuthenticationError,
  CredentialUnavailable,
  EnvironmentCredential,
  UsernamePasswordCredential
} from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { assertRejects } from "../../authTestUtils";

describe("EnvironmentCredential", function() {
  let cleanup: MsalTestCleanup;
  const environmentVariableNames = [
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_CLIENT_SECRET",
    "AZURE_CLIENT_CERTIFICATE_PATH",
    "AZURE_USERNAME",
    "AZURE_PASSWORD"
  ];
  const cachedValues: Record<string, string | undefined> = {};

  beforeEach(function() {
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

    const credential = new EnvironmentCredential();

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with a client certificate on the environment variables", async function() {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }

    // The following environment variables must be set for this to work.
    // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
    process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
    process.env.AZURE_CLIENT_CERTIFICATE_PATH = cachedValues.AZURE_CLIENT_CERTIFICATE_PATH;

    const credential = new EnvironmentCredential();

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("finds and uses client username/password environment variables", async () => {
    // The following environment variables must be set for this to work.
    // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
    process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
    process.env.AZURE_USERNAME = "user";
    process.env.AZURE_PASSWORD = "password";

    const getTokenSpy = sinon.spy(UsernamePasswordCredential.prototype, "getToken");

    try {
      const credential = new EnvironmentCredential();
      await credential.getToken("scope");
    } catch (e) {
      // To avoid having to store passwords anywhere, this getToken request will fail.
      // We will focus our test on making sure the underlying getToken was called.
    }

    assert.equal(
      getTokenSpy.callCount,
      1,
      "UsernamePasswordCredential getToken should have been called"
    );
  });

  it(
    "supports tracing with environment client secret",
    testTracing({
      test: async (spanOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_CLIENT_SECRET = cachedValues.AZURE_CLIENT_SECRET;

        const credential = new EnvironmentCredential();

        await credential.getToken(scope, {
          tracingOptions: {
            spanOptions
          }
        });
      },
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
    })
  );

  it("supports tracing with environment client certificate", async function() {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }
    await testTracing({
      test: async (spanOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_CLIENT_CERTIFICATE_PATH = cachedValues.AZURE_CLIENT_CERTIFICATE_PATH;

        const credential = new EnvironmentCredential();

        await credential.getToken(scope, {
          tracingOptions: {
            spanOptions
          }
        });
      },
      children: [
        {
          name: "Azure.Identity.EnvironmentCredential.getToken",
          children: [
            {
              name: "Azure.Identity.ClientCertificateCredential.getToken",
              children: []
            }
          ]
        }
      ]
    })();
  });

  it(
    "supports tracing with environment username/password",
    testTracing({
      test: async (spanOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_USERNAME = "user";
        process.env.AZURE_PASSWORD = "password";

        const credential = new EnvironmentCredential();

        try {
          await credential.getToken(scope, {
            tracingOptions: {
              spanOptions
            }
          });
        } catch (e) {
          // To avoid having to store passwords anywhere, this getToken request will fail.
          // We will focus our test on making sure the underlying getToken was called.
        }
      },
      children: [
        {
          name: "Azure.Identity.EnvironmentCredential.getToken",
          children: [
            {
              name: "Azure.Identity.UsernamePasswordCredential.getToken",
              children: []
            }
          ]
        }
      ]
    })
  );

  it("throws an CredentialUnavailable when getToken is called and no credential was configured", async () => {
    const credential = new EnvironmentCredential();
    await assertRejects(
      credential.getToken(scope),
      (error: CredentialUnavailable) =>
        error.message.indexOf(
          "EnvironmentCredential is unavailable. No underlying credential could be used."
        ) > -1
    );
  });

  it("throws an AuthenticationError when getToken is called and EnvironmentCredential authentication failed", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const credential = new EnvironmentCredential();
    await assertRejects(
      credential.getToken(scope),
      (error: AuthenticationError) =>
        error.errorResponse.error.indexOf("EnvironmentCredential authentication failed.") > -1
    );
  });
});
