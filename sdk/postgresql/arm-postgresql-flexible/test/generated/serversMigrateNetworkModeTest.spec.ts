// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("migrates the network configuration of a PostgreSQL flexible server from customer owned VNET to Microsoft owned VNET with support for private endpoints, or from Microsoft owned VNET with no support for private endpoints to Microsoft owned VNET with support for private endpoints", () => {
  let recorder: Recorder;
  let client: PostgreSQLManagementFlexibleServerClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new PostgreSQLManagementFlexibleServerClient(
      credential,
      subscriptionId,
      clientOptions,
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should migrates the network configuration of a PostgreSQL flexible server from customer owned VNET to Microsoft owned VNET with support for private endpoints, or from Microsoft owned VNET with no support for private endpoints to Microsoft owned VNET with support for private endpoints for migrateServerNetworkConfiguration", async function () {
    const result = await client.servers.migrateNetworkMode("exampleresourcegroup", "exampleserver");
    assert.ok(result);
    assert.strictEqual(result.subscriptionId, "ffffffff-ffff-ffff-ffff-ffffffffffff");
    assert.strictEqual(result.resourceGroupName, "exampleresourcegroup");
    assert.strictEqual(result.serverName, "exampleserver");
  });
});
