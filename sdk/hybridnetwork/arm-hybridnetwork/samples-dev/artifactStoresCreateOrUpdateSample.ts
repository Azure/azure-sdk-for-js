// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ArtifactStore } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a artifact store.
 *
 * @summary Creates or updates a artifact store.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactStoreCreate.json
 */
async function createOrUpdateAnArtifactStoreOfPublisherResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const parameters: ArtifactStore = {
    location: "eastus",
    properties: {
      managedResourceGroupConfiguration: { name: "testRg", location: "eastus" },
      replicationStrategy: "SingleReplication",
      storeType: "AzureContainerRegistry",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactStores.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnArtifactStoreOfPublisherResource();
}

main().catch(console.error);
