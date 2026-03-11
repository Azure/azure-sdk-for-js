// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about an existing database", () => {
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

  it("should gets information about an existing database for getInformationAboutAnExistingDatabase", async function () {
    const result = await client.databases.get(
      "exampleresourcegroup",
      "exampleserver",
      "exampledatabase",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "exampledatabase");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/databases");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/databases/exampledatabase",
    );
    assert.strictEqual(result.charset, "utf8");
    assert.strictEqual(result.collation, "en_US.utf8");
  });
});
