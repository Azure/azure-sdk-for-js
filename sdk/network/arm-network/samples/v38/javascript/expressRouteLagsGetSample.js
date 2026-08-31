// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the requested ExpressRouteLag resource.
 *
 * @summary retrieves the requested ExpressRouteLag resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagGet.json
 */
async function getExpressRouteLag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.get("rg1", "lagName");
  console.log(result);
}

async function main() {
  await getExpressRouteLag();
}

main().catch(console.error);
