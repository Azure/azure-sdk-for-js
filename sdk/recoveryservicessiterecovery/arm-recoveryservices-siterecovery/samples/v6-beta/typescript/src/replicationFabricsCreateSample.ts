// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create an Azure Site Recovery fabric (for e.g. Hyper-V site).
 *
 * @summary the operation to create an Azure Site Recovery fabric (for e.g. Hyper-V site).
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_Create.json
 */
async function createsAnAzureSiteRecoveryFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationFabrics.create("resourceGroupPS1", "vault1", "cloud1", {
    properties: { customDetails: { instanceType: "FabricSpecificCreationInput" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsAnAzureSiteRecoveryFabric();
}

main().catch(console.error);
