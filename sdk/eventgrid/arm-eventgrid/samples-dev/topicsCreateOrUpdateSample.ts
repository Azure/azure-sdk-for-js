// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates a new topic with the specified parameters.
 *
 * @summary asynchronously creates a new topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Topics_CreateOrUpdate.json
 */
async function topicsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
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
  console.log(result);
}

/**
 * This sample demonstrates how to asynchronously creates a new topic with the specified parameters.
 *
 * @summary asynchronously creates a new topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Topics_CreateOrUpdateForAzureArc.json
 */
async function topicsCreateOrUpdateForAzureArc(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
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
  console.log(result);
}

async function main(): Promise<void> {
  await topicsCreateOrUpdate();
  await topicsCreateOrUpdateForAzureArc();
}

main().catch(console.error);
