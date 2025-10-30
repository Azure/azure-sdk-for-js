// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay, env } from "@azure-tools/test-recorder";

import { ClientSecretCredential, type GetTokenOptions } from "@azure/identity";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

describe("ClientSecretCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;
  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
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
    assert.isDefined(token?.token);
    assert.isTrue(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates when cae enabled", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken(scope, { enableCae: true });
    assert.isDefined(token?.token);
    assert.isTrue(token?.expiresOnTimestamp! > Date.now());
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
    assert.isTrue(error?.message.includes("endpoints_resolution_error"));
  });

  it("supports tracing", async () => {
    await expect(async (tracingOptions: GetTokenOptions) => {
      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        env.AZURE_CLIENT_SECRET!,
        recorder.configureClientOptions({}),
      );
      await credential.getToken(scope, tracingOptions);
    }).toSupportTracing(["ClientSecretCredential.getToken"]);
  });
});
