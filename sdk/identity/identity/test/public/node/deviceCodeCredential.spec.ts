// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "@azure/test-utils";
import { env, isLiveMode, delay, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { AbortController, AbortError } from "@azure/abort-controller";
import { DeviceCodeCredential, DeviceCodePromptCallback } from "../../../src";
import { msalNodeTestSetup, MsalTestCleanup } from "../../msalTestUtils";
import { Context } from "mocha";

// https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/identity/Azure.Identity/src/Constants.cs#L9
const DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

describe("DeviceCodeCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest, DeveloperSignOnClientId);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates with default values", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(recorder.configureClientOptions({}));

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with provided values", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      })
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with specific permissions", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      })
    );

    // Important: Specifying permissions on the scope parameter of getToken won't work on client credential flows.
    const token = await credential.getToken("https://graph.microsoft.com/Calendars.Read");
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates and allows the customization of the prompt callback", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const callback: DeviceCodePromptCallback = (info) => {
      console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
    };
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
        userPromptCallback: callback,
      })
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function (this: Context) {
    // Because of the user interaction, this test works inconsistently in our live test pipelines.
    if (isLiveMode()) {
      this.skip();
    }

    // On playback we can't quite control the time needed to trigger this error.
    if (isPlaybackMode()) {
      this.skip();
    }

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      })
    );

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal,
    });

    await delay(500);
    controller.abort();

    let error: AbortError | undefined;
    try {
      await getTokenPromise;
    } catch (e: any) {
      error = e;
    }

    assert.equal(error?.name, "AbortError");
    assert.ok(error?.message.match("The authentication has been aborted by the caller."));
  });

  it("allows setting disableAutomaticAuthentication", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        disableAutomaticAuthentication: true,
      })
    );

    let error: AbortError | undefined;
    try {
      await credential.getToken(scope);
    } catch (e: any) {
      error = e;
    }
    assert.equal(
      error?.message,
      `Automatic authentication has been disabled. You may call the authentication() method.`
    );

    const account = await credential.authenticate(scope);
    assert.ok(account);
  });

  it("supports tracing", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    await assert.supportsTracing(
      async (tracingOptions) => {
        const credential = new DeviceCodeCredential(
          recorder.configureClientOptions({
            tenantId: env.AZURE_TENANT_ID,
            clientId: env.AZURE_CLIENT_ID,
          })
        );

        await credential.getToken(scope, tracingOptions);
      },
      ["DeviceCodeCredential.getToken"]
    );
  });
});
