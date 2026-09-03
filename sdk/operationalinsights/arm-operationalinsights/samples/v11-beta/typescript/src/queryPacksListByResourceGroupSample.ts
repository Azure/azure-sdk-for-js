// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Log Analytics QueryPacks within a resource group.
 *
 * @summary gets a list of Log Analytics QueryPacks within a resource group.
 * x-ms-original-file: 2025-07-01/QueryPacksListByResourceGroup.json
 */
async function queryPackListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queryPacks.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queryPackListByResourceGroup();
}

main().catch(console.error);
