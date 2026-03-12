// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a AvsAssessment
 *
 * @summary Create a AvsAssessment
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AvsAssessmentsOperations_Create_MaximumSet_Gen.json
 */

import {
  AvsAssessment,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function avsAssessmentsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const assessmentName = "asm2";
  const resource: AvsAssessment = {
    assessmentType: "AvsAssessment",
    azureLocation: "EastUs",
    azureOfferCode: "MSAZR0003P",
    currency: "USD",
    dedupeCompression: 1.5,
    discountPercentage: 0,
    failuresToTolerateAndRaidLevel: "Ftt1Raid1",
    groupType: "Default",
    isStretchClusterEnabled: true,
    memOvercommit: 1,
    nodeType: "AV36",
    percentile: "Percentile95",
    perfDataEndTime: new Date("2023-09-26T13:35:56.5671462Z"),
    perfDataStartTime: new Date("2023-09-25T13:35:56.5671462Z"),
    provisioningState: "Succeeded",
    reservedInstance: "RI3Year",
    scalingFactor: 1,
    sizingCriterion: "AsOnPremises",
    stage: "InProgress",
    status: "Created",
    suitability: "Unknown",
    suitabilityExplanation: "Unknown",
    timeRange: "Day",
    vcpuOversubscription: 4,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.avsAssessmentsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await avsAssessmentsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
