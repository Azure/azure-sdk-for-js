// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the available target compute sizes for a replication protected item.
 *
 * @summary lists the available target compute sizes for a replication protected item.
 * x-ms-original-file: 2025-08-01/TargetComputeSizes_ListByReplicationProtectedItems.json
 */
async function getsTheListOfTargetComputeSizesForTheReplicationProtectedItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6808dbbc-98c7-431f-a1b1-9580902423b7";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.targetComputeSizes.listByReplicationProtectedItems(
    "avraiMgDiskVaultRG",
    "avraiMgDiskVault",
    "asr-a2a-default-centraluseuap",
    "asr-a2a-default-centraluseuap-container",
    "468c912d-b1ab-4ea2-97eb-4b5095155db2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfTargetComputeSizesForTheReplicationProtectedItem();
}

main().catch(console.error);
