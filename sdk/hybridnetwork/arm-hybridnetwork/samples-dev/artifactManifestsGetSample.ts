// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about a artifact manifest resource.
 *
 * @summary Gets information about a artifact manifest resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactManifestGet.json
 */

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAArtifactManifestResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const artifactManifestName = "TestManifest";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactManifests.get(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    artifactManifestName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAArtifactManifestResource();
}

main().catch(console.error);
