// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OrganizationResource resources by resource group
 *
 * @summary list OrganizationResource resources by resource group
 * x-ms-original-file: 2025-06-01/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4AFC1287-D389-4265-B2D4-59B96A45CACC";
  const client = new AtlasClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list OrganizationResource resources by resource group
 *
 * @summary list OrganizationResource resources by resource group
 * x-ms-original-file: 2025-06-01/Organizations_ListByResourceGroup_MinimumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "422A4D59-A5BC-4DBB-8831-EC666633F64F";
  const client = new AtlasClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListByResourceGroupMaximumSet();
  await organizationsListByResourceGroupMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
