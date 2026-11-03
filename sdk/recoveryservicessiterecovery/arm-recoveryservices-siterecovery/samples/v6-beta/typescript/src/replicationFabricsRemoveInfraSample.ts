// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the appliance's infrastructure under the fabric.
 *
 * @summary removes the appliance's infrastructure under the fabric.
 * x-ms-original-file: 2025-08-01/ReplicationInfrastructure_Delete.json
 */
async function removesTheApplianceInfrastructureUnderTheFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationFabrics.removeInfra("resourceGroupPS1", "vault1", "cloud1");
}

async function main(): Promise<void> {
  await removesTheApplianceInfrastructureUnderTheFabric();
}

main().catch(console.error);
