// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the job.
 *
 * @summary gets the details of the job.
 * x-ms-original-file: 2024-09-01/Job_Get.json
 */
async function getsTheJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.job.get("rgrecoveryservicesdatareplication", "4", "ZGH4y");
  console.log(result);
}

async function main() {
  await getsTheJob();
}

main().catch(console.error);
