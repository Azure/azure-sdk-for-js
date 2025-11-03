// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the private endpoint connections associated with the vault.
 *
 * @summary the List operation gets information about the private endpoint connections associated with the vault.
 * x-ms-original-file: 2025-05-01/listPrivateEndpointConnection.json
 */
async function keyVaultListPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByResource(
    "sample-group",
    "sample-vault",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await keyVaultListPrivateEndpointConnection();
}

main().catch(console.error);
