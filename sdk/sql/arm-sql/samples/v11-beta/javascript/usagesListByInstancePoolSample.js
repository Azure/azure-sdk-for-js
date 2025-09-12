// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all instance pool usage metrics
 *
 * @summary Gets all instance pool usage metrics
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/ListInstancePoolUsageExpanded.json
 */
async function listInstancePoolUsagesExpandedWithChildren() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const instancePoolName = "testIP";
  const expandChildren = true;
  const options = { expandChildren };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByInstancePool(
    resourceGroupName,
    instancePoolName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets all instance pool usage metrics
 *
 * @summary Gets all instance pool usage metrics
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-02-01-preview/examples/ListInstancePoolUsage.json
 */
async function listInstancePoolUsages() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const instancePoolName = "testIP";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByInstancePool(resourceGroupName, instancePoolName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listInstancePoolUsagesExpandedWithChildren();
  await listInstancePoolUsages();
}

main().catch(console.error);
