// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of vault setting. This includes the Migration Hub connection settings.
 *
 * @summary gets the list of vault setting. This includes the Migration Hub connection settings.
 * x-ms-original-file: 2025-08-01/ReplicationVaultSetting_List.json
 */
async function getsTheListOfVaultSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationVaultSetting.list("resourceGroupPS1", "vault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfVaultSetting();
}

main().catch(console.error);
