// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Queries defined within a Log Analytics QueryPack.
 *
 * @summary gets a list of Queries defined within a Log Analytics QueryPack.
 * x-ms-original-file: 2025-07-01/QueryPackQueriesList.json
 */
async function queryList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queries.list("my-resource-group", "my-querypack", {
    includeBody: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryList();
}

main().catch(console.error);
