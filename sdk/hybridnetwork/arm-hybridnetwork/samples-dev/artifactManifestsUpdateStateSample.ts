// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update state for artifact manifest.
 *
 * @summary Update state for artifact manifest.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactManifestUpdateState.json
 */

import type { ArtifactManifestUpdateState } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateArtifactManifestState(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const artifactManifestName = "TestArtifactManifestName";
  const parameters: ArtifactManifestUpdateState = {
    artifactManifestState: "Uploaded",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactManifests.beginUpdateStateAndWait(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    artifactManifestName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateArtifactManifestState();
}

main().catch(console.error);
