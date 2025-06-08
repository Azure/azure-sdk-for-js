// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the vault.
 *
 * @summary removes the vault.
 * x-ms-original-file: 2024-09-01/Vault_Delete.json
 */
async function deletesTheVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.vault.delete("rgrecoveryservicesdatareplication", "4");
}

async function main() {
  await deletesTheVault();
}

main().catch(console.error);
