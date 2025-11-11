// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { AbortError } from "@azure/abort-controller";
import type { DeviceCodePromptCallback } from "@azure/identity";
import { DeviceCodeCredential } from "@azure/identity";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay, env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

// https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/identity/Azure.Identity/src/Constants.cs#L9
const DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

describe("DeviceCodeCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx, DeveloperSignOnClientId);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it.skipIf(isLiveMode())("authenticates with default values", async function () {
    // These tests should not run live because this credential requires user interaction.
    const credential = new DeviceCodeCredential(recorder.configureClientOptions({}));

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it.skipIf(isLiveMode())("authenticates with provided values", async function () {
    // These tests should not run live because this credential requires user interaction.
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      }),
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it.skipIf(isLiveMode())("authenticates with specific permissions", async function () {
    // These tests should not run live because this credential requires user interaction.
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      }),
    );

    // Important: Specifying permissions on the scope parameter of getToken won't work on client credential flows.
    const token = await credential.getToken("https://graph.microsoft.com/Calendars.Read");
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it.skipIf(isLiveMode())(
    "authenticates and allows the customization of the prompt callback",
    async function () {
      // These tests should not run live because this credential requires user interaction.
      const callback: DeviceCodePromptCallback = (info) => {
        console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
      };
      const credential = new DeviceCodeCredential(
        recorder.configureClientOptions({
          tenantId: env.AZURE_TENANT_ID,
          clientId: env.AZURE_CLIENT_ID,
          userPromptCallback: callback,
        }),
      );

      const token = await credential.getToken(scope);
      assert.ok(token?.token);
      assert.ok(token?.expiresOnTimestamp! > Date.now());
    },
  );

  it.skipIf(isLiveMode() || isPlaybackMode())(
    "allows cancelling the authentication",
    async function () {
      // Because of the user interaction, this test works inconsistently in our live test pipelines.
      // On playback we can't quite control the time needed to trigger this error.
      const credential = new DeviceCodeCredential(
        recorder.configureClientOptions({
          tenantId: env.AZURE_TENANT_ID,
          clientId: env.AZURE_CLIENT_ID,
        }),
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
    },
  );

  it.skipIf(isLiveMode())("allows setting disableAutomaticAuthentication", async function () {
    // These tests should not run live because this credential requires user interaction.
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        disableAutomaticAuthentication: true,
      }),
    );

    let error: AbortError | undefined;
    try {
      await credential.getToken(scope);
    } catch (e: any) {
      error = e;
    }
    assert.equal(
      error?.message,
      `Automatic authentication has been disabled. You may call the authentication() method.`,
    );

    const account = await credential.authenticate(scope);
    assert.ok(account);
  });

  it.skipIf(isLiveMode())("supports tracing", async function () {
    // These tests should not run live because this credential requires user interaction.
    await expect(async (tracingOptions: any) => {
      const credential = new DeviceCodeCredential(
        recorder.configureClientOptions({
          tenantId: env.AZURE_TENANT_ID,
          clientId: env.AZURE_CLIENT_ID,
        }),
      );
      await credential.getToken(scope, tracingOptions);
    }).toSupportTracing(["DeviceCodeCredential.getToken"]);
  });
});
