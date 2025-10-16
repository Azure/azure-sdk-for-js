// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List Content Filters types.
 *
 * @summary List Content Filters types.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListRaiContentFilters.json
 */
async function listRaiContentFilters() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "WestUS";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiContentFilters.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRaiContentFilters();
}

main().catch(console.error);
