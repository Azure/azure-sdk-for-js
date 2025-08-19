// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a artifact manifest resource.
 *
 * @summary Updates a artifact manifest resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactManifestUpdateTags.json
 */

import type { TagsObject } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAArtifactManifestResourceTags(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const artifactManifestName = "TestManifest";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactManifests.update(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    artifactManifestName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAArtifactManifestResourceTags();
}

main().catch(console.error);
