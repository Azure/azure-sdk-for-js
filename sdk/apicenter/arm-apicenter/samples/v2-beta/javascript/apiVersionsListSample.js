// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a collection of API versions.
 *
 * @summary returns a collection of API versions.
 * x-ms-original-file: 2024-06-01-preview/ApiVersions_List.json
 */
async function apiVersionsListByApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiVersions.list(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiVersionsListByApi();
}

main().catch(console.error);
