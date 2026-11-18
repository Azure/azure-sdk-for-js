// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the network security perimeter configurations associated with a key vault.
 *
 * @summary lists the network security perimeter configurations associated with a key vault.
 * x-ms-original-file: 2026-10-01-preview/listNetworkSecurityPerimeterConfigurations.json
 */
async function listTheNetworkSecurityPerimeterConfigurationsOfAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.listConfigurations(
    "sample-resource-group",
    "sample-vault",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheNetworkSecurityPerimeterConfigurationsOfAVault();
}

main().catch(console.error);
