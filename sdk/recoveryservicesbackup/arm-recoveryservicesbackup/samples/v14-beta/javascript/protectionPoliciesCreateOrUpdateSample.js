// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionPolicies_CreateOrUpdate_Complex.json
 */
async function createOrUpdateFullAzureVmProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "testPolicy1",
    {
      properties: {
        backupManagementType: "AzureIaasVM",
        retentionPolicy: {
          monthlySchedule: {
            retentionDuration: { count: 2, durationType: "Months" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: {
              daysOfTheWeek: ["Wednesday", "Thursday"],
              weeksOfTheMonth: ["First", "Third"],
            },
            retentionTimes: [new Date("2018-01-24T10:00:00Z")],
          },
          retentionPolicyType: "LongTermRetentionPolicy",
          weeklySchedule: {
            daysOfTheWeek: ["Monday", "Wednesday", "Thursday"],
            retentionDuration: { count: 1, durationType: "Weeks" },
            retentionTimes: [new Date("2018-01-24T10:00:00Z")],
          },
          yearlySchedule: {
            monthsOfYear: ["February", "November"],
            retentionDuration: { count: 4, durationType: "Years" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: {
              daysOfTheWeek: ["Monday", "Thursday"],
              weeksOfTheMonth: ["Fourth"],
            },
            retentionTimes: [new Date("2018-01-24T10:00:00Z")],
          },
        },
        schedulePolicy: {
          schedulePolicyType: "SimpleSchedulePolicy",
          scheduleRunDays: ["Monday", "Wednesday", "Thursday"],
          scheduleRunFrequency: "Weekly",
          scheduleRunTimes: [new Date("2018-01-24T10:00:00Z")],
        },
        timeZone: "Pacific Standard Time",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionPolicies_CreateOrUpdate_Simple.json
 */
async function createOrUpdateSimpleAzureVmProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "testPolicy1",
    {
      properties: {
        backupManagementType: "AzureIaasVM",
        retentionPolicy: {
          dailySchedule: {
            retentionDuration: { count: 1, durationType: "Days" },
            retentionTimes: [new Date("2018-01-24T02:00:00Z")],
          },
          retentionPolicyType: "LongTermRetentionPolicy",
        },
        schedulePolicy: {
          schedulePolicyType: "SimpleSchedulePolicy",
          scheduleRunFrequency: "Daily",
          scheduleRunTimes: [new Date("2018-01-24T02:00:00Z")],
        },
        timeZone: "Pacific Standard Time",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/V2Policy/IaaS_v2_daily.json
 */
async function createOrUpdateEnhancedAzureVmProtectionPolicyWithDailyBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "v2-daily-sample",
    {
      properties: {
        backupManagementType: "AzureIaasVM",
        instantRpRetentionRangeInDays: 30,
        policyType: "V2",
        retentionPolicy: {
          dailySchedule: {
            retentionDuration: { count: 180, durationType: "Days" },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
          monthlySchedule: {
            retentionDuration: { count: 60, durationType: "Months" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
          retentionPolicyType: "LongTermRetentionPolicy",
          weeklySchedule: {
            daysOfTheWeek: ["Sunday"],
            retentionDuration: { count: 12, durationType: "Weeks" },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
          yearlySchedule: {
            monthsOfYear: ["January"],
            retentionDuration: { count: 10, durationType: "Years" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
        },
        schedulePolicy: {
          dailySchedule: { scheduleRunTimes: [new Date("2018-01-24T10:00:00Z")] },
          schedulePolicyType: "SimpleSchedulePolicyV2",
          scheduleRunFrequency: "Daily",
        },
        snapshotConsistencyType: "OnlyCrashConsistent",
        timeZone: "India Standard Time",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/V2Policy/IaaS_v2_hourly.json
 */
async function createOrUpdateEnhancedAzureVmProtectionPolicyWithHourlyBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "v2-daily-sample",
    {
      properties: {
        backupManagementType: "AzureIaasVM",
        instantRpRetentionRangeInDays: 30,
        policyType: "V2",
        retentionPolicy: {
          dailySchedule: {
            retentionDuration: { count: 180, durationType: "Days" },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
          monthlySchedule: {
            retentionDuration: { count: 60, durationType: "Months" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
          retentionPolicyType: "LongTermRetentionPolicy",
          weeklySchedule: {
            daysOfTheWeek: ["Sunday"],
            retentionDuration: { count: 12, durationType: "Weeks" },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
          yearlySchedule: {
            monthsOfYear: ["January"],
            retentionDuration: { count: 10, durationType: "Years" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
            retentionTimes: [new Date("2021-12-17T08:00:00+00:00")],
          },
        },
        schedulePolicy: {
          hourlySchedule: {
            interval: 4,
            scheduleWindowDuration: 16,
            scheduleWindowStartTime: new Date("2021-12-17T08:00:00Z"),
          },
          schedulePolicyType: "SimpleSchedulePolicyV2",
          scheduleRunFrequency: "Hourly",
        },
        snapshotConsistencyType: "OnlyCrashConsistent",
        timeZone: "India Standard Time",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionPolicies_CreateOrUpdate_Daily.json
 */
async function createOrUpdateDailyAzureStorageProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "swaggertestvault",
    "SwaggerTestRg",
    "dailyPolicy2",
    {
      properties: {
        backupManagementType: "AzureStorage",
        retentionPolicy: {
          dailySchedule: {
            retentionDuration: { count: 5, durationType: "Days" },
            retentionTimes: [new Date("2021-09-29T08:00:00.000Z")],
          },
          monthlySchedule: {
            retentionDuration: { count: 60, durationType: "Months" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
            retentionTimes: [new Date("2021-09-29T08:00:00.000Z")],
          },
          retentionPolicyType: "LongTermRetentionPolicy",
          weeklySchedule: {
            daysOfTheWeek: ["Sunday"],
            retentionDuration: { count: 12, durationType: "Weeks" },
            retentionTimes: [new Date("2021-09-29T08:00:00.000Z")],
          },
          yearlySchedule: {
            monthsOfYear: ["January"],
            retentionDuration: { count: 10, durationType: "Years" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
            retentionTimes: [new Date("2021-09-29T08:00:00.000Z")],
          },
        },
        schedulePolicy: {
          schedulePolicyType: "SimpleSchedulePolicy",
          scheduleRunFrequency: "Daily",
          scheduleRunTimes: [new Date("2021-09-29T08:00:00.000Z")],
        },
        timeZone: "UTC",
        workLoadType: "AzureFileShare",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionPolicies_CreateOrUpdate_Hardened.json
 */
async function createOrUpdateAzureStorageVaultStandardProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "swaggertestvault",
    "SwaggerTestRg",
    "newPolicyV2",
    {
      properties: {
        backupManagementType: "AzureStorage",
        schedulePolicy: {
          schedulePolicyType: "SimpleSchedulePolicy",
          scheduleRunFrequency: "Daily",
          scheduleRunTimes: [new Date("2023-07-18T09:30:00.000Z")],
        },
        timeZone: "UTC",
        vaultRetentionPolicy: {
          snapshotRetentionInDays: 5,
          vaultRetention: {
            dailySchedule: {
              retentionDuration: { count: 30, durationType: "Days" },
              retentionTimes: [new Date("2023-07-18T09:30:00.000Z")],
            },
            monthlySchedule: {
              retentionDuration: { count: 60, durationType: "Months" },
              retentionScheduleFormatType: "Weekly",
              retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
              retentionTimes: [new Date("2023-07-18T09:30:00.000Z")],
            },
            retentionPolicyType: "LongTermRetentionPolicy",
            weeklySchedule: {
              daysOfTheWeek: ["Sunday"],
              retentionDuration: { count: 12, durationType: "Weeks" },
              retentionTimes: [new Date("2023-07-18T09:30:00.000Z")],
            },
            yearlySchedule: {
              monthsOfYear: ["January"],
              retentionDuration: { count: 10, durationType: "Years" },
              retentionScheduleFormatType: "Weekly",
              retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
              retentionTimes: [new Date("2023-07-18T09:30:00.000Z")],
            },
          },
        },
        workLoadType: "AzureFileShare",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionPolicies_CreateOrUpdate_Hourly.json
 */
async function createOrUpdateHourlyAzureStorageProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "swaggertestvault",
    "SwaggerTestRg",
    "newPolicy2",
    {
      properties: {
        backupManagementType: "AzureStorage",
        retentionPolicy: {
          dailySchedule: { retentionDuration: { count: 5, durationType: "Days" } },
          monthlySchedule: {
            retentionDuration: { count: 60, durationType: "Months" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
          },
          retentionPolicyType: "LongTermRetentionPolicy",
          weeklySchedule: {
            daysOfTheWeek: ["Sunday"],
            retentionDuration: { count: 12, durationType: "Weeks" },
          },
          yearlySchedule: {
            monthsOfYear: ["January"],
            retentionDuration: { count: 10, durationType: "Years" },
            retentionScheduleFormatType: "Weekly",
            retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["First"] },
          },
        },
        schedulePolicy: {
          hourlySchedule: {
            interval: 4,
            scheduleWindowDuration: 12,
            scheduleWindowStartTime: new Date("2021-09-29T08:00:00.000Z"),
          },
          schedulePolicyType: "SimpleSchedulePolicy",
          scheduleRunFrequency: "Hourly",
        },
        timeZone: "UTC",
        workLoadType: "AzureFileShare",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/ProtectionPolicies_CreateOrUpdate_Complex.json
 */
async function createOrUpdateFullAzureWorkloadProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "testPolicy1",
    {
      properties: {
        backupManagementType: "AzureWorkload",
        settings: { issqlcompression: false, timeZone: "Pacific Standard Time" },
        subProtectionPolicy: [
          {
            policyType: "Full",
            retentionPolicy: {
              monthlySchedule: {
                retentionDuration: { count: 1, durationType: "Months" },
                retentionScheduleFormatType: "Weekly",
                retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["Second"] },
                retentionTimes: [new Date("2018-01-24T10:00:00Z")],
              },
              retentionPolicyType: "LongTermRetentionPolicy",
              weeklySchedule: {
                daysOfTheWeek: ["Sunday", "Tuesday"],
                retentionDuration: { count: 2, durationType: "Weeks" },
                retentionTimes: [new Date("2018-01-24T10:00:00Z")],
              },
              yearlySchedule: {
                monthsOfYear: ["January", "June", "December"],
                retentionDuration: { count: 1, durationType: "Years" },
                retentionScheduleFormatType: "Weekly",
                retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["Last"] },
                retentionTimes: [new Date("2018-01-24T10:00:00Z")],
              },
            },
            schedulePolicy: {
              schedulePolicyType: "SimpleSchedulePolicy",
              scheduleRunDays: ["Sunday", "Tuesday"],
              scheduleRunFrequency: "Weekly",
              scheduleRunTimes: [new Date("2018-01-24T10:00:00Z")],
            },
          },
          {
            policyType: "Differential",
            retentionPolicy: {
              retentionDuration: { count: 8, durationType: "Days" },
              retentionPolicyType: "SimpleRetentionPolicy",
            },
            schedulePolicy: {
              schedulePolicyType: "SimpleSchedulePolicy",
              scheduleRunDays: ["Friday"],
              scheduleRunFrequency: "Weekly",
              scheduleRunTimes: [new Date("2018-01-24T10:00:00Z")],
            },
          },
          {
            policyType: "Log",
            retentionPolicy: {
              retentionDuration: { count: 7, durationType: "Days" },
              retentionPolicyType: "SimpleRetentionPolicy",
            },
            schedulePolicy: {
              scheduleFrequencyInMins: 60,
              schedulePolicyType: "LogSchedulePolicy",
            },
          },
        ],
        workLoadType: "SQLDataBase",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 *
 * @summary creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/ProtectionPolicies_CreateOrUpdate_SapHanaDBInstance.json
 */
async function createOrUpdateSapHanaDBInstanceWorkloadProtectionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicies.createOrUpdate(
    "HanaTestRsVault",
    "SwaggerTestRg",
    "testHanaSnapshotV2Policy1",
    {
      properties: {
        backupManagementType: "AzureWorkload",
        workLoadType: "SAPHanaDBInstance",
        vmWorkloadPolicyType: "SnapshotV2",
        settings: { timeZone: "UTC", issqlcompression: false, isCompression: false },
        subProtectionPolicy: [
          {
            policyType: "SnapshotFull",
            schedulePolicy: {
              schedulePolicyType: "SimpleSchedulePolicy",
              scheduleRunFrequency: "Daily",
              scheduleRunTimes: [new Date("2024-10-01T03:30:00.000Z")],
            },
            retentionPolicy: {
              retentionPolicyType: "LongTermRetentionPolicy",
              dailySchedule: {
                retentionTimes: [new Date("2023-12-19T20:00:00.000Z")],
                retentionDuration: { count: 30, durationType: "Days" },
              },
              weeklySchedule: {
                daysOfTheWeek: ["Sunday"],
                retentionTimes: [new Date("2023-12-19T20:00:00.000Z")],
                retentionDuration: { count: 10, durationType: "Weeks" },
              },
              monthlySchedule: {
                retentionScheduleFormatType: "Weekly",
                retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["Second"] },
                retentionTimes: [new Date("2023-12-15T20:00:00.000Z")],
                retentionDuration: { count: 6, durationType: "Months" },
              },
              yearlySchedule: {
                retentionScheduleFormatType: "Weekly",
                monthsOfYear: ["January"],
                retentionScheduleWeekly: { daysOfTheWeek: ["Sunday"], weeksOfTheMonth: ["Last"] },
                retentionTimes: [new Date("2023-12-19T20:00:00.000Z")],
                retentionDuration: { count: 2, durationType: "Years" },
              },
            },
            snapshotBackupAdditionalDetails: {
              instantRpRetentionRangeInDays: 5,
              instantRPDetails: "SwaggerTestRG",
              userAssignedManagedIdentityDetails: {
                identityArmId:
                  "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerMsiRG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/SwaggerUMI",
                identityName: "SwaggerUMI",
                userAssignedIdentityProperties: {
                  clientId: "00000000-0000-0000-0000-000000000000",
                  principalId: "00000000-0000-0000-0000-000000000000",
                },
              },
            },
          },
        ],
        protectedItemsCount: 0,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateFullAzureVmProtectionPolicy();
  await createOrUpdateSimpleAzureVmProtectionPolicy();
  await createOrUpdateEnhancedAzureVmProtectionPolicyWithDailyBackup();
  await createOrUpdateEnhancedAzureVmProtectionPolicyWithHourlyBackup();
  await createOrUpdateDailyAzureStorageProtectionPolicy();
  await createOrUpdateAzureStorageVaultStandardProtectionPolicy();
  await createOrUpdateHourlyAzureStorageProtectionPolicy();
  await createOrUpdateFullAzureWorkloadProtectionPolicy();
  await createOrUpdateSapHanaDBInstanceWorkloadProtectionPolicy();
}

main().catch(console.error);
