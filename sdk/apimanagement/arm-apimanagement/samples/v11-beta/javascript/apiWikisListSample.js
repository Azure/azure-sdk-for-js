// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the wikis for an API specified by its identifier.
 *
 * @summary gets the wikis for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiWikis.json
 */
async function apiManagementListApiWikis() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiWikis.list(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListApiWikis();
}

main().catch(console.error);
