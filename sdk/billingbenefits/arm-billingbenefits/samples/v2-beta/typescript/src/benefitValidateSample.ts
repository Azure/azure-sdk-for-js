// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateCancel.json
 */
async function conditionalCreditValidateCancel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          billingAccountResourceId:
            "/providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-000000000000:11111111-1111-1111-1111-111111111111_2025-10-28",
          entityType: "Primary",
          resourceId:
            "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/conditionalCredits/conditionalCredit_20250801",
          status: "Canceled",
          systemId: "CACO-SYSTEM-20250801",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateCreate.json
 */
async function conditionalCreditValidateCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          allowContributors: "Enabled",
          billingAccountResourceId:
            "/providers/Microsoft.Billing/billingAccounts/00000000-0000-0000-0000-000000000000:11111111-1111-1111-1111-111111111111_2025-10-28",
          displayName: "Validation Test CACO",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-03-31T23:59:59Z"),
              spendTarget: { amount: 50000, currencyCode: "USD" },
            },
            {
              name: "Milestone 2",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-06-30T23:59:59Z"),
              spendTarget: { amount: 100000, currencyCode: "USD" },
            },
          ],
          productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
          startAt: new Date("2025-12-01T00:00:00Z"),
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateCreateContributor.json
 */
async function conditionalCreditValidateCreateContributor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          displayName: "Contributor CACO Test",
          entityType: "Contributor",
          primaryResourceId:
            "/subscriptions/eef82110-c91b-4395-9420-fcfcbefc5a47/resourceGroups/primaryRG/providers/Microsoft.BillingBenefits/conditionalCredits/primaryCACO",
          productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
          startAt: new Date("2025-09-01T00:00:00Z"),
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateCreateError.json
 */
async function conditionalCreditValidateCreateError(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          allowContributors: "Enabled",
          displayName: "Invalid CACO Test",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: {
                credit: { amount: 100000, currencyCode: "USD" },
                endAt: new Date("2021-12-31T00:00:00Z"),
                startAt: new Date("2022-01-01T00:00:00Z"),
              },
              endAt: new Date("2022-12-31T00:00:00Z"),
              spendTarget: { amount: -1000, currencyCode: "INVALID" },
            },
          ],
          productCode: "b8473ce57f1d",
          startAt: new Date("2023-01-01T00:00:00Z"),
        },
      },
      {
        benefitType: "ConditionalCredits",
        properties: {
          displayName: "Invalid Contributor CACO",
          entityType: "Contributor",
          primaryBillingAccountResourceId:
            "/providers/Microsoft.Billing/billingAccounts/nonexistent",
          primaryResourceId:
            "/subscriptions/invalid/resourceGroups/invalid/providers/Microsoft.BillingBenefits/conditionalCredits/nonexistent",
          productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
          startAt: new Date("2023-01-01T00:00:00Z"),
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateCreateMultiple.json
 */
async function conditionalCreditValidateCreateMultiple(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          allowContributors: "Disabled",
          displayName: "Standard CACO",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-03-31T00:00:00Z"),
              spendTarget: { amount: 50000, currencyCode: "USD" },
            },
          ],
          productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
          startAt: new Date("2025-12-01T00:00:00Z"),
        },
      },
      {
        benefitType: "ConditionalCredits",
        properties: {
          allowContributors: "Enabled",
          displayName: "High Value CACO",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: { credit: { amount: 500000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-03-31T00:00:00Z"),
              spendTarget: { amount: 2000000, currencyCode: "USD" },
            },
          ],
          productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
          startAt: new Date("2025-12-01T00:00:00Z"),
        },
      },
      {
        benefitType: "ConditionalCredits",
        properties: {
          allowContributors: "Disabled",
          displayName: "Special Product CACO",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: { credit: { amount: 7500, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-03-31T00:00:00Z"),
              spendTarget: { amount: 75000, currencyCode: "USD" },
            },
          ],
          productCode: "000187f7-0000-0260-ab43-b8473ce57f1d",
          startAt: new Date("2025-12-01T00:00:00Z"),
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateUpdate.json
 */
async function conditionalCreditValidateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
          displayName: "Validation Test Update CACO",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-03-31T23:59:59Z"),
              milestoneId: "550e8400-e29b-41d4-a716-446655440001",
              spendTarget: { amount: 50000, currencyCode: "USD" },
            },
            {
              name: "Milestone 2",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-06-30T23:59:59Z"),
              milestoneId: "550e8400-e29b-41d4-a716-446655440002",
              spendTarget: { amount: 100000, currencyCode: "USD" },
            },
          ],
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/conditionalCredits/CACO1",
          systemId: "13810867107109237",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/ConditionalCreditValidateUpdateRemoveMilestone.json
 */
