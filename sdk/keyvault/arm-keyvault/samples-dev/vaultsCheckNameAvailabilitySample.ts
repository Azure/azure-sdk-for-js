// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the vault name is valid and is not already in use.
 *
 * @summary Checks that the vault name is valid and is not already in use.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/checkVaultNameAvailability.json
 */

import {
  VaultCheckNameAvailabilityParameters,
  KeyVaultManagementClient,
} from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateAVaultName(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName: VaultCheckNameAvailabilityParameters = {
    name: "sample-vault",
    type: "Microsoft.KeyVault/vaults",
  };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.checkNameAvailability(vaultName);
  console.log(result);
}

async function main(): Promise<void> {
  await validateAVaultName();
}

main().catch(console.error);
