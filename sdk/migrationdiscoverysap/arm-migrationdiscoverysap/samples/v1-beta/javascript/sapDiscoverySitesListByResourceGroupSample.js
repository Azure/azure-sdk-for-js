// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all SAP Migration discovery site resources in a Resource Group.
 *
 * @summary Gets all SAP Migration discovery site resources in a Resource Group.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ListByResourceGroup.json
 */

const { WorkloadsClient } = require("@azure/arm-migrationdiscoverysap");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listSapMigrationDiscoverySiteResourcesByResourceGroup() {
  const subscriptionId =
    process.env["MIGRATIONDISCOVERY_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["MIGRATIONDISCOVERY_RESOURCE_GROUP"] || "test-rg";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sapDiscoverySites.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listSapMigrationDiscoverySiteResourcesByResourceGroup();
}

main().catch(console.error);
