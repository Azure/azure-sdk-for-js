// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified private endpoint connection associated with the key vault.
 *
 * @summary updates the specified private endpoint connection associated with the key vault.
 * x-ms-original-file: 2025-05-01/putPrivateEndpointConnection.json
 */
async function keyVaultPutPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.put(
    "sample-group",
    "sample-vault",
    "sample-pec",
    {
      etag: "",
      properties: {
        privateLinkServiceConnectionState: {
          description: "My name is Joe and I'm approving this.",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await keyVaultPutPrivateEndpointConnection();
}

main().catch(console.error);
