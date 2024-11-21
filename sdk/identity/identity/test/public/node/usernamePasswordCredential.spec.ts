// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import { type GetTokenOptions, UsernamePasswordCredential } from "@azure/identity";
import { getUsernamePasswordStaticResources } from "../../msalTestUtils.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

describe("UsernamePasswordCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function () {
    const { tenantId, clientId, username, password } = getUsernamePasswordStaticResources();

    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      username,
      password,
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function () {
    const { tenantId, clientId, username, password } = getUsernamePasswordStaticResources();

    const credential = new UsernamePasswordCredential(
      tenantId,
      clientId,
      username,
      password,
      recorder.configureClientOptions({
        authorityHost: "https://fake-authority.com",
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
    assert.ok(error?.message.includes("endpoints_resolution_error"));
  });

  it("supports tracing", async function () {
    const { clientId, tenantId, username, password } = getUsernamePasswordStaticResources();

    await expect(async (tracingOptions: GetTokenOptions) => {
      const credential = new UsernamePasswordCredential(
        tenantId,
        clientId,
        username,
        password,
        recorder.configureClientOptions({}),
      );
      await credential.getToken(scope, tracingOptions);
    }).toSupportTracing(["UsernamePasswordCredential.getToken"]);
  });
});
