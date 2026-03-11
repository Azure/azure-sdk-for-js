// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "../../src/index.js";
import { createRecorder } from "./util/recordedClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("asynchronously creates a new system topic with the specified parameters", () => {
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

  it("should asynchronously creates a new system topic with the specified parameters for systemTopicsCreateOrUpdate", async function () {
    const result = await client.systemTopics.createOrUpdate("examplerg", "exampleSystemTopic1", {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/azureeventgridrunnerrgcentraluseuap/providers/Microsoft.ManagedIdentity/userAssignedIdentities/user-assigned-id":
            {},
        },
      },
      location: "centraluseuap",
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
      source:
        "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/azureeventgridrunnerrgcentraluseuap/providers/microsoft.storage/storageaccounts/pubstgrunnerb71cd29e",
      topicType: "microsoft.storage.storageaccounts",
      tags: { tag1: "value1", tag2: "value2" },
    });
    assert.ok(result);
    assert.strictEqual(result.name, "exampleSystemTopic1");
    assert.strictEqual(result.type, "Microsoft.EventGrid/systemTopics");
    assert.strictEqual(
      result.id,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/systemTopics/exampleSystemTopic1",
    );
    assert.strictEqual(result.identity?.type, "UserAssigned");
    assert.strictEqual(result.location, "centraluseuap");
    assert.strictEqual(result.metricResourceId, "183c0fb1-17ff-47b6-ac77-5a47420ab01e");
    assert.strictEqual(result.provisioningState, "Succeeded");
    assert.strictEqual(
      result.source,
      "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/azureeventgridrunnerrgcentraluseuap/providers/microsoft.storage/storageaccounts/pubstgrunnerb71cd29e",
    );
    assert.strictEqual(result.topicType, "microsoft.storage.storageaccounts");
  });
});
