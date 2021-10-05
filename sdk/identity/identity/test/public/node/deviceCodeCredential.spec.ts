// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env, isLiveMode, delay, isPlaybackMode } from "@azure-tools/test-recorder";
import { AbortController, AbortError } from "@azure/abort-controller";
import { DeviceCodeCredential, DeviceCodePromptCallback } from "../../../src";
import { msalNodeTestSetup, MsalTestCleanup, testTracing } from "../../msalTestUtils";
import { Context } from "mocha";

describe("DeviceCodeCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates with default values", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential();

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with provided values", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID
    });

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with specific permissions", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID
    });

    // Important: Specifying permissions on the scope parameter of getToken won't work on client credential flows.
    const token = await credential.getToken("https://graph.microsoft.com/Calendars.Read");
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates and allows the customization of the prompt callback", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const callback: DeviceCodePromptCallback = (info) => {
      console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
    };
    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID,
      userPromptCallback: callback
    });

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function(this: Context) {
    // Because of the user interaction, this test works inconsistently in our live test pipelines.
    if (isLiveMode()) {
      this.skip();
    }
    if (isPlaybackMode()) {
      // We're automatically replacing the DeviceCode polling interval on the recorder settings,
      // which makes it so this test fails on playback.
      this.skip();
    }

    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID
    });

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
    assert.ok(error?.message.match("The authentication has been aborted by the caller."));
  });

  it("allows setting disableAutomaticAuthentication", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential({
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

  it("supports tracing", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    await testTracing({
      test: async (tracingOptions) => {
        const credential = new DeviceCodeCredential({
          tenantId: env.AZURE_TENANT_ID,
          clientId: env.AZURE_CLIENT_ID
        });

        await credential.getToken(scope, {
          tracingOptions
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
