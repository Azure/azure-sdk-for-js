// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import { Context } from "mocha";
import { GetTokenOptions } from "@azure/core-auth";
import { env, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { PublicClientApplication } from "@azure/msal-node";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";

describe("UsernamePasswordCredential (internal)", function () {
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
      PublicClientApplication.prototype,
      "acquireTokenByUsernamePassword"
    );
  });

  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new UsernamePasswordCredential(
        undefined as any,
        env.AZURE_CLIENT_ID!,
        env.AZURE_USERNAME!,
        env.AZURE_PASSWORD!
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID!,
        undefined as any,
        env.AZURE_USERNAME!,
        env.AZURE_PASSWORD!
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        undefined as any,
        env.AZURE_PASSWORD!
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID!,
        env.AZURE_CLIENT_ID!,
        env.AZURE_USERNAME!,
        undefined as any
      );
    } catch (e) {
      errors.push(e);
    }

    try {
      new UsernamePasswordCredential(
        undefined as any,
        undefined as any,
        undefined as any,
        undefined as any
      );
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 5);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "UsernamePasswordCredential: tenantId, clientId, username and password are required parameters. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot."
      );
    });
  });

  // This is not the way to test persistence with acquireTokenByClientCredential,
  // since acquireTokenByClientCredential caches at the method level, and not with the same cache used for acquireTokenSilent.
  // I'm leaving this here so I can remember about this in the future.
  it.skip("Authenticates silently after the initial request", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_USERNAME!,
      env.AZURE_PASSWORD!
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  it("Authenticates with tenantId on getToken", async function (this: Context) {
    const credential = new UsernamePasswordCredential(
      env.AZURE_IDENTITY_TEST_TENANTID || env.AZURE_TENANT_ID!,
      env.AZURE_IDENTITY_TEST_CLIENTID || env.AZURE_CLIENT_ID!,
      env.AZURE_IDENTITY_TEST_USERNAME || env.AZURE_USERNAME!,
      env.AZURE_IDENTITY_TEST_PASSWORD || env.AZURE_PASSWORD!,
      recorder.configureClientOptions({})
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID } as GetTokenOptions);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);
  });
});
