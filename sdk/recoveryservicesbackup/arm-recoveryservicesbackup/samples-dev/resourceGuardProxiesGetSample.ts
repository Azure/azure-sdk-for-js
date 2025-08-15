// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List the ResourceGuardProxies under vault
 *
 * @summary List the ResourceGuardProxies under vault
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/ResourceGuardProxyCRUD/ListResourceGuardProxy.json
 */
async function getVaultGuardProxies(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const vaultName = "sampleVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] ||
    "SampleResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceGuardProxies.list(
    vaultName,
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getVaultGuardProxies();
}

main().catch(console.error);
