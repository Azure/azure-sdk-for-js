// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new topic with the specified parameters", () => {
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

  it("should asynchronously creates a new topic with the specified parameters for topicsCreateOrUpdate", async function () {
    const result = await client.topics.createOrUpdate("examplerg", "exampletopic1", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/azureeventgridrunnerrgcentraluseuap/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-assigned-id":
            {},
        },
      },
      location: "westus2",
      encryption: {
        customerManagedKeyEncryption: [
          {
            keyEncryptionKeyIdentity: {
              type: "UserAssigned",
              userAssignedIdentityResourceId:
                "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/azureeventgridrunnerrgcentraluseuap/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-assigned-id",
            },
            keyEncryptionKeyUrl: "https://ege2ekeyvault.vault.azure.net/keys/ValidKey1",
          },
        ],
      },
      platformCapabilities: { confidentialCompute: { mode: "Enabled" } },
      tags: { tag1: "value1", tag2: "value2" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "exampletopic1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/topics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
    assert.strictEqual(result.identity?.type, "UserAssigned");
    assert.strictEqual(result.location, "westus2");
    assert.strictEqual(
      result.endpoint,
      "https://exampletopic1.westus2-1.eventgrid.azure.net/api/events",
    );
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });

  it("should asynchronously creates a new topic with the specified parameters for topicsCreateOrUpdateForAzureArc", async function () {
    const result = await client.topics.createOrUpdate("examplerg", "exampletopic1", {
      extendedLocation: {
        name: "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourcegroups/examplerg/providers/Microsoft.ExtendedLocation/CustomLocations/exampleCustomLocation",
        type: "CustomLocation",
      },
      kind: "AzureArc",
      location: "westus2",
      inputSchema: "CloudEventSchemaV1_0",
      tags: { tag1: "value1", tag2: "value2" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "exampletopic1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/topics");
    assert.strictEqual(
      result.extendedLocation?.name,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourcegroups/examplerg/providers/Microsoft.ExtendedLocation/CustomLocations/exampleCustomLocation",
    );
    assert.strictEqual(result.extendedLocation?.type, "CustomLocation");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic1",
    );
    assert.strictEqual(result.kind, "AzureArc");
    assert.strictEqual(result.location, "westus2");
    assert.strictEqual(
      result.endpoint,
      "https://exampletopic1.westus2-1.eventgrid.azure.net/api/events",
    );
    assert.strictEqual(result.inputSchema, "CloudEventSchemaV1_0");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(result.tags?.tag1, "value1");
    assert.strictEqual(result.tags?.tag2, "value2");
  });
});
