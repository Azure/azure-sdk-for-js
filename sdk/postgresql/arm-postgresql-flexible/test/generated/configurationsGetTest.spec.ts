// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about a specific configuration (also known as server parameter) of a server", () => {
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

  it("should gets information about a specific configuration (also known as server parameter) of a server for getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer", async function () {
    const result = await client.configurations.get(
      "exampleresourcegroup",
      "exampleserver",
      "array_nulls",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "array_nulls");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/configurations");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/configurations/array_nulls",
    );
    assert.strictEqual(
      result.description,
      "Enables input of NULL (case insensitive) to be considered as NULL value rather than the literal String 'NULL'.",
    );
    assert.strictEqual(result.allowedValues, "on,off");
    assert.strictEqual(result.dataType, "Boolean");
    assert.strictEqual(result.defaultValue, "on");
    assert.strictEqual(
      result.documentationLink,
      "https://www.postgresql.org/docs/13/runtime-config-compatible.html#GUC-ARRAY-NULLS",
    );
    assert.strictEqual(result.isConfigPendingRestart, false);
    assert.strictEqual(result.isDynamicConfig, true);
    assert.strictEqual(result.isReadOnly, false);
    assert.strictEqual(result.source, "system-default");
    assert.strictEqual(result.value, "on");
  });
});
