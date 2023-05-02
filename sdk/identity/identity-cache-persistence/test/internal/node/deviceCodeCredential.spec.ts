// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable sort-imports */

import { DeviceCodeCredential, TokenCachePersistenceOptions } from "../../../../identity/src";
import {
  MsalTestCleanup,
  msalNodeTestSetup,
} from "../../../../identity/test/node/msalNodeTestSetup";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { createPersistence } from "./setup.spec";
import { MsalNode } from "../../../../identity/src/msal/nodeFlows/msalNodeCommon";
import { PublicClientApplication } from "@azure/msal-node";
import Sinon from "sinon";
import assert from "assert";

describe("DeviceCodeCredential (internal)", function (this: Mocha.Suite) {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Mocha.Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      PublicClientApplication.prototype,
      "acquireTokenByDeviceCode"
    );
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://graph.microsoft.com/.default";

  it("Accepts tokenCachePersistenceOptions", async function (this: Mocha.Context) {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tokenCachePersistenceOptions,
      })
    );

    await credential.getToken(scope);
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);
  });

  it("Authenticates silently with tokenCachePersistenceOptions", async function (this: Mocha.Context) {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tokenCachePersistenceOptions,
      })
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  it("allows passing an authenticationRecord to avoid further manual authentications", async function (this: Mocha.Context) {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        // To be able to re-use the account, the Token Cache must also have been provided.
        // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
        tokenCachePersistenceOptions,
      })
    );

    const account = await credential.authenticate(scope);
    assert.ok(account);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    const credential2 = new DeviceCodeCredential(
      recorder.configureClientOptions({
        authenticationRecord: account,
        // To be able to re-use the account, the Token Cache must also have been provided.
        // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
        tokenCachePersistenceOptions,
      })
    );

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    const token = await credential2.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    assert.equal(getTokenSilentSpy.callCount, 2);

    // Resolved with issue - https://github.com/Azure/azure-sdk-for-js/issues/24349
    assert.equal(doGetTokenSpy.callCount, 1);
  });
});
