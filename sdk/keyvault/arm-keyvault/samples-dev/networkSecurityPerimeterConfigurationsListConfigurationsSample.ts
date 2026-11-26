// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the network security perimeter configurations associated with a key vault.
 *
 * @summary lists the network security perimeter configurations associated with a key vault.
 * x-ms-original-file: 2026-10-01-preview/listNetworkSecurityPerimeterConfigurations.json
 */
async function listTheNetworkSecurityPerimeterConfigurationsOfAVault(): Promise<void> {
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

async function main(): Promise<void> {
  await listTheNetworkSecurityPerimeterConfigurationsOfAVault();
}

main().catch(console.error);
