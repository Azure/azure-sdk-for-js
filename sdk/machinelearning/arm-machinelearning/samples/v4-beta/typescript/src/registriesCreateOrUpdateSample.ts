// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update registry
 *
 * @summary create or update registry
 * x-ms-original-file: 2025-12-01/Registries/createOrUpdate.json
 */
async function createOrUpdateRegistryWithSystemCreatedAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registries.createOrUpdate("test-rg", "string", {
    identity: { type: "None", userAssignedIdentities: { string: {} } },
    kind: "string",
    location: "string",
    discoveryUrl: "string",
    intellectualPropertyPublisher: "string",
    managedResourceGroup: { resourceId: "string" },
    mlFlowRegistryUri: "string",
    publicNetworkAccess: "string",
    regionDetails: [
      {
        acrDetails: [
          {
            systemCreatedAcrAccount: {
              acrAccountName: "string",
              acrAccountSku: "string",
              armResourceId: { resourceId: "string" },
            },
          },
        ],
        location: "string",
        storageAccountDetails: [
          {
            systemCreatedStorageAccount: {
              allowBlobPublicAccess: false,
              armResourceId: { resourceId: "string" },
              storageAccountHnsEnabled: false,
              storageAccountName: "string",
              storageAccountType: "string",
            },
          },
        ],
      },
    ],
    registryPrivateEndpointConnections: [
      {
        id: "string",
        location: "string",
        properties: {
          groupIds: ["string"],
          privateEndpoint: { subnetArmId: "string" },
          provisioningState: "string",
          registryPrivateLinkServiceConnectionState: {
            description: "string",
            actionsRequired: "string",
            status: "Approved",
          },
        },
      },
    ],
    sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Free" },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRegistryWithSystemCreatedAccounts();
}

main().catch(console.error);
