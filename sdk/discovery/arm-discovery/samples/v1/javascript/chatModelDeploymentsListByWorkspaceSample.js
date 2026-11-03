// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ChatModelDeployment resources by Workspace
 *
 * @summary list ChatModelDeployment resources by Workspace
 * x-ms-original-file: 2026-06-01/ChatModelDeployments_ListByWorkspace_MaximumSet_Gen.json
 */
async function chatModelDeploymentsListByWorkspaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.chatModelDeployments.listByWorkspace(
    "rgdiscovery",
    "0f2d15df9509076ccf",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await chatModelDeploymentsListByWorkspaceMaximumSet();
}

main().catch(console.error);
