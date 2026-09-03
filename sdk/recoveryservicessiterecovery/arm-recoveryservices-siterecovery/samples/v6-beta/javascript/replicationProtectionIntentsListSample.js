// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of ASR replication protection intent objects in the vault.
 *
 * @summary gets the list of ASR replication protection intent objects in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionIntents_List.json
 */
async function getsTheListOfReplicationProtectionIntentObjects() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "509099b2-9d2c-4636-b43e-bd5cafb6be69";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionIntents.list(
    "resourceGroupPS1",
    "2007vttp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfReplicationProtectionIntentObjects();
}

main().catch(console.error);
