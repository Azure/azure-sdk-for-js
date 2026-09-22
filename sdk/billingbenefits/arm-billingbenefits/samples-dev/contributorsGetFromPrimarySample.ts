// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a contributor for primary service admin
 *
 * @summary get a contributor for primary service admin
 * x-ms-original-file: 2025-12-01-preview/ContributorGetFromPrimary.json
 */
async function contributorGetFromPrimary(): Promise<void> {
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
async function contributorGetFromPrimaryWithMilestonesAndShortfall(): Promise<void> {
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
async function contributorGetFromPrimaryWithMilestones(): Promise<void> {
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

async function main(): Promise<void> {
  await contributorGetFromPrimary();
  await contributorGetFromPrimaryWithMilestonesAndShortfall();
  await contributorGetFromPrimaryWithMilestones();
}

main().catch(console.error);
