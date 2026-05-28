// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2025-07-01/QueryPackUpdateNoName.json
 */
async function queryPackUpdateNoName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queryPacks.createOrUpdateWithoutName("my-resource-group", {
    location: "South Central US",
    tags: { Tag1: "Value1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @summary creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 * x-ms-original-file: 2025-07-01/QueryPacksCreateNoName.json
 */
async function queryPackCreateNoName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queryPacks.createOrUpdateWithoutName("my-resource-group", {
    location: "South Central US",
  });
  console.log(result);
}

async function main() {
  await queryPackUpdateNoName();
  await queryPackCreateNoName();
}

main().catch(console.error);
