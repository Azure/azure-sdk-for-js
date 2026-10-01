// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list MACCs under a resource group for primary service admin.
 *
 * @summary list MACCs under a resource group for primary service admin.
 * x-ms-original-file: 2025-12-01-preview/MaccsListByResourceGroup.json
 */
async function maccsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maccs.listByResourceGroup("resource_group_name_01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list MACCs under a resource group for primary service admin.
 *
 * @summary list MACCs under a resource group for primary service admin.
 * x-ms-original-file: 2025-12-01-preview/MaccsWithMilestonesListByResourceGroup.json
 */
async function maccsWithMilestonesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maccs.listByResourceGroup("resource_group_name_01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await maccsListByResourceGroup();
  await maccsWithMilestonesListByResourceGroup();
}

main().catch(console.error);
