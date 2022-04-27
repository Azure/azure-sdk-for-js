// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "@azure/test-utils";
import { env, delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { Context } from "mocha";

// https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/identity/Azure.Identity/src/Constants.cs#L9
const DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

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
    const clientId = isLiveMode() ? DeveloperSignOnClientId : env.AZURE_CLIENT_ID!;

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

  it("allows cancelling the authentication", async function () {
    const tenantId = env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!;
    const clientId = isLiveMode() ? DeveloperSignOnClientId : env.AZURE_CLIENT_ID!;

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
    } catch (e: any) {
      error = e;
    }
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.ok(error?.message.includes("could not resolve endpoints"));
  });

  it("supports tracing", async function (this: Context) {
    const tenantId = env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!;
    const clientId = isLiveMode() ? DeveloperSignOnClientId : env.AZURE_CLIENT_ID!;

    await assert.supportsTracing(
      async (tracingOptions) => {
        const credential = new UsernamePasswordCredential(
          tenantId,
          clientId,
          env.AZURE_IDENTITY_TEST_USERNAME || env.AZURE_USERNAME!,
          env.AZURE_IDENTITY_TEST_PASSWORD || env.AZURE_PASSWORD!,
          recorder.configureClientOptions({})
        );

        await credential.getToken(scope, tracingOptions);
      },
      ["UsernamePasswordCredential.getToken"]
    );
  });
});