async function conditionalCreditValidateUpdateRemoveMilestone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "ConditionalCredits",
        properties: {
          billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
          displayName: "Validation Test Update CACO",
          entityType: "Primary",
          milestones: [
            {
              name: "Milestone 1",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-03-31T23:59:59Z"),
              milestoneId: "550e8400-e29b-41d4-a716-446655440001",
              spendTarget: { amount: 50000, currencyCode: "USD" },
              status: "Removed",
            },
            {
              name: "Milestone 2",
              award: { credit: { amount: 5000, currencyCode: "USD" }, duration: "P3M" },
              endAt: new Date("2026-06-30T23:59:59Z"),
              milestoneId: "550e8400-e29b-41d4-a716-446655440002",
              spendTarget: { amount: 100000, currencyCode: "USD" },
              status: "Removed",
            },
          ],
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/conditionalCredits/CACO1",
          systemId: "13810867107109237",
        },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCancel.json
 */
async function maccValidateCancel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        status: "Canceled",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCancelWithMilestones.json
 */
async function maccValidateCancelWithMilestones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        status: "Canceled",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCreate.json
 */
async function maccValidateCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 10000, currencyCode: "USD", grain: "FullTerm" },
        endAt: new Date("2024-07-31T23:59:59Z"),
        entityType: "Primary",
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/{primaryCloudSubId}/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/maccs/macc_20230614",
        startAt: new Date("2023-07-01T00:00:00Z"),
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCreateBackfilledMacc.json
 */
async function maccValidateCreateBackfilledMacc(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCreateContributor.json
 */
async function maccValidateCreateContributor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Contributor",
        primaryResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        startAt: new Date("2023-07-01T00:00:00Z"),
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCreateMilestonesOnExistingMacc.json
 */
async function maccValidateCreateMilestonesOnExistingMacc(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
        endAt: new Date("2026-07-31T23:59:59Z"),
        entityType: "Primary",
        milestones: [
          {
            commitment: { amount: 7000, currencyCode: "USD" },
            endAt: new Date("2024-10-31T23:59:59Z"),
          },
          {
            commitment: { amount: 13000, currencyCode: "USD" },
            endAt: new Date("2025-01-31T23:59:59Z"),
          },
        ],
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCreateMultiEntity.json
 */
async function maccValidateCreateMultiEntity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 10000, currencyCode: "USD", grain: "FullTerm" },
        endAt: new Date("2024-07-31T23:59:59Z"),
        entityType: "Primary",
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        startAt: new Date("2023-07-01T00:00:00Z"),
      },
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Contributor",
        primaryResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        startAt: new Date("2023-07-01T00:00:00Z"),
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateCreateNewMaccWithMilestone.json
 */
async function maccValidateCreateNewMaccWithMilestone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
        endAt: new Date("2026-07-31T23:59:59Z"),
        entityType: "Primary",
        milestones: [
          {
            commitment: { amount: 5000, currencyCode: "USD" },
            endAt: new Date("2024-07-31T23:59:59Z"),
          },
          {
            commitment: { amount: 15000, currencyCode: "USD" },
            endAt: new Date("2025-07-31T23:59:59Z"),
          },
        ],
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/{primaryCloudSubId}/resourceGroups/resource_group_name_01/providers/Microsoft.BillingBenefits/maccs/macc_20230614",
        startAt: new Date("2023-07-01T00:00:00Z"),
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdate.json
 */
