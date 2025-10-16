// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the vault name is valid and is not already in use.
 *
 * @summary checks that the vault name is valid and is not already in use.
 * x-ms-original-file: 2025-05-01/checkVaultNameAvailability.json
 */
async function validateAVaultName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.checkNameAvailability({
    name: "sample-vault",
    type: "Microsoft.KeyVault/vaults",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validateAVaultName();
}

main().catch(console.error);
