// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateContainerAppsAssessmentsManagementClient } from "@azure/arm-migratecontainerappsassessments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ContainerAppsAssessment
 *
 * @summary create a ContainerAppsAssessment
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Create_MaximumSet_Gen.json
 */
async function containerAppsAssessmentOperationsCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const result = await client.containerAppsAssessmentOperations.create(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
    {
      properties: {
        scope: {
          scopeType: "ServerGroupId",
          serverGroupId: "this-will-be-a-valid-arm-id",
          azureResourceGraphQuery: "zyhczkubwaqjqrmyithugmedmtdjxb",
        },
        settings: {
          azureLocation: "EastUS",
          currency: "USD",
          scalingFactor: 20,
          discountPercentage: 14,
          sizingCriterion: "PerformanceBased",
          performanceData: {
            percentile: "Unknown",
            timeRange: "Day",
            perfDataStartTime: new Date("2025-02-14T07:09:09.242Z"),
            perfDataEndTime: new Date("2025-02-14T07:09:09.242Z"),
          },
          savingsSettings: { savingsOptions: "None", azureOfferCode: "Unknown" },
          billingSettings: {
            licensingProgram: "EA",
            subscriptionId: "572C3D3F-425D-4AE8-A935-72631EADDE56",
          },
          environmentType: "Production",
          sku: "Consumption",
          workloadProfileType: "Consumption",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerAppsAssessmentOperationsCreateMaximumSet();
}

main().catch(console.error);
