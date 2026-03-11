// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets a private link resource for PostgreSQL server", () => {
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

  it("should gets a private link resource for PostgreSQL server for getsAPrivateLinkResourceForPostgreSQL", async function () {
    const result = await client.privateLinkResources.get(
      "exampleresourcegroup",
      "exampleserver",
      "exampleprivatelink",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampleprivatelink");
    assert.strictEqual(
      result.type,
      "Microsoft.DBforPostgreSQL/flexibleServers/privateLinkResources",
    );
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/privateLinkResources/exampleprivatelink",
    );
    assert.strictEqual(result.groupId, "postgresqlServer");
    assert.ok(Array.isArray(result.requiredMembers));
    assert.strictEqual(result.requiredMembers.length, 1);
    assert.ok(Array.isArray(result.requiredZoneNames));
    assert.strictEqual(result.requiredZoneNames.length, 1);
  });
});
