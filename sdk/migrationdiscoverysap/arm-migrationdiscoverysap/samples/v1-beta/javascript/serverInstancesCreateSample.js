// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates the Server Instance resource. <br><br>;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 *
 * @summary Creates the Server Instance resource. <br><br>;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Create.json
 */

const { WorkloadsClient } = require("@azure/arm-migrationdiscoverysap");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function createsTheServerInstanceResource() {
  const subscriptionId =
    process.env["MIGRATIONDISCOVERY_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["MIGRATIONDISCOVERY_RESOURCE_GROUP"] || "test-rg";
  const sapDiscoverySiteName = "SampleSite";
  const sapInstanceName = "MPP_MPP";
  const serverInstanceName = "APP_SapServer1";
  const resource = {};
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.serverInstances.beginCreateAndWait(
    resourceGroupName,
    sapDiscoverySiteName,
    sapInstanceName,
    serverInstanceName,
    resource,
  );
  console.log(result);
}

async function main() {
  await createsTheServerInstanceResource();
}

main().catch(console.error);
