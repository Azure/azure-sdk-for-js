// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously creates a new system topic with the specified parameters.
 *
 * @summary asynchronously creates a new system topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/SystemTopics_CreateOrUpdate.json
 */
async function systemTopicsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
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
  console.log(result);
}

async function main() {
  await systemTopicsCreateOrUpdate();
}

main().catch(console.error);
