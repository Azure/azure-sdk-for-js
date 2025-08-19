// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the provisioned cluster instance
 *
 * @summary Deletes the provisioned cluster instance
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteProvisionedClusterInstance.json
 */
async function deleteProvisionedClusterInstance(): Promise<void> {
  const connectedClusterResourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/test-hybridakscluster";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.provisionedClusterInstances.beginDeleteAndWait(
    connectedClusterResourceUri,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteProvisionedClusterInstance();
}

main().catch(console.error);
