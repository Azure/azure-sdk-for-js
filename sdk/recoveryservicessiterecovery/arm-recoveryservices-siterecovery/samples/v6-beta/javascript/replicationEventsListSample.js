// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of Azure Site Recovery events for the vault.
 *
 * @summary gets the list of Azure Site Recovery events for the vault.
 * x-ms-original-file: 2025-08-01/ReplicationEvents_List.json
 */
async function getsTheListOfAzureSiteRecoveryEvents() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationEvents.list("resourceGroupPS1", "vault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfAzureSiteRecoveryEvents();
}

main().catch(console.error);
