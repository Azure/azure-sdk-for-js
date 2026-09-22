// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the recovery plan.
 *
 * @summary gets the details of the recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_Get.json
 */
async function getsTheRequestedRecoveryPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.get("resourceGroupPS1", "vault1", "RPtest1");
  console.log(result);
}

async function main() {
  await getsTheRequestedRecoveryPlan();
}

main().catch(console.error);
