// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets details of the specific container registered to your Recovery Services Vault.
 *
 * @summary gets details of the specific container registered to your Recovery Services Vault.
 * x-ms-original-file: 2026-08-01/AzureWorkload/ProtectionContainers_Get.json
 */
async function getProtectionContainerDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainers.get(
    "testVault",
    "testRg",
    "Azure",
    "VMAppContainer;Compute;testRG;testSQL",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProtectionContainerDetails();
}

main().catch(console.error);
