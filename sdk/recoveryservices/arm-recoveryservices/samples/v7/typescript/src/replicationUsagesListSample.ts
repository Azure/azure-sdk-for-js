// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the replication usages of the vault.
 *
 * @summary fetches the replication usages of the vault.
 * x-ms-original-file: 2025-08-01/ListReplicationUsages.json
 */
async function getsReplicationUsagesOfVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6808dbbc-98c7-431f-a1b1-9580902423b7";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationUsages.list("avrai7517RG1", "avrai7517Vault1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsReplicationUsagesOfVault();
}

main().catch(console.error);
