// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Tags associated with the API.
 *
 * @summary lists all Tags associated with the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiTags.json
 */
async function apiManagementListApiTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tag.listByApi(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListApiTags();
}

main().catch(console.error);
