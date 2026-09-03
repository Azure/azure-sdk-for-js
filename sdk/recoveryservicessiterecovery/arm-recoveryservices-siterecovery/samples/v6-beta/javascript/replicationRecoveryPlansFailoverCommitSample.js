// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to commit the failover of a recovery plan.
 *
 * @summary the operation to commit the failover of a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_FailoverCommit.json
 */
async function executeCommitFailoverOfTheRecoveryPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.failoverCommit(
    "resourceGroupPS1",
    "vault1",
    "RPtest1",
  );
  console.log(result);
}

async function main() {
  await executeCommitFailoverOfTheRecoveryPlan();
}

main().catch(console.error);
