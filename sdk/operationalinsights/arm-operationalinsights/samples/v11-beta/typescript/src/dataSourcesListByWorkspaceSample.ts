// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the first page of data source instances in a workspace with the link to the next page.
 *
 * @summary gets the first page of data source instances in a workspace with the link to the next page.
 * x-ms-original-file: 2025-07-01/DataSourcesListByWorkspace.json
 */
async function dataSourcesListByWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataSources.listByWorkspace(
    "OIAutoRest5123",
    "AzTest9724",
    "kind='WindowsEvent'",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dataSourcesListByWorkspace();
}

main().catch(console.error);
