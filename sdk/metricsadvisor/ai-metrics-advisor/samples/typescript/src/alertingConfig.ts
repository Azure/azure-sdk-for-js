// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates Alerting Configuration CRUD operations.
 */
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  AnomalyAlertConfigurationPatch,
  MetricAlertConfiguration
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
  const detectionConfigId =
    process.env["METRICS_ADVISOR_DETECTION_CONFIG_ID"] || "<detection config id>";
  const hookId = process.env["METRICS_ADVISOR_HOOK_ID"] || "<existing hook id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const created = await createAlertConfig(adminClient, detectionConfigId);

  await updateAlertConfig(adminClient, created.id!, detectionConfigId, [hookId]);

  await listAlertConfig(adminClient, detectionConfigId);

  await deleteAlertConfig(adminClient, created.id!);
}

// create a new alerting configuration
async function createAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  detectionConfigId: string
) {
  console.log("Creating a new alerting configuration...");
  const metricAlertingConfig: MetricAlertConfiguration = {
    detectionConfigurationId: detectionConfigId,
    alertScope: {
      scopeType: "All"
    }
  };
  const result = await adminClient.createAnomalyAlertConfiguration(
    "js alerting config name " + new Date().getTime().toString(),
    "AND",
    [metricAlertingConfig, metricAlertingConfig],
    [],
    "alerting config description"
  );
  console.log(result);
  return result;
}

// updating an alerting configuration
async function updateAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  alertConfigId: string,
  detectionConfigId: string,
  hookIds: string[]
) {
  const metricAlertingConfig: MetricAlertConfiguration = {
    detectionConfigurationId: detectionConfigId,
    alertScope: {
      scopeType: "All"
    }
  };
  const patch: AnomalyAlertConfigurationPatch = {
    name: "new Name",
    //description: "new description",
    hookIds,
    crossMetricsOperator: "OR",
    metricAlertConfigurations: [metricAlertingConfig, metricAlertingConfig]
  };
  console.log(`Updating alerting configuration ${detectionConfigId}`);
  const updated = await adminClient.updateAnomalyAlertConfiguration(alertConfigId, patch);
  return updated;
}

async function deleteAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  alertConfigId: string
) {
  console.log(`Deleting alerting configuration ${alertConfigId}`);
  await adminClient.deleteAnomalyAlertConfiguration(alertConfigId);
}

async function listAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  detectdionConfigId: string
) {
  console.log(`Listing alert configurations for detection configuration ${detectdionConfigId}`);
  let i = 1;
  for await (const config of adminClient.listAnomalyAlertConfigurations(detectdionConfigId)) {
    console.log(`Alert configuration ${i++}`);
    console.log(config);
  }
}
