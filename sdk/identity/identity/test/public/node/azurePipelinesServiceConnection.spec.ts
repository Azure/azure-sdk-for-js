// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzurePipelinesServiceConnectionCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "@azure/test-utils";

describe("AzurePipelinesServiceConnectionCredential", function () {
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

  const scope = "https://vault.azure.net/.default";
  const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;
  const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;

  it("authenticates with a valid service connection", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const credential = new AzurePipelinesServiceConnectionCredential(
      clientId,
      tenantId,
      "0dec29c2-a766-4121-9c2e-1894f5aca5cb"
    );
    try {
      const token = await credential.getToken(scope);
      assert.ok(token?.token);
      assert.isDefined(token?.expiresOnTimestamp);
      if (token?.expiresOnTimestamp) assert.ok(token?.expiresOnTimestamp > Date.now());
    } catch (e) {
      console.log(e);
    }
  });
});
