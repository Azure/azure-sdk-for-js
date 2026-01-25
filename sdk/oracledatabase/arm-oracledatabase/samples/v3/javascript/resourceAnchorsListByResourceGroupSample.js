// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ResourceAnchor resources by resource group
 *
 * @summary list ResourceAnchor resources by resource group
 * x-ms-original-file: 2025-09-01/ResourceAnchors_ListByResourceGroup_MaximumSet_Gen.json
 */
async function resourceAnchorsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceAnchors.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ResourceAnchor resources by resource group
 *
 * @summary list ResourceAnchor resources by resource group
 * x-ms-original-file: 2025-09-01/ResourceAnchors_ListByResourceGroup_MinimumSet_Gen.json
 */
async function resourceAnchorsListByResourceGroupMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceAnchors.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await resourceAnchorsListByResourceGroupMaximumSet();
  await resourceAnchorsListByResourceGroupMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
