// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/ContributorGet.json
 */
async function contributorGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_02", "macc_contributor_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/ContributorWithMilestonesAndShortfallGet.json
 */
async function contributorWithMilestonesAndShortfallGetFromPrimary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_02", "macc_contributor_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/ContributorWithMilestonesGet.json
 */
async function contributorWithMilestonesGetFromPrimary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_02", "macc_contributor_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccGet.json
 */
async function maccGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_01", "macc_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccWithMilestonesAndShortfallGet.json
 */
async function maccWithMilestonesAndShortfallGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_01", "macc_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccWithMilestonesGet.json
 */
async function maccWithMilestonesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_01", "macc_20230614");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MACC.
 *
 * @summary get a MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccWithShortfallGet.json
 */
async function maccWithShortfallGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.get("resource_group_name_01", "macc_20230614");
  console.log(result);
}

async function main(): Promise<void> {
  await contributorGet();
  await contributorWithMilestonesAndShortfallGetFromPrimary();
  await contributorWithMilestonesGetFromPrimary();
  await maccGet();
  await maccWithMilestonesAndShortfallGet();
  await maccWithMilestonesGet();
  await maccWithShortfallGet();
}

main().catch(console.error);
