// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env, delay, isLiveMode } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { Context } from "mocha";

describe("UsernamePasswordCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function(this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function() {
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD
    );

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal
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

  it("supports tracing", async function(this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    await testTracing({
      test: async (tracingOptions) => {
        const credential = new UsernamePasswordCredential(
          env.AZURE_TENANT_ID,
          env.AZURE_CLIENT_ID,
          env.AZURE_USERNAME,
          env.AZURE_PASSWORD
        );

        await credential.getToken(scope, {
          tracingOptions
        });
      },
      children: [
        {
          name: "UsernamePasswordCredential.getToken",
          children: []
        }
      ]
    });
  });
});
