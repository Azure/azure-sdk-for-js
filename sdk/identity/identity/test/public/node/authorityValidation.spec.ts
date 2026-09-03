// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import { isLiveMode, type Recorder } from "@azure-tools/test-recorder";
import { AzurePipelinesCredential } from "@azure/identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("AuthorityValidation", function () {
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

  it.skipIf(!isLiveMode() || !process.env.AZURE_SERVICE_CONNECTION_ID)(
    "disabled and authenticates",
    async function () {
      const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
      const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
      const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN!;
      const tenantId = process.env.AZURE_SERVICE_CONNECTION_TENANT_ID!;

      const credential = new AzurePipelinesCredential(
        tenantId,
        clientId,
        existingServiceConnectionId,
        systemAccessToken,
        recorder.configureClientOptions({ disableInstanceDiscovery: true }),
      );
      const token = await credential.getToken(scope);

      assert.isDefined(token?.token);
      assert.isNotNaN(token?.expiresOnTimestamp);
      assert.isNotNull(token?.expiresOnTimestamp);
      assert.isTrue(token?.expiresOnTimestamp > Date.now());
    },
  );
});
