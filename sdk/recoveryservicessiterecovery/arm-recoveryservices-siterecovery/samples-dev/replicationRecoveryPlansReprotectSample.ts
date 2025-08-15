// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to reprotect(reverse replicate) a recovery plan. This api is for deprecated scenarios and no longer works.
 *
 * @summary The operation to reprotect(reverse replicate) a recovery plan. This api is for deprecated scenarios and no longer works.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationRecoveryPlans_Reprotect.json
 */
async function executeReprotectOfTheRecoveryPlan(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const recoveryPlanName = "RPtest1";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.beginReprotectAndWait(
    resourceGroupName,
    resourceName,
    recoveryPlanName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeReprotectOfTheRecoveryPlan();
}

main().catch(console.error);
