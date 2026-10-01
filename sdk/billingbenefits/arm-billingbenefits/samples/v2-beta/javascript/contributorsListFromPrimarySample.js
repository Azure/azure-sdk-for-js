// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list contributors under a MACC for primary service admin
 *
 * @summary list contributors under a MACC for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorsListFromPrimary.json
 */
async function contributorsListFromPrimary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contributors.listFromPrimary(
    "resource_group_name_01",
    "macc_20230614",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list contributors under a MACC for primary service admin
 *
 * @summary list contributors under a MACC for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorsWithMilestonesAndShortfallListFromPrimary.json
 */
async function contributorsWithMilestonesAndShortfallListFromPrimary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contributors.listFromPrimary(
    "resource_group_name_01",
    "macc_20230614",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list contributors under a MACC for primary service admin
 *
 * @summary list contributors under a MACC for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorsWithMilestonesListFromPrimary.json
 */
async function contributorsWithMilestonesListFromPrimary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contributors.listFromPrimary(
    "resource_group_name_01",
    "macc_20230614",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await contributorsListFromPrimary();
  await contributorsWithMilestonesAndShortfallListFromPrimary();
  await contributorsWithMilestonesListFromPrimary();
}

main().catch(console.error);
