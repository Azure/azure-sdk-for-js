// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the result of any operation on the container.
 *
 * @summary fetches the result of any operation on the container.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionContainers_Inquire_Result.json
 */
async function getAzureStorageProtectionContainerOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainerOperationResults.get(
    "testvault",
    "test-rg",
    "Azure",
    "VMAppContainer;Compute;testRG;testSQL",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getAzureStorageProtectionContainerOperationResult();
}

main().catch(console.error);
