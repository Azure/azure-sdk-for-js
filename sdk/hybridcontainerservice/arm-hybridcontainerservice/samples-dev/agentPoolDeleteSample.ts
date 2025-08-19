// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified agent pool in the provisioned cluster
 *
 * @summary Deletes the specified agent pool in the provisioned cluster
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteAgentPool.json
 */

import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAgentPool(): Promise<void> {
  const connectedClusterResourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/test-hybridakscluster";
  const agentPoolName = "testnodepool";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.agentPoolOperations.beginDeleteAndWait(
    connectedClusterResourceUri,
    agentPoolName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAgentPool();
}

main().catch(console.error);
