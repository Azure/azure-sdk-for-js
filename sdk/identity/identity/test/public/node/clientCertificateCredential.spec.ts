// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import * as path from "path";
import { assert } from "chai";
import { AbortController } from "@azure/abort-controller";
import { env, isPlaybackMode, delay, isLiveMode } from "@azure-tools/test-recorder";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { ClientCertificateCredential } from "../../../src";
import { Context } from "mocha";
import { readFileSync } from "fs";

const ASSET_PATH = "assets";

describe("ClientCertificateCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const certificatePath = path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function(this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }

    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      certificatePath
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with a PEM certificate string directly", async function(this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }

    const credential = new ClientCertificateCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, {
      certificate: readFileSync(certificatePath, { encoding: "utf-8" })
    });

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with sendCertificateChain", async function(this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }

    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      { certificatePath },
      { sendCertificateChain: true }
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function() {
    const credential = new ClientCertificateCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, {
      certificatePath
    });

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal
    });

    await delay(5);
    controller.abort();

    let error: Error | undefined;
    try {
      await getTokenPromise;
    } catch (e) {
      error = e;
    }
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.ok(error?.message.includes("could not resolve endpoints"));
  });

  it("supports tracing", async function(this: Context) {
    if (isLiveMode()) {
      // Live test run not supported on CI at the moment. Locally should work though.
      this.skip();
    }
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }
    await testTracing({
      test: async (tracingOptions) => {
        const credential = new ClientCertificateCredential(
          env.AZURE_TENANT_ID,
          env.AZURE_CLIENT_ID,
          { certificatePath }
        );

        await credential.getToken(scope, {
          tracingOptions
        });
      },
      children: [
        {
          name: "ClientCertificateCredential.getToken",
          children: []
        }
      ]
    });
  });
});
