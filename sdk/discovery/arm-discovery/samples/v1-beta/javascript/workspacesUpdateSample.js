// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Workspace
 *
 * @summary update a Workspace
 * x-ms-original-file: 2026-02-01-preview/Workspaces_Update_MaximumSet_Gen.json
 */
async function workspacesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgdiscovery", "43ac331aecf462b646", {
    properties: {
      supercomputerIds: [
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/resourceGroups/rgdiscovery/providers/Microsoft.Discovery/supercomputers/supercomputer12",
      ],
      keyVaultProperties: {
        keyName: "oxxinrlglrdihfqjrpkjc",
        keyVersion: "xbvilcphokrwachseulvwywaekfh",
      },
      publicNetworkAccess: "Enabled",
    },
    tags: { key6612: "ca" },
  });
  console.log(result);
}

async function main() {
  await workspacesUpdateMaximumSet();
}

main().catch(console.error);
