// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env, delay, isRecordMode, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { ClientSecretCredential } from "../../../src";
import { Context } from "mocha";
import sinon from "sinon";
import { AzureLogger, setLogLevel } from "@azure/logger";

describe("ClientSecretCredential", function () {
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

  it("authenticates", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
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
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      {
        allowLoggingAccountIdentifiers: true,
      }
    );
    setLogLevel("info");
    const spy = sinon.spy(process.stderr, "write");

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    assert.ok(spy.getCall(spy.callCount - 2).args[0]);
    const expectedMessage =
      "azure:identity:info [Authenticated account] Client ID: HIDDEN. Tenant ID: HIDDEN. User Principal Name: No User Principal Name available. Object ID (user): HIDDEN";
    assert.equal(
      (spy.getCall(spy.callCount - 2).args[0] as any as string)
        .replace(/[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/g, "HIDDEN")
        .trim(),
      expectedMessage
    );
    spy.restore();
    AzureLogger.destroy();
  });

  it("allows cancelling the authentication", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
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

  it(
    "supports tracing",
    testTracing({
      test: async (tracingOptions) => {
        const credential = new ClientSecretCredential(
          env.AZURE_TENANT_ID!,
          env.AZURE_CLIENT_ID!,
          env.AZURE_CLIENT_SECRET!,
          recorder.configureClientOptions({})
        );

        await credential.getToken(scope, {
          tracingOptions,
        });
      },
      children: [
        {
          name: "ClientSecretCredential.getToken",
          children: [],
        },
      ],
    })
  );

  // TODO: Enable again once we're ready to release this feature.
  it.skip("supports specifying the regional authority", async function (this: Context) {
    // This test is extremely slow. Let's skip it for now.
    // I've tried Sinon's clock and it doesn't affect it.
    // We have internal tests that check that the parameters are properly sent to MSAL, which should be enough from the perspective of the SDK.
    if (!isRecordMode()) {
      this.skip();
    }

    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({
        // TODO: Uncomment again once we're ready to release this feature.
        // regionalAuthority: RegionalAuthority.AutoDiscoverRegion
      })
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });
});
