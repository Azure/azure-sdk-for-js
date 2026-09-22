// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of Azure Site Recovery Jobs for the vault.
 *
 * @summary gets the list of Azure Site Recovery Jobs for the vault.
 * x-ms-original-file: 2025-08-01/ReplicationJobs_List.json
 */
async function getsTheListOfJobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationJobs.list("resourceGroupPS1", "vault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfJobs();
}

main().catch(console.error);
