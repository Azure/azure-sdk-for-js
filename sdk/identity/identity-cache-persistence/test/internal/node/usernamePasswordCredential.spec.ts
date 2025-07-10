// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type { TokenCachePersistenceOptions } from "@azure/identity";
import { UsernamePasswordCredential } from "@azure/identity";
import { PublicClientApplication } from "@azure/msal-node";
import { createPersistence } from "./setup.spec.js";
import type { MsalTestCleanup } from "./msalNodeTestSetup.js";
import { msalNodeTestSetup } from "./msalNodeTestSetup.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import type { MockInstance } from "vitest";

describe("UsernamePasswordCredential (internal)", () => {
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
    doGetTokenSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenByUsernamePassword");
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

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_USERNAME!,
      env.AZURE_PASSWORD!,
      recorder.configureClientOptions({ tokenCachePersistenceOptions }),
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

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_USERNAME!,
      env.AZURE_PASSWORD!,
      recorder.configureClientOptions({ tokenCachePersistenceOptions }),
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
});
