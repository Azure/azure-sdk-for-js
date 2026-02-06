// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link service ID for the specified managed cluster.
 *
 * @summary gets the private link service ID for the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/ResolvePrivateLinkServiceId.json
 */
async function resolveThePrivateLinkServiceIDForManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.resolvePrivateLinkServiceId.post("rg1", "clustername1", {
    name: "management",
  });
  console.log(result);
}

async function main() {
  await resolveThePrivateLinkServiceIDForManagedCluster();
}

main().catch(console.error);
