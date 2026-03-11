// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("get information about a topic type", () => {
  let recorder: Recorder;
  let client: EventGridManagementClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    const subscriptionId = env.SUBSCRIPTION_ID || "<SUBSCRIPTION_ID>";
    const clientOptions = recorder.configureClientOptions({});
    client = new EventGridManagementClient(credential, subscriptionId, clientOptions);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get information about a topic type for topicTypesGet", async function () {
    const result = await client.topicTypes.get("Microsoft.Storage.StorageAccounts");
    assert.ok(result);
    assert.strictEqual(result.name, "Microsoft.Storage.StorageAccounts");
    assert.strictEqual(result.type, "Microsoft.EventGrid/topicTypes");
    assert.strictEqual(
      result.id,
      "/providers/Microsoft.EventGrid/topicTypes/Microsoft.Storage.StorageAccounts",
    );
    assert.strictEqual(result.description, "Microsoft Storage service events.");
    assert.strictEqual(result.displayName, "Storage Accounts");
    assert.strictEqual(result.provider, "Microsoft.Storage");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.resourceRegionType, "RegionalResource");
  });
});
