// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Project resources by Workspace
 *
 * @summary list Project resources by Workspace
 * x-ms-original-file: 2026-06-01/Projects_ListByWorkspace_MaximumSet_Gen.json
 */
async function projectsListByWorkspaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.listByWorkspace("rgdiscovery", "7712974a18ec06d5e6")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectsListByWorkspaceMaximumSet();
}

main().catch(console.error);
