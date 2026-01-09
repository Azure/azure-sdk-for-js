// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the managed HSM Pool.
 *
 * @summary Gets the specified private endpoint connection associated with the managed HSM Pool.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/ManagedHsm_getPrivateEndpointConnection.json
 */
async function managedHsmGetPrivateEndpointConnection() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
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

async function main() {
  await managedHsmGetPrivateEndpointConnection();
}

main().catch(console.error);
