// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the managed hsm name is valid and is not already in use.
 *
 * @summary Checks that the managed hsm name is valid and is not already in use.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/ManagedHsm_checkMhsmNameAvailability.json
 */

import {
  CheckMhsmNameAvailabilityParameters,
  KeyVaultManagementClient,
} from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateAManagedHsmName(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const mhsmName: CheckMhsmNameAvailabilityParameters = { name: "sample-mhsm" };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.checkMhsmNameAvailability(mhsmName);
  console.log(result);
}

async function main(): Promise<void> {
  await validateAManagedHsmName();
}

main().catch(console.error);
