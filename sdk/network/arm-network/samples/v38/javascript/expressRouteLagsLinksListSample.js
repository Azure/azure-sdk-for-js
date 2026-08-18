// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the ExpressRouteLagLink sub-resources of the specified ExpressRouteLag resource.
 *
 * @summary retrieve the ExpressRouteLagLink sub-resources of the specified ExpressRouteLag resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagLinkList.json
 */
async function listExpressRouteLagLinks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLags.linksList("rg1", "lagName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressRouteLagLinks();
}

main().catch(console.error);
