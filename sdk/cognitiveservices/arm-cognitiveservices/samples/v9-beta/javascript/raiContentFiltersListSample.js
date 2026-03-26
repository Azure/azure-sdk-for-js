// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Content Filters types.
 *
 * @summary list Content Filters types.
 * x-ms-original-file: 2026-01-15-preview/ListRaiContentFilters.json
 */
async function listRaiContentFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiContentFilters.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiContentFilters();
}

main().catch(console.error);
