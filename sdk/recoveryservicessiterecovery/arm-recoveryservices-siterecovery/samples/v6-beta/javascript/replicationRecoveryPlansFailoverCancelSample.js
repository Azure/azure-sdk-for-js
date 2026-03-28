// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to cancel the failover of a recovery plan.
 *
 * @summary the operation to cancel the failover of a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_FailoverCancel.json
 */
async function executeCancelFailoverOfTheRecoveryPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.failoverCancel(
    "resourceGroupPS1",
    "vault1",
    "RPtest1",
  );
  console.log(result);
}

async function main() {
  await executeCancelFailoverOfTheRecoveryPlan();
}

main().catch(console.error);
