// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { Recorder, env } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "../../../src";
import { Context } from "mocha";
import { assert } from "@azure/test-utils";

describe("AuthorityValidation", function () {
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

  it("disabled and authenticates", async function () {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!,
      recorder.configureClientOptions({ disableInstanceDiscovery: true })
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.isNotNaN(token?.expiresOnTimestamp);
    assert.isNotNull(token?.expiresOnTimestamp);
    assert.ok(token?.expiresOnTimestamp > Date.now());
  });
});
