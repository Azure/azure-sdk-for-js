// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import path from "node:path";

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay, env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";

import { ClientCertificateCredential, type GetTokenOptions } from "@azure/identity";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import fs from "node:fs";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

const ASSET_PATH = "assets";

describe("ClientCertificateCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach.skipIf(isLiveMode())(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
    await recorder.setMatcher("BodilessMatcher");
    // https://github.com/Azure/azure-sdk-for-js/issues/29929
  });
  afterEach(async function () {
    await cleanup();
  });

  const certificatePath = env.IDENTITY_SP_CERT_PEM || path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function () {
    const credential = new ClientCertificateCredential(
      env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
      env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
      env.IDENTITY_SP_CERT_PEM || certificatePath!,
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken(scope);
    assert.isDefined(token?.token);
    assert.isTrue(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with a PEM certificate string directly", async function () {
    const credential = new ClientCertificateCredential(
      env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
      env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
      {
        certificate:
          env.IDENTITY_PEM_CONTENTS || fs.readFileSync(certificatePath, { encoding: "utf-8" }),
      },
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken(scope);
    assert.isDefined(token?.token);
    assert.isTrue(token?.expiresOnTimestamp! > Date.now());
  });

  it.skipIf(!fs.existsSync(certificatePath))(
    "allows cancelling the authentication",
    async function () {
      // In min-max tests, the certificate file can't be found.
      if (!fs.existsSync(certificatePath)) {
        console.log("Failed to locate the certificate file. Skipping.");
      }
      const credential = new ClientCertificateCredential(
        env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
        env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
        certificatePath,
        recorder.configureClientOptions({
          authorityHost: "https://fake-authority.com",
          httpClient: {
            async sendRequest(): Promise<PipelineResponse> {
              await delay(100);
              throw new Error("Fake HTTP client.");
            },
          },
        }),
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
      } catch (e: any) {
        error = e;
      }
      assert.equal(error?.name, "CredentialUnavailableError");
      assert.isTrue(error?.message.includes("endpoints_resolution_error"));
    },
  );

  it.skipIf(isPlaybackMode())("supports tracing", async function () {
    // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
    // This assertion could be provided as parameters, but we don't have that in the public API yet,
    // and I'm trying to avoid having to generate one ourselves.
    await expect(async (tracingOptions: GetTokenOptions) => {
      const credential = new ClientCertificateCredential(
        env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!,
        env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!,
        recorder.configureClientOptions({ certificatePath }),
      );
      await credential.getToken(scope, tracingOptions);
    }).toSupportTracing(["ClientCertificateCredential.getToken"]);
  });
});
