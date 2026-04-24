// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a backup policy belonging to a backup vault
 *
 * @summary creates or Updates a backup policy belonging to a backup vault
 * x-ms-original-file: 2025-07-01/PolicyCRUD/CreateOrUpdateBackupPolicy.json
 */
async function createOrUpdateBackupPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupPolicies.createOrUpdate(
    "000pikumar",
    "PrivatePreviewVault",
    "OSSDBPolicy",
    {
      properties: {
        datasourceTypes: ["OssDB"],
        objectType: "BackupPolicy",
        policyRules: [
          {
            name: "BackupWeekly",
            backupParameters: {
              backupType: "Full",
              objectType: "AzureBackupParams",
            },
            dataStore: {
              dataStoreType: "VaultStore",
              objectType: "DataStoreInfoBase",
            },
            objectType: "AzureBackupRule",
            trigger: {
              objectType: "ScheduleBasedTriggerContext",
              schedule: {
                repeatingTimeIntervals: ["R/2019-11-20T08:00:00-08:00/P1W"],
              },
              taggingCriteria: [
                {
                  isDefault: true,
                  tagInfo: { tagName: "Default" },
                  taggingPriority: 99,
                },
                {
                  criteria: [
                    {
                      daysOfTheWeek: ["Sunday"],
                      objectType: "ScheduleBasedBackupCriteria",
                      scheduleTimes: [new Date("2019-03-01T13:00:00Z")],
                    },
                  ],
                  isDefault: false,
                  tagInfo: { tagName: "Weekly" },
                  taggingPriority: 20,
                },
              ],
            },
          },
          {
            name: "Default",
            isDefault: true,
            lifecycles: [
              {
                deleteAfter: {
                  duration: "P1W",
                  objectType: "AbsoluteDeleteOption",
                },
                sourceDataStore: {
                  dataStoreType: "VaultStore",
                  objectType: "DataStoreInfoBase",
                },
              },
            ],
            objectType: "AzureRetentionRule",
          },
          {
            name: "Weekly",
            isDefault: false,
            lifecycles: [
              {
                deleteAfter: {
                  duration: "P12W",
                  objectType: "AbsoluteDeleteOption",
                },
                sourceDataStore: {
                  dataStoreType: "VaultStore",
                  objectType: "DataStoreInfoBase",
                },
              },
            ],
            objectType: "AzureRetentionRule",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateBackupPolicy();
}

main().catch(console.error);
