// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private link resource for the workspace.
 *
 * @summary gets the specified private link resource for the workspace.
 * x-ms-original-file: 2026-02-01-preview/WorkspacePrivateLinkResources_Get_MaximumSet_Gen.json
 */
async function workspacePrivateLinkResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspacePrivateLinkResources.get(
    "rgdiscovery",
    "68b05b24fa2cc1a943",
    "connection",
  );
  console.log(result);
}

async function main() {
  await workspacePrivateLinkResourcesGetMaximumSet();
}

main().catch(console.error);
