// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a recovery plan.
 *
 * @summary delete a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_Delete.json
 */
async function deletesTheSpecifiedRecoveryPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationRecoveryPlans.delete("resourceGroupPS1", "vault1", "RPtest1");
}

async function main(): Promise<void> {
  await deletesTheSpecifiedRecoveryPlan();
}

main().catch(console.error);
