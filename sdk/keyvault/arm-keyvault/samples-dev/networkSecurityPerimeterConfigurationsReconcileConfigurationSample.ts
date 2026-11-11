// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconciles the specified network security perimeter configuration for a key vault.
 *
 * @summary reconciles the specified network security perimeter configuration for a key vault.
 * x-ms-original-file: 2026-10-01-preview/reconcileNetworkSecurityPerimeter.json
 */
async function reconcileTheNetworkSecurityPerimeterConfigurationOfAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterConfigurations.reconcileConfiguration(
    "sample-resource-group",
    "sample-vault",
    "00000000-0000-0000-0000-000000000000.sampleAssociation",
  );
}

async function main(): Promise<void> {
  await reconcileTheNetworkSecurityPerimeterConfigurationOfAVault();
}

main().catch(console.error);
