// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the specified ExpressRouteLink resource.
 *
 * @summary retrieves the specified ExpressRouteLink resource.
 * x-ms-original-file: 2025-05-01/ExpressRouteLinkGet.json
 */
async function expressRouteLinkGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLinks.get("rg1", "portName", "linkName");
  console.log(result);
}

async function main() {
  await expressRouteLinkGet();
}

main().catch(console.error);
