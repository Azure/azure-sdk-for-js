// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified network security perimeter configuration for a key vault.
 *
 * @summary gets the specified network security perimeter configuration for a key vault.
 * x-ms-original-file: 2026-10-01-preview/getNetworkSecurityPerimeterConfiguration.json
 */
async function retrieveTheNetworkSecurityPerimeterConfigurationOfAVault() {
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

async function main() {
  await retrieveTheNetworkSecurityPerimeterConfigurationOfAVault();
}

main().catch(console.error);
