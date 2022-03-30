// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import * as path from "path";
import fs from "fs";
import { assert } from "chai";
import { AbortController } from "@azure/abort-controller";
import { env, isPlaybackMode, delay, Recorder } from "@azure-tools/test-recorder";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { ClientCertificateCredential } from "../../../src";
import { Context } from "mocha";
import { readFileSync } from "fs";
import { PipelineResponse } from "@azure/core-rest-pipeline";

const ASSET_PATH = "assets";

describe("ClientCertificateCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
    await recorder.setMatcher("BodilessMatcher");
  });
  afterEach(async function () {
    await cleanup();
  });

  const certificatePath = env.IDENTITY_SP_CERT_PEM || path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function (this: Context) {
    const credential = new ClientCertificateCredential(
      env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
      env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
      env.IDENTITY_SP_CERT_PEM || certificatePath!,
      recorder.configureClientOptions({})
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with a PEM certificate string directly", async function (this: Context) {
    const credential = new ClientCertificateCredential(
      env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
      env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
      {
        certificate:
          env.IDENTITY_PEM_CONTENTS || readFileSync(certificatePath, { encoding: "utf-8" }),
      },
      recorder.configureClientOptions({})
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with sendCertificateChain", async function (this: Context) {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }

    const credential = new ClientCertificateCredential(
      env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
      env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
      recorder.configureClientOptions({
        certificatePath: env.IDENTITY_SP_CERT_SNI_PEM || certificatePath,
      }),
      { sendCertificateChain: true }
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function (this: Context) {
    if (!fs.existsSync(certificatePath)) {
      // In min-max tests, the certificate file can't be found.
      console.log("Failed to locate the certificate file. Skipping.");
      this.skip();
    }
    const credential = new ClientCertificateCredential(
      env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
      env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
      certificatePath,
      recorder.configureClientOptions({
        httpClient: {
          async sendRequest(): Promise<PipelineResponse> {
            await delay(100);
            throw new Error("Fake HTTP client.");
          },
        },
      })
    );

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal,
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

  it("supports tracing", async function (this: Context) {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }
    await testTracing({
      test: async (tracingOptions) => {
        const credential = new ClientCertificateCredential(
          env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
          env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
          recorder.configureClientOptions({ certificatePath })
        );

        await credential.getToken(scope, {
          tracingOptions,
        });
      },
      children: [
        {
          name: "ClientCertificateCredential.getToken",
          children: [],
        },
      ],
    });
  });
});
