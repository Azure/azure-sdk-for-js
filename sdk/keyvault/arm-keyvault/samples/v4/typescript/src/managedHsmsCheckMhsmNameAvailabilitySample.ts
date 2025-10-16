// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the managed hsm name is valid and is not already in use.
 *
 * @summary checks that the managed hsm name is valid and is not already in use.
 * x-ms-original-file: 2025-05-01/ManagedHsm_checkMhsmNameAvailability.json
 */
async function validateAManagedHsmName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.checkMhsmNameAvailability({
    name: "sample-mhsm",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validateAManagedHsmName();
}

main().catch(console.error);
