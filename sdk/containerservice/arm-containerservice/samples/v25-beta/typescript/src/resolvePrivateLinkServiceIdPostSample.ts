// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link service ID for the specified managed cluster.
 *
 * @summary gets the private link service ID for the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/ResolvePrivateLinkServiceId.json
 */
async function resolveThePrivateLinkServiceIDForManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.resolvePrivateLinkServiceId.post("rg1", "clustername1", {
    name: "management",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await resolveThePrivateLinkServiceIDForManagedCluster();
}

main().catch(console.error);
