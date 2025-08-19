// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified private endpoint connection associated with the key vault.
 *
 * @summary Deletes the specified private endpoint connection associated with the key vault.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/deletePrivateEndpointConnection.json
 */

import { KeyVaultManagementClient } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function keyVaultDeletePrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const privateEndpointConnectionName = "sample-pec";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginDeleteAndWait(
    resourceGroupName,
    vaultName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await keyVaultDeletePrivateEndpointConnection();
}

main().catch(console.error);
