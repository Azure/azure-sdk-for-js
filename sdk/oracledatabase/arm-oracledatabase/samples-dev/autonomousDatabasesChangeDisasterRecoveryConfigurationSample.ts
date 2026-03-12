// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to perform ChangeDisasterRecoveryConfiguration action on Autonomous Database
 *
 * @summary perform ChangeDisasterRecoveryConfiguration action on Autonomous Database
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_ChangeDisasterRecoveryConfiguration_MaximumSet_Gen.json
 */
async function performChangeDisasterRecoveryConfigurationActionOnAutonomousDatabaseGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.changeDisasterRecoveryConfiguration(
    "rgopenapi",
    "databasedb1",
    {
      disasterRecoveryType: "Adg",
      isReplicateAutomaticBackups: true,
      timeSnapshotStandbyEnabledTill: new Date("2025-08-01T04:32:58.725Z"),
      isSnapshotStandby: true,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to perform ChangeDisasterRecoveryConfiguration action on Autonomous Database
 *
 * @summary perform ChangeDisasterRecoveryConfiguration action on Autonomous Database
 * x-ms-original-file: 2025-09-01/autonomousDatabase_changeDisasterRecoveryConfiguration.json
 */
async function autonomousDatabasesChangeDisasterRecoveryConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.changeDisasterRecoveryConfiguration(
    "rg000",
    "databasedb1",
    { disasterRecoveryType: "Adg", isReplicateAutomaticBackups: false },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await performChangeDisasterRecoveryConfigurationActionOnAutonomousDatabaseGeneratedByMaximumSetRule();
  await autonomousDatabasesChangeDisasterRecoveryConfiguration();
}

main().catch(console.error);
