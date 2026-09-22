// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all Log Analytics QueryPacks within a subscription.
 *
 * @summary gets a list of all Log Analytics QueryPacks within a subscription.
 * x-ms-original-file: 2025-07-01/QueryPacksList.json
 */
async function queryPacksList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queryPacks.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryPacksList();
}

main().catch(console.error);
