// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a GoldenGateDeployment
 *
 * @summary create a GoldenGateDeployment
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_CreateOrUpdate_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.createOrUpdate("rgopenapi", "resource1", {
    properties: {
      backupSchedule: {
        bucketName: "resource1",
        compartmentId: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
        frequencyBackupScheduled: "Daily",
        isMetadataOnly: true,
        namespaceName: "qif",
        timeBackupScheduled: "2026-06-01T00:00:00Z",
      },
      cpuCoreCount: 18,
      displayName: "vo",
      category: "DataReplication",
      deploymentType: "Ogg",
      environmentType: "Production",
      isAutoScalingEnabled: true,
      isPublic: true,
      licenseModel: "LicenseIncluded",
      maintenanceConfiguration: {
        bundleReleaseUpgradePeriodInDays: 21,
        interimReleaseUpgradePeriodInDays: 28,
        isInterimReleaseAutoUpgradeEnabled: true,
        majorReleaseUpgradePeriodInDays: 5,
        securityPatchUpgradePeriodInDays: 10,
      },
      maintenanceWindow: { day: "resource1", startHour: 25 },
      networkAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/networkAnchors/networkanchor1",
      oggData: {
        adminPassword: "<a-password-goes-here>",
        adminUsername: "resource1",
        certificate: "example",
        credentialStore: "GoldenGate",
        deploymentName: "uzyxba",
        groupToRolesMapping: {
          administratorGroupId: "example",
          operatorGroupId: "example",
          securityGroupId: "example",
          userGroupId: "example",
          identityDomainId: "example",
          key: "example",
        },
        oggVersion: "example",
        passwordSecretId: "example",
      },
      resourceAnchorId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resourceAnchors/anchor1",
      timeZone: "2026-06-01T00:00:00Z",
      version: "zhvgen",
    },
    zones: ["example"],
    tags: { key4445: "zasewagrwgc" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await goldenGateDeploymentsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
