// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CommvaultPlan
 *
 * @summary create a CommvaultPlan
 * x-ms-original-file: 2026-07-03-preview/Plans_CreateOrupdate_MaximumSet_Gen.json
 */
async function plansCreateOrupdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.plans.createOrupdate(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-planName",
    {
      properties: {
        location: "igaxdfxtzecvxlzgdxzuq",
        storagePlans: [
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
          {
            name: "tllxzjnfcdb",
            storagePoolId: "ccxxkrvgfhdzqq",
            copyName: "lzhgzjlilwqgrvxsajtxwbrs",
            copyPrecedence: 14,
            retentionPeriod: 21,
            retentionTime: "monthly",
            backupRuleType: "ALL_JOBS",
            extendedRetention: [
              { retentionTime: "monthly", retentionPeriod: 10, backupRuleType: "ALL_JOBS" },
            ],
          },
        ],
        schedules: [
          {
            backupType: "INCREMENTAL",
            frequency: "daily",
            runsEvery: 17,
            weekOfMonth: "FIRST",
            dayOfWeek: "SUNDAY",
            monthOfYear: "JANUARY",
            dayOfMonth: 25,
            weeklyDays: ["SUNDAY"],
            time: "xrkimwcrnltnhiotzdguqjddo",
            timeZone: "tvcpczczysengkxzqfy",
          },
          {
            backupType: "INCREMENTAL",
            frequency: "daily",
            runsEvery: 17,
            weekOfMonth: "FIRST",
            dayOfWeek: "SUNDAY",
            monthOfYear: "JANUARY",
            dayOfMonth: 25,
            weeklyDays: ["SUNDAY"],
            time: "xrkimwcrnltnhiotzdguqjddo",
            timeZone: "tvcpczczysengkxzqfy",
          },
        ],
        retention: { numberOfSnapshots: 1 },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await plansCreateOrupdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
