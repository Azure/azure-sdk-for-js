// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates Detection Configuration CRUD operations.
 * @azsdk-weight 70
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  AnomalyDetectionConfiguration,
  MetricDetectionCondition,
  MetricSeriesGroupDetectionCondition,
  MetricSingleSeriesDetectionCondition,
} from "@azure/ai-metrics-advisor";

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const metricId = process.env["METRICS_ADVISOR_METRIC_ID"] || "<metric id>";
  const detectionConfigId =
    process.env["METRICS_ADVISOR_DETECTION_CONFIG_ID"] || "<detection config id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  await getDetectionConfig(adminClient, detectionConfigId);

  const created = await createDetectionConfig(adminClient, metricId);

  await updateDetectionConfig(adminClient, created.id!);

  await listDetectionConfig(adminClient, metricId);

  await deleteDetectionConfig(adminClient, created.id!);
}

async function getDetectionConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  detectionConfigId: string
) {
  console.log("Retrieving an existing detection configuration...");
  const result = await adminClient.getDetectionConfig(detectionConfigId);
  console.log(result);
  return result;
}

// create a new detection configuration
async function createDetectionConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  metricId: string
) {
  const wholeSeriesDetectionCondition: MetricDetectionCondition = {
    conditionOperator: "AND",
    smartDetectionCondition: {
      sensitivity: 50,
      anomalyDetectorDirection: "Both",
      suppressCondition: {
        minNumber: 5,
        minRatio: 50,
      },
    },
    changeThresholdCondition: {
      anomalyDetectorDirection: "Both",
      shiftPoint: 1,
      changePercentage: 33,
      withinRange: true,
      suppressCondition: { minNumber: 2, minRatio: 2 },
    },
    hardThresholdCondition: {
      anomalyDetectorDirection: "Up",
      upperBound: 400,
      suppressCondition: { minNumber: 2, minRatio: 2 },
    },
  };
  const seriesGroupDetectionConditions: MetricSeriesGroupDetectionCondition[] = [
    {
      groupKey: { city: "Manila" },
      conditionOperator: "AND",
      changeThresholdCondition: {
        anomalyDetectorDirection: "Both",
        shiftPoint: 1,
        changePercentage: 33,
        withinRange: true,
        suppressCondition: { minNumber: 2, minRatio: 2 },
      },
    },
  ];
  const seriesDetectionConditions: MetricSingleSeriesDetectionCondition[] = [
    {
      seriesKey: { city: "Manila", category: "Handmade" },
      conditionOperator: "AND",
      hardThresholdCondition: {
        anomalyDetectorDirection: "Up",
        upperBound: 400,
        suppressCondition: { minNumber: 2, minRatio: 2 },
      },
    },
  ];

  const config: Omit<AnomalyDetectionConfiguration, "id"> = {
    name: "fresh detection" + new Date().getTime().toString(),
    description: "fresh detection",
    metricId,
    wholeSeriesDetectionCondition,
    seriesGroupDetectionConditions,
    seriesDetectionConditions,
  };
  console.log("Creating a new anomaly detection configuration...");
  return await adminClient.createDetectionConfig(config);
}

// updating an detection configuration
async function updateDetectionConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  configId: string
) {
  const patch: Omit<AnomalyDetectionConfiguration, "id" | "metricId"> = {
    name: "new Name",
    description: "new description",
    wholeSeriesDetectionCondition: {
      conditionOperator: "OR",
      changeThresholdCondition: {
        anomalyDetectorDirection: "Both",
        shiftPoint: 2,
        withinRange: true,
        changePercentage: 44,
        suppressCondition: { minNumber: 4, minRatio: 4 },
      },
      hardThresholdCondition: {
        anomalyDetectorDirection: "Up",
        upperBound: 500,
        suppressCondition: { minNumber: 5, minRatio: 5 },
      },
    },
    seriesGroupDetectionConditions: [
      {
        groupKey: { city: "Manila" },
        conditionOperator: "AND",
        hardThresholdCondition: {
          anomalyDetectorDirection: "Up",
          upperBound: 400,
          suppressCondition: { minNumber: 2, minRatio: 2 },
        },
      },
    ],
    seriesDetectionConditions: [
      {
        seriesKey: { city: "Manila", category: "Handmade" },
        conditionOperator: "OR",
        changeThresholdCondition: {
          anomalyDetectorDirection: "Both",
          shiftPoint: 1,
          changePercentage: 33,
          withinRange: true,
          suppressCondition: { minNumber: 2, minRatio: 2 },
        },
      },
    ],
  };
  console.log(`Updating existing detection configuration '${configId}'`);
  const result = await adminClient.updateDetectionConfig(configId, patch);
  console.log(result);
  return result;
}

async function deleteDetectionConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  detectionConfigId: string
) {
  console.log(`Deleting detection configuration '${detectionConfigId}'`);
  await adminClient.deleteDetectionConfig(detectionConfigId);
}

async function listDetectionConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  metricId: string
) {
  console.log(`Listing detection configurations for metric '${metricId}'...`);
  let i = 1;
  const iterator = adminClient.listDetectionConfigs(metricId);
  for await (const config of iterator) {
    console.log(`  detection configuration ${i++}`);
    console.log(config);
  }
}
