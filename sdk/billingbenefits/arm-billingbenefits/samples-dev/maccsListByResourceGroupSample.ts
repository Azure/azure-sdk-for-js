// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list MACCs under a resource group for primary service admin.
 *
 * @summary list MACCs under a resource group for primary service admin.
 * x-ms-original-file: 2025-12-01-preview/MaccsListByResourceGroup.json
 */
async function maccsListByResourceGroup(): Promise<void> {
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
async function maccsWithMilestonesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maccs.listByResourceGroup("resource_group_name_01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await maccsListByResourceGroup();
  await maccsWithMilestonesListByResourceGroup();
}

main().catch(console.error);
