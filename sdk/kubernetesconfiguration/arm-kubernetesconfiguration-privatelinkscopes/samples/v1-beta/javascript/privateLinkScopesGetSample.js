// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateLinkScopesClient } = require("@azure/arm-kubernetesconfiguration-privatelinkscopes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a Azure Arc PrivateLinkScope.
 *
 * @summary returns a Azure Arc PrivateLinkScope.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesGet.json
 */
async function privateLinkScopeGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.get("my-resource-group", "my-privatelinkscope");
  console.log(result);
}

async function main() {
  await privateLinkScopeGet();
}

main().catch(console.error);
