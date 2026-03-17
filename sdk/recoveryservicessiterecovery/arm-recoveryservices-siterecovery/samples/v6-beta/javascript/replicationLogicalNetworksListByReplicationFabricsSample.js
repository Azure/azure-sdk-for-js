// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the logical networks of the Azure Site Recovery fabric.
 *
 * @summary lists all the logical networks of the Azure Site Recovery fabric.
 * x-ms-original-file: 2025-08-01/ReplicationLogicalNetworks_ListByReplicationFabrics.json
 */
async function getsTheListOfLogicalNetworksUnderAFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationLogicalNetworks.listByReplicationFabrics(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfLogicalNetworksUnderAFabric();
}

main().catch(console.error);
