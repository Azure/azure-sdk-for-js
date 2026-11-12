// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a SAP Migration discovery site resource.
 *
 * @summary Updates a SAP Migration discovery site resource.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Update.json
 */

const { WorkloadsClient } = require("@azure/arm-migrationdiscoverysap");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function updatesASapMigrationDiscoverySiteResource() {
  const subscriptionId =
    process.env["MIGRATIONDISCOVERY_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["MIGRATIONDISCOVERY_RESOURCE_GROUP"] || "test-rg";
  const sapDiscoverySiteName = "SampleSite";
  const properties = { tags: { tag1: "value1" } };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDiscoverySites.update(
    resourceGroupName,
    sapDiscoverySiteName,
    properties,
  );
  console.log(result);
}

async function main() {
  await updatesASapMigrationDiscoverySiteResource();
}

main().catch(console.error);
