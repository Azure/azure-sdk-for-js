// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network security perimeter configuration for a key vault.
 *
 * @summary gets the specified network security perimeter configuration for a key vault.
 * x-ms-original-file: 2026-10-01-preview/getNetworkSecurityPerimeterConfiguration.json
 */
async function retrieveTheNetworkSecurityPerimeterConfigurationOfAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.getConfiguration(
    "sample-resource-group",
    "sample-vault",
    "00000000-0000-0000-0000-000000000000.sampleAssociation",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveTheNetworkSecurityPerimeterConfigurationOfAVault();
}

main().catch(console.error);
