// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { DeviceCodeCredential, type TokenCachePersistenceOptions } from "@azure/identity";
import { msalNodeTestSetup, type MsalTestCleanup } from "./msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { PublicClientApplication } from "@azure/msal-node";
import { createPersistence } from "./setup.spec.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import type { MockInstance } from "vitest";

describe("DeviceCodeCredential (internal)", () => {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: MockInstance;
  let doGetTokenSpy: MockInstance;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    getTokenSilentSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenByDeviceCode");
  });

  afterEach(async () => {
    await cleanup();
  });

  const scope = "https://graph.microsoft.com/.default";

  it("Accepts tokenCachePersistenceOptions", async (ctx) => {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      ctx.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      ctx.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tokenCachePersistenceOptions,
      }),
    );

    await credential.getToken(scope);
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);
  });

  it("Authenticates silently with tokenCachePersistenceOptions", async (ctx) => {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      ctx.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      ctx.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tokenCachePersistenceOptions,
      }),
    );

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(1);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(2);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);
  });

  it("allows passing an authenticationRecord to avoid further manual authentications", async (ctx) => {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      ctx.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      ctx.skip();
    }
    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        // To be able to re-use the account, the Token Cache must also have been provided.
        // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
        tokenCachePersistenceOptions,
      }),
    );

    const account = await credential.authenticate(scope);
    assert.ok(account);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(1);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);

    const credential2 = new DeviceCodeCredential(
      recorder.configureClientOptions({
        authenticationRecord: account,
        // To be able to re-use the account, the Token Cache must also have been provided.
        // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
        tokenCachePersistenceOptions,
      }),
    );

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    const token = await credential2.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(2);

    // Resolved with issue - https://github.com/Azure/azure-sdk-for-js/issues/24349
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);
  });
});
