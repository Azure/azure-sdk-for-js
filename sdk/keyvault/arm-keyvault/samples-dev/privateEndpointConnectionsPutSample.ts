// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the specified private endpoint connection associated with the key vault.
 *
 * @summary Updates the specified private endpoint connection associated with the key vault.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/putPrivateEndpointConnection.json
 */

import {
  PrivateEndpointConnection,
  KeyVaultManagementClient,
} from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function keyVaultPutPrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const privateEndpointConnectionName = "sample-pec";
  const properties: PrivateEndpointConnection = {
    etag: "",
    privateLinkServiceConnectionState: {
      description: "My name is Joe and I'm approving this.",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.put(
    resourceGroupName,
    vaultName,
    privateEndpointConnectionName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await keyVaultPutPrivateEndpointConnection();
}

main().catch(console.error);
