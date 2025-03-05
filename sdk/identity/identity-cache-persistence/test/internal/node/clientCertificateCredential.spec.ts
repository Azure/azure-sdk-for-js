// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import type { TokenCachePersistenceOptions } from "@azure/identity";
import { ClientCertificateCredential } from "@azure/identity";
import type { MsalTestCleanup } from "./msalNodeTestSetup.js";
import { msalNodeTestSetup } from "./msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { createPersistence } from "./setup.spec.js";
import type { MockInstance } from "vitest";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const ASSET_PATH = "assets";

describe("ClientCertificateCredential (internal)", () => {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: MockInstance;
  let doGetTokenSpy: MockInstance;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    getTokenSilentSpy = vi.spyOn(ConfidentialClientApplication.prototype, "acquireTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = vi.spyOn(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential",
    );
  });

  afterEach(async () => {
    await cleanup();
  });

  // We use AZURE_CLIENT_CERTIFICATE_PATH if it is defined, and otherwise we will use the dummy cert
  const certificatePath =
    process.env.AZURE_CLIENT_CERTIFICATE_PATH ?? path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://graph.microsoft.com/.default";

  it("Accepts tokenCachePersistenceOptions", async (ctx) => {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      ctx.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      ctx.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      certificatePath,
      recorder.configureClientOptions({ tokenCachePersistenceOptions }),
    );

    await credential.getToken(scope);
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);
  });

  it("Authenticates silently with tokenCachePersistenceOptions", async (ctx) => {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      ctx.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      ctx.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: ctx.task.name.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true,
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    await persistence?.save("{}");

    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      certificatePath,
      recorder.configureClientOptions({ tokenCachePersistenceOptions }),
    );

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(1);
    expect(doGetTokenSpy).toHaveBeenCalledTimes(1);

    await credential.getToken(scope);
    expect(getTokenSilentSpy).toHaveBeenCalledTimes(2);

    // Even though we're providing a file persistence cache,
    // The Client Credential flow does not return the account information from the authentication service,
    // so each time getToken gets called, we will have to acquire a new token through the service.
    // MSAL also doesn't store the account in the cache (getAllAccounts returns an empty array).
    expect(doGetTokenSpy).toHaveBeenCalledTimes(2);
  });
});
