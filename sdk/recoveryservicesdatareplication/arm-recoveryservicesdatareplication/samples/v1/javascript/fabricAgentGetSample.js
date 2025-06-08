// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the fabric agent.
 *
 * @summary gets the details of the fabric agent.
 * x-ms-original-file: 2024-09-01/FabricAgent_Get.json
 */
async function getsTheFabricAgent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabricAgent.get("rgrecoveryservicesdatareplication", "wPR", "M");
  console.log(result);
}

async function main() {
  await getsTheFabricAgent();
}

main().catch(console.error);
