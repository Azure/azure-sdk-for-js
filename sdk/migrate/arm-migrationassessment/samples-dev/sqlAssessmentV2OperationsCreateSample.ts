// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a SqlAssessmentV2
 *
 * @summary Create a SqlAssessmentV2
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/SqlAssessmentV2Operations_Create_MaximumSet_Gen.json
 */

import {
  SqlAssessmentV2,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sqlAssessmentV2OperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const resource: SqlAssessmentV2 = {
    asyncCommitModeIntent: "DisasterRecovery",
    azureLocation: "SoutheastAsia",
    azureOfferCode: "MSAZR0003P",
    azureOfferCodeForVm: "MSAZR0003P",
    azureSqlDatabaseSettings: {
      azureSqlComputeTier: "Automatic",
      azureSqlDataBaseType: "SingleDatabase",
      azureSqlPurchaseModel: "VCore",
      azureSqlServiceTier: "Automatic",
    },
    azureSqlManagedInstanceSettings: {
      azureSqlInstanceType: "SingleInstance",
      azureSqlServiceTier: "Automatic",
    },
    azureSqlVmSettings: { instanceSeries: ["Eadsv5_series"] },
    currency: "USD",
    disasterRecoveryLocation: "EastAsia",
    discountPercentage: 0,
    enableHadrAssessment: true,
    entityUptime: { daysPerMonth: 30, hoursPerDay: 24 },
    environmentType: "Production",
    multiSubnetIntent: "DisasterRecovery",
    optimizationLogic: "MinimizeCost",
    osLicense: "Unknown",
    percentile: "Percentile95",
    reservedInstance: "None",
    reservedInstanceForVm: "None",
    scalingFactor: 1,
    sizingCriterion: "PerformanceBased",
    sqlServerLicense: "Unknown",
    timeRange: "Day",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.sqlAssessmentV2Operations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sqlAssessmentV2OperationsCreateMaximumSetGen();
}

main().catch(console.error);
