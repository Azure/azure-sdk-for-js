// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateLinkScopesClient } = require("@azure/arm-kubernetesconfiguration-privatelinkscopes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all Azure Arc PrivateLinkScopes within a subscription.
 *
 * @summary gets a list of all Azure Arc PrivateLinkScopes within a subscription.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesList.json
 */
async function privateLinkScopesListJson() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkScopes.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateLinkScopesListJson();
}

main().catch(console.error);
