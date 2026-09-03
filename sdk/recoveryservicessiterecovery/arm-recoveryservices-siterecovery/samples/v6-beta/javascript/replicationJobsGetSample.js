// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of an Azure Site Recovery job.
 *
 * @summary get the details of an Azure Site Recovery job.
 * x-ms-original-file: 2025-08-01/ReplicationJobs_Get.json
 */
async function getsTheJobDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.get(
    "resourceGroupPS1",
    "vault1",
    "58776d0b-3141-48b2-a377-9ad863eb160d",
  );
  console.log(result);
}

async function main() {
  await getsTheJobDetails();
}

main().catch(console.error);
