// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Change artifact state defined in artifact store.
 *
 * @summary Change artifact state defined in artifact store.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/PureProxyArtifact/ArtifactChangeState.json
 */

import type { ArtifactChangeState } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAnArtifactState(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "TestResourceGroup";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStoreName";
  const artifactName = "fedrbac";
  const artifactVersionName = "1.0.0";
  const parameters: ArtifactChangeState = {
    properties: { artifactState: "Deprecated" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.proxyArtifact.beginUpdateStateAndWait(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    artifactName,
    artifactVersionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnArtifactState();
}

main().catch(console.error);
