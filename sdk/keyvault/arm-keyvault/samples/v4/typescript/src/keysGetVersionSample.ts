// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified version of the specified key in the specified key vault.
 *
 * @summary gets the specified version of the specified key in the specified key vault.
 * x-ms-original-file: 2025-05-01/getKeyVersion.json
 */
async function getAKeyVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.keys.getVersion(
    "sample-group",
    "sample-vault-name",
    "sample-key-name",
    "fd618d9519b74f9aae94ade66b876acc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAKeyVersion();
}

main().catch(console.error);
