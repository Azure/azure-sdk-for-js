// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env, delay, isLiveMode, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { Context } from "mocha";
import sinon from "sinon";
import { AzureLogger, setLogLevel } from "@azure/logger";

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
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_USERNAME!,
      env.AZURE_PASSWORD!,
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
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_USERNAME!,
      env.AZURE_PASSWORD!,
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
    const expectedMessage = `azure:identity:info [Authenticated account] Client ID: ${env.AZURE_CLIENT_ID}. Tenant ID: ${env.AZURE_TENANT_ID}. User Principal Name: ${env.AZURE_USERNAME}. Object ID (user): HIDDEN`;
    assert.equal(
      (spy.getCall(spy.callCount - 2).args[0] as any as string)
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
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_USERNAME!,
      env.AZURE_PASSWORD!,
      recorder.configureClientOptions({})
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
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    await testTracing({
      test: async (tracingOptions) => {
        const credential = new UsernamePasswordCredential(
          env.AZURE_TENANT_ID!,
          env.AZURE_CLIENT_ID!,
          env.AZURE_USERNAME!,
          env.AZURE_PASSWORD!,
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
