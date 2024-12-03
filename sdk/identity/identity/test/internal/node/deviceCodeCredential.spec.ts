// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { DeviceCodeCredential } from "@azure/identity";
import { PublicClientApplication } from "@azure/msal-node";
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";

describe("DeviceCodeCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: MockInstance<typeof PublicClientApplication.prototype.acquireTokenSilent>;
  let doGetTokenSpy: MockInstance<
    typeof PublicClientApplication.prototype.acquireTokenByDeviceCode
  >;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // MsalClient calls to this method underneath when silent authentication can be attempted.
    getTokenSilentSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenSilent");

    // MsalClient calls to this method underneath for interactive auth.
    doGetTokenSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenByDeviceCode");
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://graph.microsoft.com/.default";

  it("Authenticates silently after the initial request", async function (ctx) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      ctx.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      }),
    );

    await credential.getToken(scope);
    expect(doGetTokenSpy).toHaveBeenCalledOnce();

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledOnce();
    expect(
      doGetTokenSpy,
      "Expected no additional calls to doGetTokenSpy after the initial request.",
    ).toHaveBeenCalledOnce();
  });

  it("Authenticates with tenantId on getToken", async function (ctx) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      ctx.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      }),
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID });
    expect(doGetTokenSpy).toHaveBeenCalledOnce();
  });
});
