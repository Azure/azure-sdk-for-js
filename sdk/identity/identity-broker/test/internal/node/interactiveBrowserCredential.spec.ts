// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";
import { PublicClientApplication } from "@azure/msal-node";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { nativeBrokerPlugin } from "../../../src/index.js";
import { isNodeLike } from "@azure/core-util";
import type http from "node:http";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("InteractiveBrowserCredential (internal)", function () {
  let listen: http.Server | undefined;
  let doGetTokenSpy: MockInstance;
  let recorder: Recorder;

  beforeEach(async function () {
    doGetTokenSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenInteractive");
  });

  afterEach(async function () {
    if (listen) {
      listen.close();
    }

    vi.restoreAllMocks();
  });

  it("Throws error when no plugin is imported", async function (ctx) {
    if (isNodeLike) {
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform !== "win32") {
        ctx.skip();
      }
      // These tests should not run live because this credential requires user interaction.
      // currently test with broker is hanging, so skipping in playback mode for the ci
      if (isLiveMode() || isPlaybackMode()) {
        ctx.skip();
      }
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
    } else {
      ctx.skip();
    }
  });
  it("Accepts interactiveBrowserCredentialOptions", async function (ctx) {
    if (isNodeLike) {
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform !== "win32") {
        ctx.skip();
      }
      // These tests should not run live because this credential requires user interaction.
      // currently test with broker is hanging, so skipping in playback mode for the ci
      if (isLiveMode() || isPlaybackMode()) {
        ctx.skip();
      }
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
    } else {
      ctx.skip();
    }
  });
});
