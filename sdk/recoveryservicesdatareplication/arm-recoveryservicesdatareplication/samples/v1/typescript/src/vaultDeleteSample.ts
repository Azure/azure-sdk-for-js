// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the vault.
 *
 * @summary removes the vault.
 * x-ms-original-file: 2024-09-01/Vault_Delete.json
 */
async function deletesTheVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.vault.delete("rgrecoveryservicesdatareplication", "4");
}

async function main(): Promise<void> {
  await deletesTheVault();
}

main().catch(console.error);
