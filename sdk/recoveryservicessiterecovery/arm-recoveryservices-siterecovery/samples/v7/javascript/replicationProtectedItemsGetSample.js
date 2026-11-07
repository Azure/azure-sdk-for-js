// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of an ASR replication protected item.
 *
 * @summary gets the details of an ASR replication protected item.
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Get.json
 */
async function getsTheDetailsOfAReplicationProtectedItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.get(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of an ASR replication protected item.
 *
 * @summary gets the details of an ASR replication protected item.
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Get_A2ACvm.json
 */
async function getsTheDetailsOfAnA2AConfidentialVMWithCMKDiskEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "42195872-7e70-4f8a-837f-84b28ecbb78b";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.get(
    "priyanprg",
    "priyanponeboxvault",
    "CentralUSCanSite",
    "CentralUSCancloud",
    "a2aCvmVm",
  );
  console.log(result);
}

async function main() {
  await getsTheDetailsOfAReplicationProtectedItem();
  await getsTheDetailsOfAnA2AConfidentialVMWithCMKDiskEncryption();
}

main().catch(console.error);
