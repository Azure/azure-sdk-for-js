// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { AzureLogger, setLogLevel } from "@azure/logger";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, delay, env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";

import { ClientSecretCredential } from "../../../src";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Context } from "mocha";
import { GetTokenOptions } from "@azure/core-auth";
import Sinon from "sinon";
import { assert } from "chai";

describe("ClientSecretCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential",
    );
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function () {
    assert.throws(
      () => new ClientSecretCredential("", "clientId", "clientSecret"),
      /tenantId is a required parameter/,
    );
    assert.throws(
      () => new ClientSecretCredential("tenantId", "", "clientSecret"),
      /clientId is a required parameter/,
    );
    assert.throws(
      () => new ClientSecretCredential("tenantId", "clientId", ""),
      /clientSecret is a required parameter/,
    );
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
      recorder.configureClientOptions({}),
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID } as GetTokenOptions);
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
      },
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
    } catch (e: any) {
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
      }),
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
          "Object ID (user): HIDDEN",
        )
        .trim(),
      expectedMessage,
    );
    spy.restore();
    AzureLogger.destroy();
  });
});
