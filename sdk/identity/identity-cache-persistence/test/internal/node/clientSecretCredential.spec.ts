// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCachePersistenceOptions } from "@azure/identity";
import { ClientSecretCredential } from "@azure/identity";
import { msalNodeTestSetup, type MsalTestCleanup } from "./msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { createPersistence } from "./setup.spec.js";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const scope = "https://graph.microsoft.com/.default";

describe("ClientSecretCredential (internal)", () => {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: MockInstance;
  let doGetTokenSpy: MockInstance;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    getTokenSilentSpy = vi.spyOn(ConfidentialClientApplication.prototype, "acquireTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = vi.spyOn(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential",
    );
  });
  afterEach(async () => {
    await cleanup();
  });

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

    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({ tokenCachePersistenceOptions }),
    );

    await credential.getToken(scope);
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);
  });

  // TODO:
  // MSAL reports that they don't use silent authentication
  // on Client Certificate requests because the responses
  // don't have id_token, meaning they don't receive
  // the account information used to keep the cache.
  // MSAL reports that they handle caching in this case within
  // the acquireTokenByClientCredential method.
  // Can we test this?
  // What do other languages do?
  it.skip("Authenticates silently with tokenCachePersistenceOptions", async (ctx) => {
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

    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({ tokenCachePersistenceOptions }),
    );

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(1);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(1);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);
  });
});
