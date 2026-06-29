// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a collection of API definitions.
 *
 * @summary returns a collection of API definitions.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_List.json
 */
async function apiDefinitionsListByApiVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiDefinitions.list(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiDefinitionsListByApiVersion();
}

main().catch(console.error);
