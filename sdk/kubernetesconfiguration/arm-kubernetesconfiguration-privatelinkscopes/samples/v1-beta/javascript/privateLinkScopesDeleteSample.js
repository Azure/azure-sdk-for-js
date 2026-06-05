// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateLinkScopesClient } = require("@azure/arm-kubernetesconfiguration-privatelinkscopes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Azure Arc PrivateLinkScope.
 *
 * @summary deletes a Azure Arc PrivateLinkScope.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesDelete.json
 */
async function privateLinkScopesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  await client.privateLinkScopes.delete("my-resource-group", "my-privatelinkscope");
}

async function main() {
  await privateLinkScopesDelete();
}

main().catch(console.error);
