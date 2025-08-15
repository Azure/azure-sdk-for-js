// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified artifact store.
 *
 * @summary Deletes the specified artifact store.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactStoreDelete.json
 */
async function deleteAArtifactStoreOfPublisherResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactStores.beginDeleteAndWait(
    resourceGroupName,
    publisherName,
    artifactStoreName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAArtifactStoreOfPublisherResource();
}

main().catch(console.error);
