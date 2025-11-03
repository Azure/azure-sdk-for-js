// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the key vault.
 *
 * @summary gets the specified private endpoint connection associated with the key vault.
 * x-ms-original-file: 2025-05-01/getPrivateEndpointConnection.json
 */
async function keyVaultGetPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "sample-group",
    "sample-vault",
    "sample-pec",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await keyVaultGetPrivateEndpointConnection();
}

main().catch(console.error);
