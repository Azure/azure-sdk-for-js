// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateLinkScopesClient } = require("@azure/arm-kubernetesconfiguration-privatelinkscopes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @summary gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopePrivateLinkResourceListGet.json
 */
async function getsPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByPrivateLinkScope(
    "myResourceGroup",
    "myPrivateLinkScope",
  );
  console.log(result);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
