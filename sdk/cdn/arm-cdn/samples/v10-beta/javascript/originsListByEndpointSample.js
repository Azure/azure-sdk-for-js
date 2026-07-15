// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the existing origins within an endpoint.
 *
 * @summary lists all of the existing origins within an endpoint.
 * x-ms-original-file: 2025-12-01/Origins_ListByEndpoint.json
 */
async function originsListByEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.origins.listByEndpoint("RG", "profile1", "endpoint1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await originsListByEndpoint();
}

main().catch(console.error);
