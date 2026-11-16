// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Workspace
 *
 * @summary update a Workspace
 * x-ms-original-file: 2026-06-01/Workspaces_Update_MaximumSet_Gen.json
 */
async function workspacesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspaces.update("rgdiscovery", "0b14055ab26dbe3f27", {
    properties: {
      supercomputerIds: [
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/resourceGroups/rgdiscovery/providers/Microsoft.Discovery/supercomputers/supercomputer12",
      ],
      keyVaultProperties: { keyName: "lcbvobtzwghifm", keyVersion: "vlwzjsyqztmmxdbc" },
      publicNetworkAccess: "Enabled",
    },
    tags: { key133: "q" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesUpdateMaximumSet();
}

main().catch(console.error);
