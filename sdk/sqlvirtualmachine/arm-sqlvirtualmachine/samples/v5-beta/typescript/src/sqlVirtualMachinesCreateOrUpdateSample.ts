// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineAutomatedBackupWeekly.json
 */
async function createsOrUpdatesASQLVirtualMachineForAutomatedBackUpSettingsWithWeeklyAndDaysOfTheWeekToRunTheBackUp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      autoBackupSettings: {
        backupScheduleType: "Manual",
        backupSystemDbs: true,
        daysOfWeek: ["Monday", "Friday"],
        enable: true,
        enableEncryption: true,
        fullBackupFrequency: "Weekly",
        fullBackupStartTime: 6,
        fullBackupWindowHours: 11,
        logBackupFrequency: 10,
        password: "<Password>",
        retentionPeriod: 17,
        storageAccessKey: "<primary storage access key>",
        storageAccountUrl: "https://teststorage.blob.core.windows.net/",
        storageContainerName: "testcontainer",
      },
      autoPatchingSettings: {
        dayOfWeek: "Sunday",
        enable: true,
        maintenanceWindowDuration: 60,
        maintenanceWindowStartingHour: 2,
      },
      keyVaultCredentialSettings: { enable: false },
      serverConfigurationsManagementSettings: {
        additionalFeaturesServerConfigurations: { isRServicesEnabled: false },
        sqlConnectivityUpdateSettings: {
          connectivityType: "PRIVATE",
          port: 1433,
          sqlAuthUpdatePassword: "<password>",
          sqlAuthUpdateUserName: "sqllogin",
        },
        sqlStorageUpdateSettings: {
          diskConfigurationType: "NEW",
          diskCount: 1,
          startingDeviceId: 2,
        },
        sqlWorkloadTypeUpdateSettings: { sqlWorkloadType: "OLTP" },
      },
      sqlImageSku: "Enterprise",
      sqlServerLicenseType: "PAYG",
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineMAX.json
 */
async function createsOrUpdatesASQLVirtualMachineWithMaxParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      assessmentSettings: {
        enable: true,
        runImmediately: true,
        schedule: {
          dayOfWeek: "Sunday",
          enable: true,
          startTime: "23:17",
          weeklyInterval: 1,
        },
      },
      autoBackupSettings: {
        backupScheduleType: "Manual",
        backupSystemDbs: true,
        enable: true,
        enableEncryption: true,
        fullBackupFrequency: "Daily",
        fullBackupStartTime: 6,
        fullBackupWindowHours: 11,
        logBackupFrequency: 10,
        password: "<Password>",
        retentionPeriod: 17,
        storageAccessKey: "<primary storage access key>",
        storageAccountUrl: "https://teststorage.blob.core.windows.net/",
        storageContainerName: "testcontainer",
      },
      autoPatchingSettings: {
        dayOfWeek: "Sunday",
        enable: true,
        maintenanceWindowDuration: 60,
        maintenanceWindowStartingHour: 2,
      },
      enableAutomaticUpgrade: true,
      keyVaultCredentialSettings: { enable: false },
      leastPrivilegeMode: "Enabled",
      serverConfigurationsManagementSettings: {
        additionalFeaturesServerConfigurations: { isRServicesEnabled: false },
        azureAdAuthenticationSettings: {
          clientId: "11111111-2222-3333-4444-555555555555",
        },
        sqlConnectivityUpdateSettings: {
          connectivityType: "PRIVATE",
          port: 1433,
          sqlAuthUpdatePassword: "<password>",
          sqlAuthUpdateUserName: "sqllogin",
        },
        sqlInstanceSettings: {
          collation: "SQL_Latin1_General_CP1_CI_AS",
          isIfiEnabled: true,
          isLpimEnabled: true,
          isOptimizeForAdHocWorkloadsEnabled: true,
          maxDop: 8,
          maxServerMemoryMB: 128,
          minServerMemoryMB: 0,
        },
        sqlStorageUpdateSettings: {
          diskConfigurationType: "NEW",
          diskCount: 1,
          startingDeviceId: 2,
        },
        sqlWorkloadTypeUpdateSettings: { sqlWorkloadType: "OLTP" },
      },
      sqlImageSku: "Enterprise",
      sqlServerLicenseType: "PAYG",
      storageConfigurationSettings: {
        diskConfigurationType: "NEW",
        enableStorageConfigBlade: true,
        sqlDataSettings: {
          defaultFilePath: "F:\\folderpath\\",
          luns: [0],
          useStoragePool: false,
        },
        sqlLogSettings: {
          defaultFilePath: "G:\\folderpath\\",
          luns: [1],
          useStoragePool: false,
        },
        sqlSystemDbOnDataDisk: true,
        sqlTempDbSettings: {
          dataFileCount: 8,
          dataFileSize: 256,
          dataGrowth: 512,
          defaultFilePath: "D:\\TEMP",
          logFileSize: 256,
          logGrowth: 512,
          luns: [2],
          useStoragePool: false,
        },
        storageWorkloadType: "OLTP",
      },
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineMIN.json
 */
