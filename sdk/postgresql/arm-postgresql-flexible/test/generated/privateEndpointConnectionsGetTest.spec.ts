// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("gets a private endpoint connection", () => {
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

  it("should gets a private endpoint connection for getAPrivateEndpointConnection", async function () {
    const result = await client.privateEndpointConnections.get(
      "exampleresourcegroup",
      "exampleserver",
      "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    );
    assert.ok(result);
    assert.strictEqual(
      result.name,
      "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    );
    assert.strictEqual(
      result.type,
      "Microsoft.DBforPostgreSQL/flexibleServers/privateEndpointConnections",
    );
    assert.strictEqual(
      result.id,
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.DBforPostgreSQL/flexibleServers/exampleserver/privateEndpointConnections/private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    );
    assert.ok(Array.isArray(result.groupIds));
    assert.strictEqual(result.groupIds.length, 1);
    assert.strictEqual(result.provisioningState, "Ready");
  });
});
