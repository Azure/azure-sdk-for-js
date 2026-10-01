// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OrganizationResource resources by resource group
 *
 * @summary list OrganizationResource resources by resource group
 * x-ms-original-file: 2025-12-24-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
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
 * x-ms-original-file: 2025-12-24-preview/Organizations_ListByResourceGroup_MinimumSet_Gen.json
 */
async function organizationsListByResourceGroupMinimumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListByResourceGroupMaximumSetGeneratedByMaximumSetRule();
  await organizationsListByResourceGroupMinimumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
