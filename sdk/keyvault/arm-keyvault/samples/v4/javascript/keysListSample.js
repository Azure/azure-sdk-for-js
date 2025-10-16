// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the keys in the specified key vault.
 *
 * @summary lists the keys in the specified key vault.
 * x-ms-original-file: 2025-05-01/listKeys.json
 */
async function listKeysInTheVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.keys.list("sample-group", "sample-vault-name")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listKeysInTheVault();
}

main().catch(console.error);
