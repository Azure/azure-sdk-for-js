// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all scoped resources on a private link scope.
 *
 * @summary gets all scoped resources on a private link scope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopedResourceList.json
 */
async function getsListOfScopedResourcesInAPrivateLinkScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkScopedResources.listByPrivateLinkScope(
    "MyResourceGroup",
    "MyPrivateLinkScope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all scoped resources on a private link scope.
 *
 * @summary gets all scoped resources on a private link scope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopedResourceListKindFilter.json
 */
async function getsListOfScopedResourcesInAPrivateLinkScopeFilteredByKind() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkScopedResources.listByPrivateLinkScope(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    { kind: "Resource" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsListOfScopedResourcesInAPrivateLinkScope();
  await getsListOfScopedResourcesInAPrivateLinkScopeFilteredByKind();
}

main().catch(console.error);
