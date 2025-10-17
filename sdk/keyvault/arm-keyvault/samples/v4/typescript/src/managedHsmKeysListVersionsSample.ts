// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the keys in the specified managed HSM.
 *
 * @summary lists the keys in the specified managed HSM.
 * x-ms-original-file: 2025-05-01/managedHsmListKeyVersions.json
 */
async function listKeyVersionsInTheManagedHSM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedHsmKeys.listVersions(
    "sample-group",
    "sample-managedhsm-name",
    "sample-key-name",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listKeyVersionsInTheManagedHSM();
}

main().catch(console.error);
