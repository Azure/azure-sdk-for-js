// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("lists the capabilities available for a given server", () => {
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

  it("should lists the capabilities available for a given server for listTheCapabilitiesAvailableForAGivenServer", async function () {
    const resArray = new Array();
    for await (const item of client.capabilitiesByServer.list(
      "exampleresourcegroup",
      "exampleserver",
    )) {
      resArray.push(item);
    }
    assert.ok(resArray);
    assert.strictEqual(resArray.length, 1);
    assert.strictEqual(resArray[0].name, "FlexibleServerCapabilities");
    assert.strictEqual(resArray[0].fastProvisioningSupported, "Enabled");
    assert.strictEqual(resArray[0].geoBackupSupported, "Enabled");
    assert.strictEqual(resArray[0].onlineResizeSupported, "Enabled");
    assert.strictEqual(resArray[0].restricted, "Disabled");
    assert.strictEqual(resArray[0].storageAutoGrowthSupported, "Enabled");
    assert.ok(Array.isArray(resArray[0].supportedFastProvisioningEditions));
    assert.strictEqual(resArray[0].supportedFastProvisioningEditions.length, 25);
    assert.ok(Array.isArray(resArray[0].supportedFeatures));
    assert.strictEqual(resArray[0].supportedFeatures.length, 9);
    assert.ok(Array.isArray(resArray[0].supportedServerEditions));
    assert.strictEqual(resArray[0].supportedServerEditions.length, 3);
    assert.ok(Array.isArray(resArray[0].supportedServerVersions));
    assert.strictEqual(resArray[0].supportedServerVersions.length, 8);
    assert.strictEqual(resArray[0].zoneRedundantHaAndGeoBackupSupported, "Enabled");
    assert.strictEqual(resArray[0].zoneRedundantHaSupported, "Enabled");
  });
});
