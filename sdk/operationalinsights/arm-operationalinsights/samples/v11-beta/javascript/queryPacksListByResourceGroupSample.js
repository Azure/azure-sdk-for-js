// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Log Analytics QueryPacks within a resource group.
 *
 * @summary gets a list of Log Analytics QueryPacks within a resource group.
 * x-ms-original-file: 2025-07-01/QueryPacksListByResourceGroup.json
 */
async function queryPackListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queryPacks.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await queryPackListByResourceGroup();
}

main().catch(console.error);
