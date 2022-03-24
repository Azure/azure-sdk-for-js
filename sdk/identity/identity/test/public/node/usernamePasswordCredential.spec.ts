// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env, delay, isPlaybackMode, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { Context } from "mocha";
import sinon from "sinon";
import { AzureLogger, setLogLevel } from "@azure/logger";

const liveClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46"; // Live test client ID

describe("UsernamePasswordCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function (this: Context) {
    const tenantId = env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!;
    const clientId = isLiveMode() ? liveClientId : env.AZURE_CLIENT_ID!;

    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      env.AZURE_IDENTITY_TEST_USERNAME || env.AZURE_USERNAME!,
      env.AZURE_IDENTITY_TEST_PASSWORD || env.AZURE_PASSWORD!,
      recorder.configureClientOptions({})
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates (with allowLoggingAccountIdentifiers set to true)", async function (this: Context) {
    if (isPlaybackMode()) {
      // The recorder clears the access tokens.
      this.skip();
    }
    const tenantId = env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!;
    const clientId = isLiveMode() ? liveClientId : env.AZURE_CLIENT_ID!;

    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      env.AZURE_IDENTITY_TEST_USERNAME || env.AZURE_USERNAME!,
      env.AZURE_IDENTITY_TEST_PASSWORD || env.AZURE_PASSWORD!,
      recorder.configureClientOptions({
        loggingOptions: { allowLoggingAccountIdentifiers: true },
      })
    );
    setLogLevel("info");
    const spy = sinon.spy(process.stderr, "write");

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    assert.ok(spy.getCall(spy.callCount - 2).args[0]);
    const expectedMessage = `azure:identity:info [Authenticated account] Client ID: ${clientId}. Tenant ID: ${tenantId}. User Principal Name: HIDDEN. Object ID (user): HIDDEN`;
    assert.equal(
      (spy.getCall(spy.callCount - 2).args[0] as any as string)
        .replace(/User Principal Name: [^ ]+. /g, "User Principal Name: HIDDEN. ")
        .replace(
          /Object ID .user.: [a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/g,
          "Object ID (user): HIDDEN"
        )
        .trim(),
      expectedMessage
    );
    spy.restore();
    AzureLogger.destroy();
  });

  it("allows cancelling the authentication", async function () {
    const tenantId = env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!;
    const clientId = isLiveMode() ? liveClientId : env.AZURE_CLIENT_ID!;

    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      env.AZURE_IDENTITY_TEST_USERNAME || env.AZURE_USERNAME!,
      env.AZURE_IDENTITY_TEST_PASSWORD || env.AZURE_PASSWORD!
    );

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal,
    });

    await delay(5);
    controller.abort();

    let error: Error | undefined;
    try {
      await getTokenPromise;
    } catch (e) {
      error = e;
    }
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.ok(error?.message.includes("could not resolve endpoints"));
  });

  it("supports tracing", async function (this: Context) {
    const tenantId = env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!;
    const clientId = isLiveMode() ? liveClientId : env.AZURE_CLIENT_ID!;

    await testTracing({
      test: async (tracingOptions) => {
        const credential = new UsernamePasswordCredential(
          tenantId,
          clientId,
          env.AZURE_IDENTITY_TEST_USERNAME || env.AZURE_USERNAME!,
          env.AZURE_IDENTITY_TEST_PASSWORD || env.AZURE_PASSWORD!,
          recorder.configureClientOptions({})
        );

        await credential.getToken(scope, {
          tracingOptions,
        });
      },
      children: [
        {
          name: "UsernamePasswordCredential.getToken",
          children: [],
        },
      ],
    });
  });
});
