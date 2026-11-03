// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of the Azure Site Recovery fabrics in the vault.
 *
 * @summary gets a list of the Azure Site Recovery fabrics in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_List.json
 */
async function getsTheListOfASRFabrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationFabrics.list("resourceGroupPS1", "vault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfASRFabrics();
}

main().catch(console.error);
