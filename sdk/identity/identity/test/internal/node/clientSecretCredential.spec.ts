// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { AzureLogger, setLogLevel } from "@azure/logger";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";

import { ClientSecretCredential } from "@azure/identity";
import { ConfidentialClientApplication } from "@azure/msal-node";
import type { GetTokenOptions } from "@azure/core-auth";
import { describe, it, assert, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";

describe("ClientSecretCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let doGetTokenSpy: MockInstance<
    typeof ConfidentialClientApplication.prototype.acquireTokenByClientCredential
  >;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = vi.spyOn(
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

  it.skipIf(isLiveMode())("Authenticates with tenantId on getToken", async function () {
    // The live environment isn't ready for this test
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({}),
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID } as GetTokenOptions);
    expect(doGetTokenSpy).toHaveBeenCalledOnce();
  });

  it.skipIf(isLiveMode() || isPlaybackMode())("authenticates (with allowLoggingAccountIdentifiers set to true)", async function () {
    // The recorder clears the access tokens.
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({
        loggingOptions: { allowLoggingAccountIdentifiers: true },
      }),
    );
    setLogLevel("info");
    const spy = vi.spyOn(process.stderr, "write");

    const token = await credential.getToken(scope);
    assert.isDefined(token?.token);
    assert.isTrue(token?.expiresOnTimestamp! > Date.now());
    const expectedCall = spy.mock.calls.find((x) =>
      (x[0] as any as string).match(/Authenticated account/),
    );
    assert.exists(expectedCall);
    const expectedMessage = `azure:identity:info [Authenticated account] Client ID: ${env.AZURE_CLIENT_ID}. Tenant ID: ${env.AZURE_TENANT_ID}. User Principal Name: No User Principal Name available. Object ID (user): HIDDEN`;
    assert.equal(
      (expectedCall![0] as any as string)
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
