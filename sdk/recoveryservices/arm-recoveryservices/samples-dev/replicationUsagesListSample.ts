// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Fetches the replication usages of the vault.
 *
 * @summary Fetches the replication usages of the vault.
 * x-ms-original-file: specification/recoveryservices/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/ListReplicationUsages.json
 */

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsReplicationUsagesOfVault(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICES_SUBSCRIPTION_ID"] ||
    "6808dbbc-98c7-431f-a1b1-9580902423b7";
  const resourceGroupName =
    process.env["RECOVERYSERVICES_RESOURCE_GROUP"] || "avrai7517RG1";
  const vaultName = "avrai7517Vault1";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationUsages.list(
    resourceGroupName,
    vaultName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsReplicationUsagesOfVault();
}

main().catch(console.error);
