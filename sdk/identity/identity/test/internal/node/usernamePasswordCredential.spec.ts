// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import { env, isLiveMode } from "@azure/test-utils-recorder";
import { PublicClientApplication } from "@azure/msal-node";
import {
  UsernamePasswordCredential,
  TokenCachePersistenceOptions,
  deserializeAuthenticationRecord
} from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { TokenCachePersistence } from "../../../src/tokenCache/TokenCachePersistence";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import {
  isNode15,
  isNode8,
  Node15NotSupportedError,
  Node8NotSupportedError
} from "../../../src/tokenCache/nodeVersion";

describe("UsernamePasswordCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function() {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      PublicClientApplication.prototype,
      "acquireTokenByUsernamePassword"
    );
  });

  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Authenticates silently after the initial request", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  it("Persistence throws on Node 8, as expected", async function() {
    if (!isNode8) {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);

    let error: Error | undefined;
    try {
      await tokenCache.getPersistence();
    } catch (e) {
      error = e;
    }

    assert.equal(error?.message, Node8NotSupportedError.message);
  });

  it("Persistence throws on Node 15, as expected", async function() {
    if (!isNode15) {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);

    let error: Error | undefined;
    try {
      await tokenCache.getPersistence();
    } catch (e) {
      error = e;
    }

    assert.equal(error?.message, Node15NotSupportedError.message);
  });

  it("Accepts tokenCachePersistenceOptions", async function() {
    // msal-node-extensions does not currently support Node 8.
    if (isNode8 || isNode15) {
      this.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
    const persistence = await tokenCache.getPersistence();
    persistence?.save("");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      { tokenCachePersistenceOptions }
    );

    await credential.getToken(scope);
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);
  });

  it("Authenticates silently with tokenCachePersistenceOptions", async function() {
    // msal-node-extensions does not currently support Node 8.
    if (isNode8 || isNode15) {
      this.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
    const persistence = await tokenCache.getPersistence();
    persistence?.save("");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      { tokenCachePersistenceOptions }
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

  it("allows passing an authenticationRecord to avoid further manual authentications", async function() {
    // msal-node-extensions does not currently support Node 8.
    if (isNode8 || isNode15) {
      this.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
    const persistence = await tokenCache.getPersistence();
    persistence?.save("");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      // To be able to re-use the account, the Token Cache must also have been provided.
      // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
      { tokenCachePersistenceOptions }
    );

    const account = await credential.authenticate(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);
    assert.equal(account?.tenantId, env.AZURE_TENANT_ID);

    const credential2 = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      // To be able to re-use the account, the Token Cache must also have been provided.
      // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
      { authenticationRecord: account, tokenCachePersistenceOptions }
    );

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    const token = await credential2.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });

  it("allows working with an authenticationRecord that is serialized", async function() {
    // msal-node-extensions does not currently support Node 8.
    if (isNode8 || isNode15) {
      this.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
    const persistence = await tokenCache.getPersistence();
    persistence?.save("");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      // To be able to re-use the account, the Token Cache must also have been provided.
      // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
      { tokenCachePersistenceOptions }
    );

    const account = await credential.authenticate(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);
    assert.equal(account?.tenantId, env.AZURE_TENANT_ID);

    const serializedAccount = account?.serialize()!;

    const credential2 = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      // To be able to re-use the account, the Token Cache must also have been provided.
      // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
      {
        authenticationRecord: deserializeAuthenticationRecord(serializedAccount),
        tokenCachePersistenceOptions
      }
    );

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    const token = await credential2.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });
});
