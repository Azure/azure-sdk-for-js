// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import { GetTokenOptions } from "@azure/core-auth";
import { AbortController } from "@azure/abort-controller";
import { env, delay, isPlaybackMode, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientSecretCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { Context } from "mocha";
import { AzureLogger, setLogLevel } from "@azure/logger";

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

  it("Authenticates with tenantId on getToken", async function (this: Context) {
    // The live environment isn't ready for this test
    if (isLiveMode()) {
      this.skip();
    }
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

  it("authenticates (with allowLoggingAccountIdentifiers set to true)", async function (this: Context) {
    if (isLiveMode() || isPlaybackMode()) {
      // The recorder clears the access tokens.
      this.skip();
    }
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({
        loggingOptions: { allowLoggingAccountIdentifiers: true },
      })
    );
    setLogLevel("info");
    const spy = Sinon.spy(process.stderr, "write");

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    const expectedCall = spy
      .getCalls()
      .find((x) => (x.args[0] as any as string).match(/Authenticated account/));
    assert.ok(expectedCall);
    const expectedMessage = `azure:identity:info [Authenticated account] Client ID: ${env.AZURE_CLIENT_ID}. Tenant ID: ${env.AZURE_TENANT_ID}. User Principal Name: No User Principal Name available. Object ID (user): HIDDEN`;
    assert.equal(
      (expectedCall!.args[0] as any as string)
        .replace(
          /Object ID .user.: [a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/g,
          "Object ID (user): HIDDEN"
        )
        .trim(),
      expectedMessage
    );
    spy.restore();
    AzureLogger.destroy();
  });
});
