// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("checks if a proposed migration name is valid and available", () => {
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

  it("should checks if a proposed migration name is valid and available for checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration", async function () {
    const result = await client.migrations.checkNameAvailability(
      "exampleresourcegroup",
      "exampleserver",
      { name: "examplemigration", type: "Microsoft.DBforPostgreSQL/flexibleServers/migrations" },
    );
    assert.ok(result);
    assert.strictEqual(result.name, "naexamplemigration");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/migrations");
    assert.strictEqual(result.nameAvailable, true);
  });
});
