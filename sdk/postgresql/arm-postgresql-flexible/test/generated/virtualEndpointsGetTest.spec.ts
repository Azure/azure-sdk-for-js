// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets information about a pair of virtual endpoints", () => {
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

  it("should gets information about a pair of virtual endpoints for getInformationAboutAPairOfVirtualEndpoints", async function () {
    const result = await client.virtualEndpoints.get(
      "exampleresourcegroup",
      "exampleserver",
      "examplebasename",
    );
    assert.ok(result);
    assert.strictEqual(result.name, "examplebasename");
    assert.strictEqual(result.type, "Microsoft.DBforPostgreSQL/flexibleServers/virtualEndpoints");
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/virtualEndpoints/examplebasename",
    );
    assert.strictEqual(result.endpointType, "ReadWrite");
    assert.ok(Array.isArray(result.members));
    assert.strictEqual(result.members.length, 1);
    assert.ok(Array.isArray(result.virtualEndpoints));
    assert.strictEqual(result.virtualEndpoints.length, 2);
  });
});
