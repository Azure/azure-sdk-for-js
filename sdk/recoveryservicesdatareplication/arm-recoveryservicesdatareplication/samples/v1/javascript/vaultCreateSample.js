// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the vault.
 *
 * @summary creates the vault.
 * x-ms-original-file: 2024-09-01/Vault_Create.json
 */
async function putsTheVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.vault.create("rgrecoveryservicesdatareplication", "4", {
    location: "eck",
    properties: { vaultType: "DisasterRecovery" },
    tags: { key5359: "ljfilxolxzuxrauopwtyxghrp" },
  });
  console.log(result);
}

async function main() {
  await putsTheVault();
}

main().catch(console.error);
