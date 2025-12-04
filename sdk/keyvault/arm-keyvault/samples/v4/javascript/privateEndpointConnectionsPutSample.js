// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates the specified private endpoint connection associated with the key vault.
 *
 * @summary Updates the specified private endpoint connection associated with the key vault.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/putPrivateEndpointConnection.json
 */
async function keyVaultPutPrivateEndpointConnection() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const privateEndpointConnectionName = "sample-pec";
  const properties = {
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

async function main() {
  await keyVaultPutPrivateEndpointConnection();
}

main().catch(console.error);
