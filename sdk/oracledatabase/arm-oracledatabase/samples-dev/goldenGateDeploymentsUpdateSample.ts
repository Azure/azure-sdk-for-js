// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a GoldenGateDeployment
 *
 * @summary update a GoldenGateDeployment
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_Update_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.update("rgopenapi", "resource1", {
    zones: ["oipkwaadk"],
    tags: { key8753: "example" },
    properties: {
      backupSchedule: {
        bucketName: "resource1",
        compartmentId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
        frequencyBackupScheduled: "Daily",
        isMetadataOnly: true,
        namespaceName: "qif",
        timeBackupScheduled: "2026-06-01T00:00:00Z",
      },
      cpuCoreCount: 4,
      licenseModel: "LicenseIncluded",
      maintenanceConfiguration: {
        bundleReleaseUpgradePeriodInDays: 21,
        interimReleaseUpgradePeriodInDays: 28,
        isInterimReleaseAutoUpgradeEnabled: true,
        majorReleaseUpgradePeriodInDays: 5,
        securityPatchUpgradePeriodInDays: 10,
      },
      maintenanceWindow: { day: "resource1", startHour: 25 },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateDeploymentsUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
