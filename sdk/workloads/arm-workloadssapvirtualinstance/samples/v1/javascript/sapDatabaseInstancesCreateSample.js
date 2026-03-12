// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @summary creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_Create.json
 */
async function sapDatabaseInstancesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.create("test-rg", "X00", "databaseServer", {
    location: "westcentralus",
    properties: {},
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @summary creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_CreateForHaWithAvailabilitySet.json
 */
async function createSAPDatabaseInstancesForHASystemWithAvailabilitySet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapDatabaseInstances.create("test-rg", "X00", "databaseServer", {
    location: "westcentralus",
    properties: {},
    tags: {},
  });
  console.log(result);
}

async function main() {
  await sapDatabaseInstancesCreate();
  await createSAPDatabaseInstancesForHASystemWithAvailabilitySet();
}

main().catch(console.error);
