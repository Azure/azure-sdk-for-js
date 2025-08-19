// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the managed HSM Pool.
 *
 * @summary Gets the specified private endpoint connection associated with the managed HSM Pool.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/ManagedHsm_getPrivateEndpointConnection.json
 */

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function managedHsmGetPrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const name = "sample-mhsm";
  const privateEndpointConnectionName = "sample-pec";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.mhsmPrivateEndpointConnections.get(
    resourceGroupName,
    name,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedHsmGetPrivateEndpointConnection();
}

main().catch(console.error);
