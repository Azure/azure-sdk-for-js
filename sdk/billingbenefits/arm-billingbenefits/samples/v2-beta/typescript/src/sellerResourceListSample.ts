// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list maccs by billing account
 *
 * @summary list maccs by billing account
 * x-ms-original-file: 2025-12-01-preview/MaccSellerViewContributors.json
 */
async function sellerViewContributors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.sellerResource.list({
    filter: "properties/status ne 'Canceled'",
    billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
    contributors: true,
    primaryResourceId:
      "/subscriptions/{primaryCloudSubId}/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/maccs/macc_20230614",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list maccs by billing account
 *
 * @summary list maccs by billing account
 * x-ms-original-file: 2025-12-01-preview/MaccSellerViewContributorsWithMilestones.json
 */
async function sellerViewContributorsWithMilestones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.sellerResource.list({
    filter: "properties/status ne 'Canceled'",
    billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
    contributors: true,
    milestones: true,
    primaryResourceId:
      "/subscriptions/{primaryCloudSubId}/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/maccs/macc_20230614",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list maccs by billing account
 *
 * @summary list maccs by billing account
 * x-ms-original-file: 2025-12-01-preview/MaccSellerViewContributorsWithMilestonesAndShortfall.json
 */
async function sellerViewContributorsWithMilestonesAndShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.sellerResource.list({
    filter: "properties/status ne 'Canceled'",
    billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
    contributors: true,
    milestones: true,
    primaryResourceId:
      "/subscriptions/{primaryCloudSubId}/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/maccs/macc_20230614",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list maccs by billing account
 *
 * @summary list maccs by billing account
 * x-ms-original-file: 2025-12-01-preview/MaccSellerViewNoContributors.json
 */
async function sellerViewNoContributors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.sellerResource.list({
    filter: "properties/status ne 'Canceled'",
    billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list maccs by billing account
 *
 * @summary list maccs by billing account
 * x-ms-original-file: 2025-12-01-preview/MaccSellerViewWithMilestonesNoContributors.json
 */
async function sellerViewWithMilestonesNoContributors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.sellerResource.list({
    filter: "properties/status ne 'Canceled'",
    billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
    milestones: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sellerViewContributors();
  await sellerViewContributorsWithMilestones();
  await sellerViewContributorsWithMilestonesAndShortfall();
  await sellerViewNoContributors();
  await sellerViewWithMilestonesNoContributors();
}

main().catch(console.error);
