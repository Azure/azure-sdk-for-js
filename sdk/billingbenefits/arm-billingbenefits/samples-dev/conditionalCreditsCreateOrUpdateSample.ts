// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a conditional credit.
 *
 * @summary create or update a conditional credit.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditCreateContributor.json
 */
async function conditionalCreditCreateContributor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.conditionalCredits.createOrUpdate(
    "resource_group_name_02",
    "conditionalCredit_contributor_20250801",
    {
      location: "global",
      properties: {
        displayName: "Contributor Conditional Credit 20250801",
        entityType: "Contributor",
        primaryResourceId:
          "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/conditionalCredits/conditionalCredit_20250801",
        productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
        startAt: new Date("2025-09-01T00:00:00Z"),
      },
      tags: { environment: "dev", team: "finance" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a conditional credit.
 *
 * @summary create or update a conditional credit.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditCreatePrimary.json
 */
async function conditionalCreditCreatePrimary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10000000-0000-0000-0000-000000000000";
  const client = new BillingBenefitsRP(credential, subscriptionId);
  const result = await client.conditionalCredits.createOrUpdate(
    "resource_group_name_01",
    "conditionalCredit_20250801",
    {
      location: "global",
      properties: {
        allowContributors: "Enabled",
        displayName: "Conditional Credit 20250801",
        entityType: "Primary",
        milestones: [
          {
            name: "Milestone 1",
            award: {
              credit: { amount: 5000, currencyCode: "USD", grain: "FullTerm" },
              duration: "P3M",
            },
            endAt: new Date("2025-09-30T23:59:59Z"),
            spendTarget: { amount: 50000, currencyCode: "USD" },
          },
          {
            name: "Milestone 2",
            award: {
              credit: { amount: 10000, currencyCode: "USD", grain: "FullTerm" },
              duration: "P3M",
            },
            endAt: new Date("2025-12-31T23:59:59Z"),
            spendTarget: { amount: 100000, currencyCode: "USD" },
          },
        ],
        productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
        startAt: new Date("2025-07-01T00:00:00Z"),
      },
      tags: { key1: "value1", key2: "value2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await conditionalCreditCreateContributor();
  await conditionalCreditCreatePrimary();
}

main().catch(console.error);