async function maccValidateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
        displayName: "Test MACC Benefit",
        endAt: new Date("2030-07-31T23:59:59Z"),
        entityType: "Primary",
        milestones: [
          {
            commitment: { amount: 10000, currencyCode: "USD" },
            endAt: new Date("2024-07-31T23:59:59Z"),
            milestoneId: "11111111-1111-1111-1111-111111111111",
          },
          {
            commitment: { amount: 15000, currencyCode: "USD" },
            endAt: new Date("2027-07-31T23:59:59Z"),
            milestoneId: "22222222-2222-2222-2222-222222222222",
          },
        ],
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateCommitment.json
 */
async function maccValidateUpdateCommitment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateCommitmentEndAtContributorRule.json
 */
async function maccValidateUpdateCommitmentEndAtContributorRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 20000, currencyCode: "USD", grain: "FullTerm" },
        endAt: new Date("2024-07-31T23:59:59Z"),
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateContributor.json
 */
async function maccValidateUpdateContributor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        displayName: "Test MACC Benefit",
        endAt: new Date("2030-07-31T23:59:59Z"),
        entityType: "Contributor",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateContributorRule.json
 */
async function maccValidateUpdateContributorRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateDisplayName.json
 */
async function maccValidateUpdateDisplayName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        displayName: "Updated Macc Name",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateEndAt.json
 */
async function maccValidateUpdateEndAt(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        allowContributors: true,
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        endAt: new Date("2024-07-31T23:59:59Z"),
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateMaccAndMilestoneCommitment.json
 */
async function maccValidateUpdateMaccAndMilestoneCommitment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 50000, currencyCode: "USD", grain: "FullTerm" },
        entityType: "Primary",
        milestones: [
          {
            commitment: { amount: 20000, currencyCode: "USD" },
            milestoneId: "11111111-1111-1111-1111-111111111111",
          },
          {
            commitment: { amount: 40000, currencyCode: "USD" },
            milestoneId: "22222222-2222-2222-2222-222222222222",
          },
        ],
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateMaccAndMilestoneEndDate.json
 */
async function maccValidateUpdateMaccAndMilestoneEndDate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        endAt: new Date("2030-07-31T23:59:59Z"),
        entityType: "Primary",
        milestones: [
          {
            endAt: new Date("2027-11-30T23:59:59Z"),
            milestoneId: "11111111-1111-1111-1111-111111111111",
          },
          {
            endAt: new Date("2029-02-28T23:59:59Z"),
            milestoneId: "22222222-2222-2222-2222-222222222222",
          },
        ],
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateMilestoneCommitment.json
 */
async function maccValidateUpdateMilestoneCommitment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        commitment: { amount: 50000, currencyCode: "USD", grain: "FullTerm" },
        entityType: "Primary",
        milestones: [
          {
            commitment: { amount: 20000, currencyCode: "USD" },
            milestoneId: "11111111-1111-1111-1111-111111111111",
          },
          {
            commitment: { amount: 40000, currencyCode: "USD" },
            milestoneId: "22222222-2222-2222-2222-222222222222",
          },
        ],
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateMilestoneEndDate.json
 */
async function maccValidateUpdateMilestoneEndDate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        endAt: new Date("2030-07-31T23:59:59Z"),
        entityType: "Primary",
        milestones: [
          {
            endAt: new Date("2027-11-30T23:59:59Z"),
            milestoneId: "11111111-1111-1111-1111-111111111111",
          },
          {
            endAt: new Date("2029-02-28T23:59:59Z"),
            milestoneId: "22222222-2222-2222-2222-222222222222",
          },
        ],
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateRemoveMilestones.json
 */
async function maccValidateUpdateRemoveMilestones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        milestones: [
          { milestoneId: "11111111-1111-1111-1111-111111111111", status: "Removed" },
          { milestoneId: "22222222-2222-2222-2222-222222222222", status: "Removed" },
        ],
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateSuppressShortfall.json
 */
async function maccValidateUpdateSuppressShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        automaticShortfall: "Disabled",
        automaticShortfallSuppressReason: {
          code: "CustomerRequest",
          message: "Customer requested to suppress automatic shortfall",
        },
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateSuppressShortfallOnMilestone.json
 */
