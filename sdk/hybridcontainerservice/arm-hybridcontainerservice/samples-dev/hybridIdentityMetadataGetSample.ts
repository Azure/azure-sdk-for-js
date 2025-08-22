// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the hybrid identity metadata proxy resource.
 *
 * @summary Get the hybrid identity metadata proxy resource.
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetHybridIdentityMetadata.json
 */

import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getHybridIdentityMetadata(): Promise<void> {
  const connectedClusterResourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/test-hybridakscluster";
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.hybridIdentityMetadataOperations.get(connectedClusterResourceUri);
  console.log(result);
}

async function main(): Promise<void> {
  await getHybridIdentityMetadata();
}

main().catch(console.error);
