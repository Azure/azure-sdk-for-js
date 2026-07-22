// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks the quota and usage of geo filters and custom domains under the given endpoint.
 *
 * @summary checks the quota and usage of geo filters and custom domains under the given endpoint.
 * x-ms-original-file: 2025-12-01/Endpoints_ListResourceUsage.json
 */
async function endpointsListResourceUsage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoints.listResourceUsage("RG", "profile1", "endpoint1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await endpointsListResourceUsage();
}

main().catch(console.error);
