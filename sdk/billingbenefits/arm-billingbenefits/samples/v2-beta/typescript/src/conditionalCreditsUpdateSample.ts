// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a conditional credit.
 *
 * @summary update a conditional credit.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditUpdate.json
 */
async function conditionalCreditUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.conditionalCredits.update(
    "resource_group_name_01",
    "conditionalCredit_20250801",
    {
      displayName: "Updated Conditional Credit 20250801",
      milestones: [
        {
          name: "Milestone 1",
          award: {
            credit: { amount: 6000, currencyCode: "USD", grain: "FullTerm" },
            duration: "P3M",
            endAt: new Date("2025-12-31T23:59:59Z"),
            startAt: new Date("2025-10-01T00:00:00Z"),
          },
          endAt: new Date("2025-09-30T23:59:59Z"),
          milestoneId: "550e8400-e29b-41d4-a716-446655440001",
          spendTarget: { amount: 60000, currencyCode: "USD" },
        },
        {
          name: "Milestone 2",
          award: {
            credit: { amount: 10000, currencyCode: "USD", grain: "FullTerm" },
            duration: "P3M",
          },
          endAt: new Date("2025-12-31T23:59:59Z"),
          milestoneId: "550e8400-e29b-41d4-a716-446655440002",
          spendTarget: { amount: 100000, currencyCode: "USD" },
        },
        {
          name: "Milestone 3",
          award: {
            credit: { amount: 15000, currencyCode: "USD", grain: "FullTerm" },
            duration: "P3M",
          },
          endAt: new Date("2026-03-31T23:59:59Z"),
          milestoneId: "550e8400-e29b-41d4-a716-446655440003",
          spendTarget: { amount: 150000, currencyCode: "USD" },
        },
      ],
      tags: { key1: "updated_value1", key3: "value3" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a conditional credit.
 *
 * @summary update a conditional credit.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditUpdateContributor.json
 */
async function conditionalCreditUpdateContributor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.conditionalCredits.update(
    "resource_group_name_02",
    "conditionalCreditContributor_20250801",
    {
      displayName: "Updated Contributor Conditional Credit 20250801",
      tags: { environment: "test", team: "finance" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await conditionalCreditUpdate();
  await conditionalCreditUpdateContributor();
}

main().catch(console.error);