async function createsOrUpdatesASQLVirtualMachineWithMinParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineStorageConfigurationEXTEND.json
 */
async function createsOrUpdatesASQLVirtualMachineForStorageConfigurationSettingsToExtendDataLogOrTempDBStoragePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      storageConfigurationSettings: {
        diskConfigurationType: "EXTEND",
        sqlDataSettings: { luns: [2] },
      },
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineStorageConfigurationNEW.json
 */
async function createsOrUpdatesASQLVirtualMachineForStorageConfigurationSettingsToNEWDataLogAndTempDBStoragePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      storageConfigurationSettings: {
        diskConfigurationType: "NEW",
        sqlDataSettings: { defaultFilePath: "F:\\folderpath\\", luns: [0] },
        sqlLogSettings: { defaultFilePath: "G:\\folderpath\\", luns: [1] },
        sqlSystemDbOnDataDisk: true,
        sqlTempDbSettings: {
          dataFileCount: 8,
          dataFileSize: 256,
          dataGrowth: 512,
          defaultFilePath: "D:\\TEMP",
          logFileSize: 256,
          logGrowth: 512,
        },
        storageWorkloadType: "OLTP",
      },
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineVmIdentitySettings.json
 */
async function createsOrUpdatesASQLVirtualMachineToEnableTheUsageOfVirtualMachineManagedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      virtualMachineIdentitySettings: {
        type: "UserAssigned",
        resourceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testvmidentity",
      },
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine.
 *
 * @summary creates or updates a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateVirtualMachineWithVMGroup.json
 */
async function createsOrUpdatesASQLVirtualMachineAndJoinsItToASQLVirtualMachineGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.createOrUpdate("testrg", "testvm", {
    location: "northeurope",
    properties: {
      sqlVirtualMachineGroupResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/testvmgroup",
      virtualMachineResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Compute/virtualMachines/testvm2",
      wsfcDomainCredentials: {
        clusterBootstrapAccountPassword: "<Password>",
        clusterOperatorAccountPassword: "<Password>",
        sqlServiceAccountPassword: "<Password>",
      },
      wsfcStaticIp: "10.0.0.7",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesASQLVirtualMachineForAutomatedBackUpSettingsWithWeeklyAndDaysOfTheWeekToRunTheBackUp();
  await createsOrUpdatesASQLVirtualMachineWithMaxParameters();
  await createsOrUpdatesASQLVirtualMachineWithMinParameters();
  await createsOrUpdatesASQLVirtualMachineForStorageConfigurationSettingsToExtendDataLogOrTempDBStoragePool();
  await createsOrUpdatesASQLVirtualMachineForStorageConfigurationSettingsToNEWDataLogAndTempDBStoragePool();
  await createsOrUpdatesASQLVirtualMachineToEnableTheUsageOfVirtualMachineManagedIdentity();
  await createsOrUpdatesASQLVirtualMachineAndJoinsItToASQLVirtualMachineGroup();
}

main().catch(console.error);
