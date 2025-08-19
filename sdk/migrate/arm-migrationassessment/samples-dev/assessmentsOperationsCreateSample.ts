// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Assessment,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a Assessment
 *
 * @summary Create a Assessment
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentsOperations_Create_MaximumSet_Gen.json
 */
async function assessmentsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const assessmentName = "asm1";
  const resource: Assessment = {
    assessmentType: "Unknown",
    azureDiskTypes: ["Premium", "StandardSSD"],
    azureHybridUseBenefit: "Unknown",
    azureLocation: "njxbwdtsxzhichsnk",
    azureOfferCode: "Unknown",
    azurePricingTier: "Standard",
    azureStorageRedundancy: "Unknown",
    azureVmFamilies: [
      "D_series",
      "Lsv2_series",
      "M_series",
      "Mdsv2_series",
      "Msv2_series",
      "Mv2_series",
    ],
    currency: "Unknown",
    discountPercentage: 6,
    eaSubscriptionId: "kwsu",
    groupType: "Default",
    percentile: "Percentile50",
    perfDataEndTime: new Date("2023-09-26T09:36:48.491Z"),
    perfDataStartTime: new Date("2023-09-26T09:36:48.491Z"),
    provisioningState: "Succeeded",
    reservedInstance: "None",
    scalingFactor: 24,
    sizingCriterion: "PerformanceBased",
    stage: "InProgress",
    status: "Created",
    timeRange: "Day",
    vmUptime: { daysPerMonth: 13, hoursPerDay: 26 },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessmentsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
