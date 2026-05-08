// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the protection containers in a vault.
 *
 * @summary lists the protection containers in a vault.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainers_List.json
 */
async function getsTheListOfAllProtectionContainersInAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionContainers.list(
    "resourceGroupPS1",
    "vault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfAllProtectionContainersInAVault();
}

main().catch(console.error);
