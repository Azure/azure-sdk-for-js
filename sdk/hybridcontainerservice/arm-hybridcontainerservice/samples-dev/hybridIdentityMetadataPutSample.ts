// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridIdentityMetadata } from "@azure/arm-hybridcontainerservice";
import { HybridContainerServiceClient } from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates the hybrid identity metadata proxy resource that facilitates the managed identity provisioning.
 *
 * @summary Creates the hybrid identity metadata proxy resource that facilitates the managed identity provisioning.
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/CreateHybridIdentityMetadata.json
 */
async function createHybridIdentityMetadata(): Promise<void> {
  const connectedClusterResourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/test-hybridakscluster";
  const body: HybridIdentityMetadata = {
    properties: {
      publicKey: "8ec7d60c-9700-40b1-8e6e-e5b2f6f477f2",
      resourceUid: "f8b82dff-38ef-4220-99ef-d3a3f86ddc6c",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential);
  const result = await client.hybridIdentityMetadataOperations.put(
    connectedClusterResourceUri,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createHybridIdentityMetadata();
}

main().catch(console.error);