async function maccValidateUpdateSuppressShortfallOnMilestone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        milestones: [
          {
            automaticShortfall: "Disabled",
            automaticShortfallSuppressReason: {
              code: "CustomerRequest",
              message: "Customer requested to suppress automatic shortfall",
            },
            milestoneId: "11111111-1111-1111-1111-111111111111",
          },
        ],
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateUnsuppressShortfall.json
 */
async function maccValidateUpdateUnsuppressShortfall(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        automaticShortfall: "Enabled",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/benefits/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateUpdateUnsuppressShortfallOnMilestone.json
 */
async function maccValidateUpdateUnsuppressShortfallOnMilestone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        milestones: [
          { automaticShortfall: "Enabled", milestoneId: "11111111-1111-1111-1111-111111111111" },
        ],
        productCode: "0001d726-0000-0160-330f-a0b98cdbbdc4",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/MaccValidateWriteOffWithMilestones.json
 */
async function maccValidateWriteOffWithMilestones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "MACC",
        billingAccountResourceId: "/providers/Microsoft.Billing/billingAccounts/{acctId:orgId}",
        entityType: "Primary",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.BillingBenefits/maccs/myBenefit",
        status: "PendingSettlement",
        systemId: "13810867107109237",
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validate savings plan purchase.
 *
 * @summary validate savings plan purchase.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanValidatePurchase.json
 */
async function savingsPlanValidatePurchase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.benefit.validate({
    benefits: [
      {
        benefitType: "SavingsPlan",
        appliedScopeProperties: {
          resourceGroupId:
            "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/testrg",
        },
        appliedScopeType: "Single",
        billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
        commitment: { amount: 15.23, currencyCode: "USD", grain: "Hourly" },
        displayName: "ComputeSavingsPlan_2021-07-01",
        term: "P1Y",
        sku: { name: "Compute_Savings_Plan" },
      },
      {
        benefitType: "SavingsPlan",
        appliedScopeProperties: {
          resourceGroupId: "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/RG",
        },
        appliedScopeType: "Single",
        billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
        commitment: { amount: 20, currencyCode: "USD", grain: "Hourly" },
        displayName: "ComputeSavingsPlan_2021-07-01",
        term: "P1Y",
        sku: { name: "Compute_Savings_Plan" },
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await conditionalCreditValidateCancel();
  await conditionalCreditValidateCreate();
  await conditionalCreditValidateCreateContributor();
  await conditionalCreditValidateCreateError();
  await conditionalCreditValidateCreateMultiple();
  await conditionalCreditValidateUpdate();
  await conditionalCreditValidateUpdateRemoveMilestone();
  await maccValidateCancel();
  await maccValidateCancelWithMilestones();
  await maccValidateCreate();
  await maccValidateCreateBackfilledMacc();
  await maccValidateCreateContributor();
  await maccValidateCreateMilestonesOnExistingMacc();
  await maccValidateCreateMultiEntity();
  await maccValidateCreateNewMaccWithMilestone();
  await maccValidateUpdate();
  await maccValidateUpdateCommitment();
  await maccValidateUpdateCommitmentEndAtContributorRule();
  await maccValidateUpdateContributor();
  await maccValidateUpdateContributorRule();
  await maccValidateUpdateDisplayName();
  await maccValidateUpdateEndAt();
  await maccValidateUpdateMaccAndMilestoneCommitment();
  await maccValidateUpdateMaccAndMilestoneEndDate();
  await maccValidateUpdateMilestoneCommitment();
  await maccValidateUpdateMilestoneEndDate();
  await maccValidateUpdateRemoveMilestones();
  await maccValidateUpdateSuppressShortfall();
  await maccValidateUpdateSuppressShortfallOnMilestone();
  await maccValidateUpdateUnsuppressShortfall();
  await maccValidateUpdateUnsuppressShortfallOnMilestone();
  await maccValidateWriteOffWithMilestones();
  await savingsPlanValidatePurchase();
}

main().catch(console.error);
