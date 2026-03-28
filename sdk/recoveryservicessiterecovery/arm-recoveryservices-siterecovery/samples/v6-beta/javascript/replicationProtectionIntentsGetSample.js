// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of an ASR replication protection intent.
 *
 * @summary gets the details of an ASR replication protection intent.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionIntents_Get.json
 */
async function getsTheDetailsOfAReplicationProtectionIntentItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "509099b2-9d2c-4636-b43e-bd5cafb6be69";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionIntents.get("resourceGroupPS1", "vault1", "vm1");
  console.log(result);
}

async function main() {
  await getsTheDetailsOfAReplicationProtectionIntentItem();
}

main().catch(console.error);
