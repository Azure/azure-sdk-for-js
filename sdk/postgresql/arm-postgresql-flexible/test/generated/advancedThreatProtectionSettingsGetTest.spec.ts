// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets state of advanced threat protection settings for a server", () => {
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

  it("should gets state of advanced threat protection settings for a server for getStateOfAdvancedThreatProtectionSettingsForAServer", async function () {
    const result = await client.advancedThreatProtectionSettings.get(
      "exampleresourcegroup",
      "exampleserver",
      "Default",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "Default");
    assert.strictEqual(
      result.type,
      "Microsoft.DBforPostgreSQL/flexibleServers/advancedThreatProtectionSettings",
    );
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/advancedThreatProtectionSettings/Default",
    );
    assert.strictEqual(
      result.creationTime.getTime(),
      new Date("2025-06-01T18:30:22.123456Z").getTime(),
    );
    assert.strictEqual(result.state, "Enabled");
  });
});
