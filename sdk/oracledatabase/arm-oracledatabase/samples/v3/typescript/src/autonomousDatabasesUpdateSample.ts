// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a AutonomousDatabase
 *
 * @summary update a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_Update_MaximumSet_Gen.json
 */
async function patchAutonomousDatabaseGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.update("rgopenapi", "databasedb1", {
    tags: { key9827: "bygpoqozrwfyiootncgcqq" },
    properties: {
      adminPassword: "<a-password-goes-here>",
      autonomousMaintenanceScheduleType: "Early",
      computeCount: 56.1,
      cpuCoreCount: 45,
      customerContacts: [{ email: "dummyemail@microsoft.com" }],
      dataStorageSizeInTbs: 133,
      dataStorageSizeInGbs: 175271,
      displayName: "lrdrjpyyvufnxdzpwvlkmfukpstrjftdxcejcxtnqhxqbhvtzeiokllnspotsqeggddxkjjtf",
      isAutoScalingEnabled: true,
      isAutoScalingForStorageEnabled: true,
      peerDbId: "qmpfwtvpfvbgmulethqznsyyjlpxmyfqfanrymzqsgraavtmlqqbexpzguyqybngoupbshlzpxv",
      isLocalDataGuardEnabled: true,
      isMtlsConnectionRequired: true,
      licenseModel: "LicenseIncluded",
      scheduledOperationsList: [
        {
          dayOfWeek: { name: "Monday" },
          scheduledStartTime: "lwwvkazgmfremfwhckfb",
          scheduledStopTime: "hjwagzxijpiaogulmnmbuqakpqxhkjvaypjqnvbvtjddc",
        },
      ],
      databaseEdition: "StandardEdition",
      longTermBackupSchedule: {
        repeatCadence: "OneTime",
        timeOfBackup: new Date("2025-08-01T04:32:58.715Z"),
        retentionPeriodInDays: 188,
        isDisabled: true,
      },
      localAdgAutoFailoverMaxDataLossLimit: 212,
      openMode: "ReadOnly",
      permissionLevel: "Restricted",
      role: "Primary",
      backupRetentionPeriodInDays: 12,
      whitelistedIps: [
        "kfierlppwurtqrhfxwgfgrnqtmvraignzwsddwmpdijeveuevuoejfmbjvpnlrmmdflilxcwkkzvdofctsdjfxrrrwctihhnchtrouauesqbmlcqhzwnppnhrtitecenlfyshassvajukbwxudhlwixkvkgsessvshcwmleoqujeemwenhwlsccbcjnnviugzgylsxkssalqoicatcvkahogdvweymhdxboyqwhaxuzlmrdbvgbnnetobkbwygcsflzanwknlybvvzgjzjirpfrksbxwgllgfxwdflcisvxpkjecpgdaxccqkzxofedkrawvhzeabmunpykwd",
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a AutonomousDatabase
 *
 * @summary update a AutonomousDatabase
 * x-ms-original-file: 2025-09-01/autonomousDatabase_patch.json
 */
async function autonomousDatabasesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.update("rg000", "databasedb1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await patchAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesUpdate();
}

main().catch(console.error);
