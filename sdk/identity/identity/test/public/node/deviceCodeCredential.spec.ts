// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";
import { env, isLiveMode, delay } from "@azure/test-utils-recorder";
import { AbortController, AbortError } from "@azure/abort-controller";
import { DeviceCodeCredential, DeviceCodePromptCallback } from "../../../src";
import { msalNodeTestSetup, MsalTestCleanup, testTracing } from "../../msalTestUtils";

describe("DeviceCodeCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function() {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates with default values", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential();

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with provided values", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID);

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates and allows the customization of the prompt callback", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const callback: DeviceCodePromptCallback = (info) => {
      console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
    };
    const credential = new DeviceCodeCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, callback);

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  // Setting the MSAL options to cancel doesn't seem to be cancelling MSAL. I'm waiting for them to mention how to do this.
  it.skip("allows cancelling the authentication", async function() {
    const credential = new DeviceCodeCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID);

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal
    });

    await delay(500);
    controller.abort();

    let error: AbortError | undefined;
    try {
      await getTokenPromise;
    } catch (e) {
      error = e;
    }
    assert.equal(error?.name, "AbortError");
    assert.equal(error?.message, "Cancellation triggered by the AbortSignal");
  });

  it("allows setting disableAutomaticAuthentication", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID,
      disableAutomaticAuthentication: true
    });

    let error: AbortError | undefined;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }
    assert.equal(
      error?.message,
      `Automatic authentication has been disabled. You may call the authentication() method.`
    );

    const account = await credential.authenticate(scope);
    assert.ok(account);
  });

  it("supports tracing", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    await testTracing({
      test: async (spanOptions) => {
        const credential = new DeviceCodeCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID);

        await credential.getToken(scope, {
          tracingOptions: {
            spanOptions
          }
        });
      },
      children: [
        {
          name: "Azure.Identity.DeviceCodeCredential.getToken",
          children: []
        }
      ]
    })();
  });
});
