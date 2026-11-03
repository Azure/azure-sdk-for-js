// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to cleanup test failover of a recovery plan.
 *
 * @summary the operation to cleanup test failover of a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_TestFailoverCleanup.json
 */
async function executeTestFailoverCleanupOfTheRecoveryPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.testFailoverCleanup(
    "resourceGroupPS1",
    "vault1",
    "RPtest1",
    { properties: { comments: "Test Failover Cleanup" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeTestFailoverCleanupOfTheRecoveryPlan();
}

main().catch(console.error);
