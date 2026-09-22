// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to search a list of Queries defined within a Log Analytics QueryPack according to given search properties.
 *
 * @summary search a list of Queries defined within a Log Analytics QueryPack according to given search properties.
 * x-ms-original-file: 2025-07-01/QueryPackQueriesSearch.json
 */
async function querySearch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queries.listSearch(
    "my-resource-group",
    "my-querypack",
    { related: { categories: ["other", "analytics"] }, tags: { "my-label": ["label1"] } },
    { top: 3, includeBody: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await querySearch();
}

main().catch(console.error);
