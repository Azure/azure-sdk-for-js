// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets details of the specific container registered to your Recovery Services Vault.
 *
 * @summary Gets details of the specific container registered to your Recovery Services Vault.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureWorkload/ProtectionContainers_Get.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getProtectionContainerDetails(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "testVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "testRg";
  const fabricName = "Azure";
  const containerName = "VMAppContainer;Compute;testRG;testSQL";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainers.get(
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProtectionContainerDetails();
}

main().catch(console.error);
