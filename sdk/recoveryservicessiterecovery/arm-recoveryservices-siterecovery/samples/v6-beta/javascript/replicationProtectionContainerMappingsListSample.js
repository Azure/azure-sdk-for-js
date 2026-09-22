// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the protection container mappings in the vault.
 *
 * @summary lists the protection container mappings in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainerMappings_List.json
 */
async function getsTheListOfAllProtectionContainerMappingsInAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionContainerMappings.list(
    "resourceGroupPS1",
    "vault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfAllProtectionContainerMappingsInAVault();
}

main().catch(console.error);
