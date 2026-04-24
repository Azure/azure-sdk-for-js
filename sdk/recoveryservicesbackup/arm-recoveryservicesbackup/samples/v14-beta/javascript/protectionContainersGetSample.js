// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details of the specific container registered to your Recovery Services Vault.
 *
 * @summary gets details of the specific container registered to your Recovery Services Vault.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/ProtectionContainers_Get.json
 */
async function getProtectionContainerDetails() {
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

async function main() {
  await getProtectionContainerDetails();
}

main().catch(console.error);
