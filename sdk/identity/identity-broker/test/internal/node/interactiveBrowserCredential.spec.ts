// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";
import { PublicClientApplication } from "@azure/msal-node";
import { Recorder, isLiveMode, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { nativeBrokerPlugin } from "../../../src/index.js";
import { isNodeLike } from "@azure/core-util";
import type http from "node:http";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("InteractiveBrowserCredential (internal)", () => {
  let listen: http.Server | undefined;
  let doGetTokenSpy: MockInstance;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    doGetTokenSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenInteractive");
    recorder = new Recorder(ctx);
  });

  afterEach(async () => {
    if (listen) {
      listen.close();
    }

    vi.restoreAllMocks();
  });

  // This test is skipped because:
  // - OSX asks for passwords on CI, so we need to skip on non-Windows platforms
  // - The test requires user interaction, so it cannot run in live mode
  // - The test with broker is hanging, so it's skipped in playback mode for CI
  it.skip("Throws error when no plugin is imported", async () => {
    const winHandle = Buffer.from("srefleqr93285329lskadjffa");
    const interactiveBrowserCredentialOptions: InteractiveBrowserCredentialNodeOptions = {
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: winHandle,
      },
    };
    assert.throws(() => {
      new InteractiveBrowserCredential(
        recorder.configureClientOptions(interactiveBrowserCredentialOptions),
      );
    }, "Broker for WAM was requested to be enabled, but no native broker was configured.");
  });
  // This test is skipped because:
  // - OSX asks for passwords on CI, so we need to skip on non-Windows platforms
  // - The test requires user interaction, so it cannot run in live mode
  // - The test with broker is hanging, so it's skipped in playback mode for CI
  it.skip("Accepts interactiveBrowserCredentialOptions", async () => {
    useIdentityPlugin(nativeBrokerPlugin);
    const winHandle = Buffer.from("srefleqr93285329lskadjffa");
    const interactiveBrowserCredentialOptions: InteractiveBrowserCredentialNodeOptions = {
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: winHandle,
      },
    };
    const scope = "https://graph.microsoft.com/.default";

    const credential = new InteractiveBrowserCredential(
      recorder.configureClientOptions(interactiveBrowserCredentialOptions),
    );

    try {
      const accessToken = await credential.getToken(scope);
      assert.exists(accessToken.token);
      expect(doGetTokenSpy).toHaveBeenCalledOnce();
      expect(doGetTokenSpy.mock.results[0].value).toEqual(
        expect.objectContaining({ fromNativeBroker: true }),
      );
    } catch (e) {
      console.log(e);
      expect(doGetTokenSpy).toHaveBeenCalledOnce();
    }
  });
});
