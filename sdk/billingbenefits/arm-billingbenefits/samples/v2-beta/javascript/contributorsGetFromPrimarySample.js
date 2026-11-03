// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a contributor for primary service admin
 *
 * @summary get a contributor for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorGetFromPrimary.json
 */
async function contributorGetFromPrimary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.contributors.getFromPrimary(
    "resource_group_name_01",
    "macc_20230614",
    "macc_contributor_20230614",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a contributor for primary service admin
 *
 * @summary get a contributor for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorWithMilestonesAndShortfallGetFromPrimary.json
 */
async function contributorGetFromPrimaryWithMilestonesAndShortfall() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.contributors.getFromPrimary(
    "resource_group_name_01",
    "macc_20230614",
    "macc_contributor_20230614",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a contributor for primary service admin
 *
 * @summary get a contributor for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorWithMilestonesGetFromPrimary.json
 */
async function contributorGetFromPrimaryWithMilestones() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.contributors.getFromPrimary(
    "resource_group_name_01",
    "macc_20230614",
    "macc_contributor_20230614",
  );
  console.log(result);
}

async function main() {
  await contributorGetFromPrimary();
  await contributorGetFromPrimaryWithMilestonesAndShortfall();
  await contributorGetFromPrimaryWithMilestones();
}

main().catch(console.error);
