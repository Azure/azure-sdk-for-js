// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/ContributorEndDateUpdate.json
 */
async function contributorUpdateEndDate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    endAt: new Date("2023-07-10T00:00:00Z"),
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccAndMilestoneCommitmentUpdate.json
 */
async function maccAndMilestoneCommitmentUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    commitment: { amount: 40000, currencyCode: "USD", grain: "FullTerm" },
    milestones: [
      {
        commitment: { amount: 20000, currencyCode: "USD" },
        milestoneId: "11111111-1111-1111-1111-111111111111",
      },
      {
        commitment: { amount: 25000, currencyCode: "USD" },
        milestoneId: "22222222-2222-2222-2222-222222222222",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccAndMilestoneEndDateUpdate.json
 */
async function maccAndMilestoneEndDateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    endAt: new Date("2029-05-01T23:59:59Z"),
    milestones: [
      {
        endAt: new Date("2027-05-31T23:59:59Z"),
        milestoneId: "11111111-1111-1111-1111-111111111111",
      },
      {
        endAt: new Date("2028-05-31T23:59:59Z"),
        milestoneId: "22222222-2222-2222-2222-222222222222",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccAndMilestoneMultiPropertyUpdate.json
 */
async function maccAndMilestoneMultiPropertyUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    allowContributors: false,
    commitment: { amount: 50000, currencyCode: "USD", grain: "FullTerm" },
    displayName: "macc 20230614 updated with milestones",
    endAt: new Date("2029-10-31T23:59:59Z"),
    milestones: [
      {
        commitment: { amount: 25000, currencyCode: "USD" },
        endAt: new Date("2027-06-30T23:59:59Z"),
        milestoneId: "11111111-1111-1111-1111-111111111111",
      },
      {
        commitment: { amount: 35000, currencyCode: "USD" },
        endAt: new Date("2028-06-30T23:59:59Z"),
        milestoneId: "22222222-2222-2222-2222-222222222222",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccContributorRuleUpdate.json
 */
async function maccEndContributorRuleUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    allowContributors: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccDisplayNameUpdate.json
 */
async function maccDisplayNameUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    displayName: "Updated MACC Display Name",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccMilestoneSuppressAutomaticShortfall.json
 */
async function maccMilestoneSuppressAutomaticShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    milestones: [
      {
        automaticShortfall: "Disabled",
        automaticShortfallSuppressReason: {
          code: "CustomerRequestedSuppression",
          message: "Customer explicitly requested to disable automatic shortfall charging",
        },
        milestoneId: "11111111-1111-1111-1111-111111111111",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccMilestoneUnsuppressAutomaticShortfall.json
 */
async function maccMilestoneUnsuppressAutomaticShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    milestones: [
      { automaticShortfall: "Enabled", milestoneId: "11111111-1111-1111-1111-111111111111" },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccMultiPropertyUpdate.json
 */
async function maccMultiPropertyUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    allowContributors: false,
    commitment: { amount: 45000, currencyCode: "USD", grain: "FullTerm" },
    displayName: "macc 20230614 updated",
    endAt: new Date("2024-10-01T00:00:00Z"),
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccNoMilestonesCommitmentUpdate.json
 */
async function maccCommitmentUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    commitment: { amount: 40000, currencyCode: "USD", grain: "FullTerm" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccNoMilestonesEndDateUpdate.json
 */
async function maccEndDateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    endAt: new Date("2023-07-10T00:00:00Z"),
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccSuppressAutomaticShortfall.json
 */
async function maccSuppressAutomaticShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    automaticShortfall: "Disabled",
    automaticShortfallSuppressReason: {
      code: "CustomerRequestedSuppression",
      message: "Customer explicitly requested to disable automatic shortfall charging",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccTagsUpdate.json
 */
async function maccTagsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    tags: { key1: "value4", key2: "value5" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MaccUnsuppressAutomaticShortfall.json
 */
async function maccUnsuppressAutomaticShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    automaticShortfall: "Enabled",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MilestonesCreateOnExistingMacc.json
 */
async function milestonesCreateOnExistingMacc(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    milestones: [
      {
        commitment: { amount: 10000, currencyCode: "USD" },
        endAt: new Date("2026-05-31T23:59:59Z"),
      },
      {
        commitment: { amount: 15000, currencyCode: "USD" },
        endAt: new Date("2027-05-31T23:59:59Z"),
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update MACC.
 *
 * @summary update MACC.
 * x-ms-original-file: 2025-12-01-preview/MilestonesRemoveFromMacc.json
 */
async function milestonesRemoveFromMacc(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.maccs.update("resource_group_name_01", "macc_20230614", {
    milestones: [
      { milestoneId: "12000000-0000-0000-0000-000000000000", status: "Removed" },
      { milestoneId: "13000000-0000-0000-0000-000000000001", status: "Removed" },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await contributorUpdateEndDate();
  await maccAndMilestoneCommitmentUpdate();
  await maccAndMilestoneEndDateUpdate();
  await maccAndMilestoneMultiPropertyUpdate();
  await maccEndContributorRuleUpdate();
  await maccDisplayNameUpdate();
  await maccMilestoneSuppressAutomaticShortfall();
  await maccMilestoneUnsuppressAutomaticShortfall();
  await maccMultiPropertyUpdate();
  await maccCommitmentUpdate();
  await maccEndDateUpdate();
  await maccSuppressAutomaticShortfall();
  await maccTagsUpdate();
  await maccUnsuppressAutomaticShortfall();
  await milestonesCreateOnExistingMacc();
  await milestonesRemoveFromMacc();
}

main().catch(console.error);
