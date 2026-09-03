// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the storage classifications in the vault.
 *
 * @summary lists the storage classifications in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationStorageClassifications_List.json
 */
async function getsTheListOfStorageClassificationObjectsUnderAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationStorageClassifications.list(
    "resourceGroupPS1",
    "vault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfStorageClassificationObjectsUnderAVault();
}

main().catch(console.error);
