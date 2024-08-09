// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { AzureLogger, setLogLevel } from "@azure/logger";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";

import { Context } from "mocha";
import { PublicClientApplication } from "@azure/msal-node";
import Sinon from "sinon";
import { UsernamePasswordCredential } from "../../../src";
import { assert } from "chai";
import { getUsernamePasswordStaticResources } from "../../msalTestUtils";

describe("UsernamePasswordCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // MsalClient calls to this method underneath when silent authentication can be attempted.
    getTokenSilentSpy = setup.sandbox.spy(PublicClientApplication.prototype, "acquireTokenSilent");

    // MsalClient calls to this method underneath for interactive auth.
    doGetTokenSpy = setup.sandbox.spy(
      PublicClientApplication.prototype,
      "acquireTokenByUsernamePassword",
    );
  });

  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function () {
    assert.throws(
      () => new UsernamePasswordCredential("", "clientId", "username", "password"),
      /tenantId is a required parameter/,
    );
    assert.throws(
      () => new UsernamePasswordCredential("tenantId", "", "username", "password"),
      /clientId is a required parameter/,
    );
    assert.throws(
      () => new UsernamePasswordCredential("tenantId", "clientId", "", "password"),
      /username is a required parameter/,
    );
    assert.throws(
      () => new UsernamePasswordCredential("tenantId", "clientId", "username", ""),
      /password is a required parameter/,
    );
  });

  it("Authenticates silently after the initial request", async function (this: Context) {
    const { clientId, password, tenantId, username } = getUsernamePasswordStaticResources();
    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      username,
      password,
      recorder.configureClientOptions({}),
    );

    await credential.getToken(scope);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(
      getTokenSilentSpy.callCount,
      1,
      "getTokenSilentSpy.callCount should have been 1 (Silent authentication after the initial request).",
    );
    assert.equal(
      doGetTokenSpy.callCount,
      1,
      "Expected no additional calls to doGetTokenSpy after the initial request.",
    );
  });

  it("Authenticates with tenantId on getToken", async function (this: Context) {
    const { clientId, password, tenantId, username } = getUsernamePasswordStaticResources();
    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      username,
      password,
      recorder.configureClientOptions({}),
    );

    await credential.getToken(scope);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  it("authenticates (with allowLoggingAccountIdentifiers set to true)", async function (this: Context) {
    const { clientId, password, tenantId, username } = getUsernamePasswordStaticResources();
    if (isPlaybackMode()) {
      // The recorder clears the access tokens.
      this.skip();
    }
    const credential = new UsernamePasswordCredential(tenantId, clientId, username, password, {
      loggingOptions: { allowLoggingAccountIdentifiers: true },
    });
    setLogLevel("info");
    const spy = Sinon.spy(process.stderr, "write");

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    assert.ok(spy.getCall(spy.callCount - 2).args[0]);
    const expectedMessage = `azure:identity:info [Authenticated account] Client ID: ${clientId}. Tenant ID: ${tenantId}. User Principal Name: HIDDEN. Object ID (user): HIDDEN`;
    assert.equal(
      (spy.getCall(spy.callCount - 2).args[0] as any as string)
        .replace(/User Principal Name: [^ ]+. /g, "User Principal Name: HIDDEN. ")
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
