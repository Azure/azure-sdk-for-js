// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private link resource for the workspace.
 *
 * @summary gets the specified private link resource for the workspace.
 * x-ms-original-file: 2026-06-01/WorkspacePrivateLinkResources_Get_MaximumSet_Gen.json
 */
async function workspacePrivateLinkResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspacePrivateLinkResources.get(
    "rgdiscovery",
    "aaee850178a948dd6e",
    "connection",
  );
  console.log(result);
}

async function main() {
  await workspacePrivateLinkResourcesGetMaximumSet();
}

main().catch(console.error);
