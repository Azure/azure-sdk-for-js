// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a vault.
 *
 * @summary deletes a vault.
 * x-ms-original-file: 2025-08-01/DeleteVault.json
 */
async function deleteRecoveryServicesVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  await client.vaults.delete("Default-RecoveryServices-ResourceGroup", "swaggerExample");
}

async function main() {
  await deleteRecoveryServicesVault();
}

main().catch(console.error);
