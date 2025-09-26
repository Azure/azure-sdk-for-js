// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list FlexComponent resources by SubscriptionLocationResource
 *
 * @summary list FlexComponent resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/FlexComponents_ListByParent_MaximumSet_Gen.json
 */
async function flexComponentsListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.flexComponents.listByParent("eastus", {
    shape: "Exadata.X9M",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list FlexComponent resources by SubscriptionLocationResource
 *
 * @summary list FlexComponent resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/FlexComponents_ListByParent_MinimumSet_Gen.json
 */
async function flexComponentsListByParentMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.flexComponents.listByParent("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await flexComponentsListByParentMaximumSet();
  await flexComponentsListByParentMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
