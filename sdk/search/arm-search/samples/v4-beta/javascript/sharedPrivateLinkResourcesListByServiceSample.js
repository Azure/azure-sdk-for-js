// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all shared private link resources managed by the given service.
 *
 * @summary gets a list of all shared private link resources managed by the given service.
 * x-ms-original-file: 2025-05-01/ListSharedPrivateLinkResourcesByService.json
 */
async function listSharedPrivateLinkResourcesByService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedPrivateLinkResources.listByService(
    "rg1",
    "mysearchservice",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSharedPrivateLinkResourcesByService();
}

main().catch(console.error);
