// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to cancel an Azure Site Recovery job.
 *
 * @summary the operation to cancel an Azure Site Recovery job.
 * x-ms-original-file: 2025-08-01/ReplicationJobs_Cancel.json
 */
async function cancelsTheSpecifiedJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.cancel(
    "resourceGroupPS1",
    "vault1",
    "2653c648-fc72-4316-86f3-fdf8eaa0066b",
  );
  console.log(result);
}

async function main() {
  await cancelsTheSpecifiedJob();
}

main().catch(console.error);
