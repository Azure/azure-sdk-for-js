// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import { GetTokenOptions } from "@azure/core-auth";
import { AbortController } from "@azure/abort-controller";
import { env, delay, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientSecretCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { Context } from "mocha";

describe("ClientSecretCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    );
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new ClientSecretCredential(undefined as any, env.AZURE_CLIENT_ID!, env.AZURE_CLIENT_SECRET!);
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientSecretCredential(env.AZURE_TENANT_ID!, undefined as any, env.AZURE_CLIENT_SECRET!);
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientSecretCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientSecretCredential(undefined as any, undefined as any, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientSecretCredential: tenantId, clientId, and clientSecret are required parameters. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot."
      );
    });
  });

  // This is not the way to test persistence with acquireTokenByClientCredential,
  // since acquireTokenByClientCredential caches at the method level, and not with the same cache used for acquireTokenSilent.
  // I'm leaving this here so I can remember about this in the future.
  it.skip("Authenticates silently after the initial request", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );

    const { token: firstToken } = await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    const { token: secondToken } = await credential.getToken(scope);
    assert.strictEqual(firstToken, secondToken);
    assert.equal(getTokenSilentSpy.callCount, 2);

    assert.equal(doGetTokenSpy.callCount, 1);
  });

  it("Authenticates with tenantId on getToken", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({})
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID } as GetTokenOptions);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  // This test can only run on playback mode since we're manually changing the recordings to match the authorityHost
  it("Authenticates with authorityHost with validation disabled", async function () {
    if (!isPlaybackMode()) {
      this.skip();
    }
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({
        authorityHost: "https://private.host/path",
        disableAuthorityValidation: true,
      })
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID } as GetTokenOptions);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  // TODO: Enable again once we're ready to release this feature.
  it.skip("supports specifying the regional authority", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      {
        // TODO: Uncomment once we're ready to release this feature.
        // regionalAuthority: RegionalAuthority.AutoDiscoverRegion
      }
    );

    // We'll abort since we only want to ensure the parameters are sent appropriately.
    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal,
    });
    await delay(5);
    controller.abort();
    try {
      await getTokenPromise;
    } catch (e) {
      // Nothing to do here.
    }

    assert.equal(doGetTokenSpy.getCall(0).args[0].azureRegion, "AUTO_DISCOVER");
  });
});
