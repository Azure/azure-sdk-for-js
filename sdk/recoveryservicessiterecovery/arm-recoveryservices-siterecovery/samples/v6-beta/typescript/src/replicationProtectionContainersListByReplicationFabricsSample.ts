// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the protection containers in the specified fabric.
 *
 * @summary lists the protection containers in the specified fabric.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainers_ListByReplicationFabrics.json
 */
async function getsTheListOfProtectionContainerForAFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionContainers.listByReplicationFabrics(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfProtectionContainerForAFabric();
}

main().catch(console.error);
