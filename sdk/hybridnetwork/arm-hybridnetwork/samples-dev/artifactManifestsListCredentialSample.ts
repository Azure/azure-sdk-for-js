// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List credential for publishing artifacts defined in artifact manifest.
 *
 * @summary List credential for publishing artifacts defined in artifact manifest.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactManifestListCredential.json
 */

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listACredentialForArtifactManifest(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const artifactManifestName = "TestArtifactManifestName";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactManifests.listCredential(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    artifactManifestName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listACredentialForArtifactManifest();
}

main().catch(console.error);
