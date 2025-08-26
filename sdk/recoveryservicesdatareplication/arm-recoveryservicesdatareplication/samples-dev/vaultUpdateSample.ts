// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to performs update on the vault.
 *
 * @summary performs update on the vault.
 * x-ms-original-file: 2024-09-01/Vault_Update.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function updatesTheVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.vault.update("rgrecoveryservicesdatareplication", "4", {
    properties: { vaultType: "DisasterRecovery" },
    tags: { key8872: "pvtc" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheVault();
}

main().catch(console.error);
