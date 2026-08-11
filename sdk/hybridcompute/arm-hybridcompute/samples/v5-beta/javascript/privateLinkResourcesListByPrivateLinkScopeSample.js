// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @summary gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: 2026-06-16-preview/privateLinkScope/PrivateLinkScopePrivateLinkResource_ListGet.json
 */
async function getsPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByPrivateLinkScope(
    "myResourceGroup",
    "myPrivateLinkScope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
