// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified version of the specified key in the specified managed HSM.
 *
 * @summary gets the specified version of the specified key in the specified managed HSM.
 * x-ms-original-file: 2025-05-01/managedHsmGetKeyVersion.json
 */
async function getAKeyVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsmKeys.getVersion(
    "sample-group",
    "sample-managedhsm-name",
    "sample-key-name",
    "fd618d9519b74f9aae94ade66b876acc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAKeyVersion();
}

main().catch(console.error);
