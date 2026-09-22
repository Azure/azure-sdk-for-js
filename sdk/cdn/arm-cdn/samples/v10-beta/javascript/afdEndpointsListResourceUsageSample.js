// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 *
 * @summary checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 * x-ms-original-file: 2025-12-01/AFDEndpoints_ListResourceUsage.json
 */
async function afdEndpointsListResourceUsage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.afdEndpoints.listResourceUsage("RG", "profile1", "endpoint1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await afdEndpointsListResourceUsage();
}

main().catch(console.error);
