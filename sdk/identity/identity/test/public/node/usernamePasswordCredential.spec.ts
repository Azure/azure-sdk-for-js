// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";

import type { Context } from "mocha";
import { UsernamePasswordCredential } from "../../../src";
import { assert } from "@azure-tools/test-utils";
import { getUsernamePasswordStaticResources } from "../../msalTestUtils";

describe("UsernamePasswordCredential", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function (this: Context) {
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

  it("supports tracing", async function (this: Context) {
    const { clientId, tenantId, username, password } = getUsernamePasswordStaticResources();

    await assert.supportsTracing(
      async (tracingOptions) => {
        const credential = new UsernamePasswordCredential(
          tenantId,
          clientId,
          username,
          password,
          recorder.configureClientOptions({}),
        );

        await credential.getToken(scope, tracingOptions);
      },
      ["UsernamePasswordCredential.getToken"],
    );
  });
});
