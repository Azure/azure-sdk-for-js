// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay, env, isRecordMode } from "@azure-tools/test-recorder";

import { ClientSecretCredential } from "../../../src";
import type { Context } from "mocha";
import { assert } from "@azure-tools/test-utils";

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
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates when cae enabled", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken(scope, { enableCae: true });
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({
        authorityHost: "https://fake-authority.com",
      }),
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
    } catch (e: any) {
      error = e;
    }
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.ok(error?.message.includes("endpoints_resolution_error"));
  });

  it("supports tracing", async () => {
    await assert.supportsTracing(
      async (tracingOptions) => {
        const credential = new ClientSecretCredential(
          env.AZURE_TENANT_ID!,
          env.AZURE_CLIENT_ID!,
          env.AZURE_CLIENT_SECRET!,
          recorder.configureClientOptions({}),
        );

        await credential.getToken(scope, tracingOptions);
      },
      ["ClientSecretCredential.getToken"],
    );
  });

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
      }),
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });
});
