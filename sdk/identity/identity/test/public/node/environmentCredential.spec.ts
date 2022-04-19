// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import sinon from "sinon";
import { assert } from "@azure/test-utils";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { EnvironmentCredential, UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { Context } from "mocha";
import { getError } from "../../authTestUtils";

describe("EnvironmentCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;
  const environmentVariableNames = [
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_CLIENT_SECRET",
    "AZURE_CLIENT_CERTIFICATE_PATH",
    "AZURE_USERNAME",
    "AZURE_PASSWORD",
  ];
  const cachedValues: Record<string, string | undefined> = {};

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    recorder = setup.recorder;
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

    const credential = new EnvironmentCredential(recorder.configureClientOptions({}));

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with a client certificate on the environment variables", async function (this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    // The following environment variables must be set for this to work.
    // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
    process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
    process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
    process.env.AZURE_CLIENT_CERTIFICATE_PATH =
      cachedValues.AZURE_CLIENT_CERTIFICATE_PATH || "assets/fake-cert.pem";

    const credential = new EnvironmentCredential(recorder.configureClientOptions({}));

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
      const credential = new EnvironmentCredential(recorder.configureClientOptions({}));
      await credential.getToken("scope");
    } catch (e: any) {
      // To avoid having to store passwords anywhere, this getToken request will fail.
      // We will focus our test on making sure the underlying getToken was called.
    }

    assert.equal(
      getTokenSpy.callCount,
      1,
      "UsernamePasswordCredential getToken should have been called"
    );
  });

  it("supports tracing with environment client secret", async () => {
    await assert.supportsTracing(
      async (tracingOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_CLIENT_SECRET = cachedValues.AZURE_CLIENT_SECRET;

        const credential = new EnvironmentCredential(recorder.configureClientOptions({}));

        await credential.getToken(scope, tracingOptions);
      },
      ["EnvironmentCredential.getToken"]
    );
  });

  it("supports tracing with environment client certificate", async function (this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    await assert.supportsTracing(
      async (tracingOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_CLIENT_CERTIFICATE_PATH =
          cachedValues.AZURE_CLIENT_CERTIFICATE_PATH || "assets/fake-cert.pem";

        const credential = new EnvironmentCredential(recorder.configureClientOptions({}));

        await credential.getToken(scope, tracingOptions);
      },
      ["EnvironmentCredential.getToken"]
    );
  });

  it("supports tracing with environment username/password", async () => {
    await assert.supportsTracing(
      async (tracingOptions) => {
        // The following environment variables must be set for this to work.
        // On TEST_MODE="playback", the recorder automatically fills them with stubbed values.
        process.env.AZURE_TENANT_ID = cachedValues.AZURE_TENANT_ID;
        process.env.AZURE_CLIENT_ID = cachedValues.AZURE_CLIENT_ID;
        process.env.AZURE_USERNAME = "user";
        process.env.AZURE_PASSWORD = "password";

        const credential = new EnvironmentCredential(recorder.configureClientOptions({}));

        try {
          await credential.getToken(scope, tracingOptions);
        } catch (e: any) {
          // To avoid having to store passwords anywhere, this getToken request will fail.
          // We will focus our test on making sure the underlying getToken was called.
        }
      },
      ["EnvironmentCredential.getToken"]
    );
  });

  it("throws an CredentialUnavailable when getToken is called and no credential was configured", async () => {
    const credential = new EnvironmentCredential(recorder.configureClientOptions({}));
    const error = await getError(credential.getToken(scope));
    assert.equal(error.name, "CredentialUnavailableError");
    assert.ok(
      error.message.indexOf(
        "EnvironmentCredential is unavailable. No underlying credential could be used."
      ) > -1
    );
  });

  it("throws an AuthenticationError when getToken is called and EnvironmentCredential authentication failed", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const credential = new EnvironmentCredential(recorder.configureClientOptions({}));
    const error = await getError(credential.getToken(scope));
    assert.equal(error.name, "AuthenticationError");
    assert.ok(error.message.indexOf("EnvironmentCredential authentication failed.") > -1);
  });
});
