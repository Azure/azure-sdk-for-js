// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { AzureLogger, setLogLevel } from "@azure/logger";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { PublicClientApplication } from "@azure/msal-node";
import { UsernamePasswordCredential } from "@azure/identity";
import { getUsernamePasswordStaticResources } from "../../msalTestUtils.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";

describe("UsernamePasswordCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: MockInstance<typeof PublicClientApplication.prototype.acquireTokenSilent>;
  let doGetTokenSpy: MockInstance<
    typeof PublicClientApplication.prototype.acquireTokenByUsernamePassword
  >;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // MsalClient calls to this method underneath when silent authentication can be attempted.
    getTokenSilentSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenSilent");

    // MsalClient calls to this method underneath for interactive auth.
    doGetTokenSpy = vi.spyOn(PublicClientApplication.prototype, "acquireTokenByUsernamePassword");
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

  it("Authenticates silently after the initial request", async function () {
    const { clientId, password, tenantId, username } = getUsernamePasswordStaticResources();
    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      username,
      password,
      recorder.configureClientOptions({}),
    );

    await credential.getToken(scope);
    expect(doGetTokenSpy).toHaveBeenCalledOnce();

    await credential.getToken(scope);
    expect(
      getTokenSilentSpy,
      "getTokenSilentSpy.callCount should have been 1 (Silent authentication after the initial request).",
    ).toHaveBeenCalledOnce();
    expect(
      doGetTokenSpy,
      "Expected no additional calls to doGetTokenSpy after the initial request.",
    ).toHaveBeenCalledOnce();
  });

  it("Authenticates with tenantId on getToken", async function () {
    const { clientId, password, tenantId, username } = getUsernamePasswordStaticResources();
    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      username,
      password,
      recorder.configureClientOptions({}),
    );

    await credential.getToken(scope);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);
  });

  it.skipIf(isPlaybackMode())("authenticates (with allowLoggingAccountIdentifiers set to true)", async function () {
    const { clientId, password, tenantId, username } = getUsernamePasswordStaticResources();
    // The recorder clears the access tokens.
    const credential = new UsernamePasswordCredential(tenantId, clientId, username, password, {
      loggingOptions: { allowLoggingAccountIdentifiers: true },
    });
    setLogLevel("info");
    const spy = vi.spyOn(process.stderr, "write");

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
    const expectedArgument = spy.mock.calls[spy.mock.calls.length - 2][0];
    expect(expectedArgument).toBeDefined();
    const expectedMessage = `azure:identity:info [Authenticated account] Client ID: ${clientId}. Tenant ID: ${tenantId}. User Principal Name: HIDDEN. Object ID (user): HIDDEN`;
    assert.equal(
      expectedArgument
        .toString()
        .replace(/User Principal Name: [^ ]+. /g, "User Principal Name: HIDDEN. ")
        .replace(
          /Object ID .user.: [a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/g,
          "Object ID (user): HIDDEN",
        )
        .trim(),
      expectedMessage,
    );
    AzureLogger.destroy();
  });
});
