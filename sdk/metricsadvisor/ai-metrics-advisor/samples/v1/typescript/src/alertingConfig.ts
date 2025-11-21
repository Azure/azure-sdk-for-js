// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates Alerting Configuration CRUD operations.
 */

// Load the .env file if it exists
import "dotenv/config";
import type { AnomalyAlertConfiguration } from "@azure/ai-metrics-advisor";
import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
} from "@azure/ai-metrics-advisor";

main().catch((err) => {
  console.log("Error occurred:");
  console.log(err);
});

export async function main(): Promise<void> {
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
  detectionConfigId: string,
): Promise<AnomalyAlertConfiguration> {
  console.log("Creating a new alerting configuration...");
  const alertConfig: Omit<AnomalyAlertConfiguration, "id"> = {
    name: "js alerting config name " + new Date().getTime().toString(),
    crossMetricsOperator: "AND",
    metricAlertConfigurations: [
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "All",
        },
      },
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "Dimension",
          seriesGroupInScope: { city: "Manila", category: "Handmade" },
        },
      },
    ],
    hookIds: [],
    description: "alerting config description",
  };
  const result = await adminClient.createAlertConfig(alertConfig);
  console.log(result);
  return result;
}

// updating an alerting configuration
async function updateAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  alertConfigId: string,
  detectionConfigId: string,
  hookIds: string[],
): Promise<AnomalyAlertConfiguration> {
  const patch: Omit<AnomalyAlertConfiguration, "id"> = {
    name: "new Name",
    // description: "new description",
    hookIds,
    crossMetricsOperator: "OR",
    metricAlertConfigurations: [
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "All",
        },
      },
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "Dimension",
          seriesGroupInScope: {
            city: "Kolkata",
            category: "Shoes Handbags & Sunglasses",
          },
        },
      },
    ],
  };
  console.log(`Updating alerting configuration ${detectionConfigId}`);
  const updated = await adminClient.updateAlertConfig(alertConfigId, patch);
  return updated;
}

async function deleteAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  alertConfigId: string,
): Promise<void> {
  console.log(`Deleting alerting configuration ${alertConfigId}`);
  await adminClient.deleteAlertConfig(alertConfigId);
}

async function listAlertConfig(
  adminClient: MetricsAdvisorAdministrationClient,
  detectdionConfigId: string,
): Promise<void> {
  console.log(`Listing alert configurations for detection configuration ${detectdionConfigId}`);
  let i = 1;
  const iterator = adminClient.listAlertConfigs(detectdionConfigId);
  for await (const config of iterator) {
    console.log(`Alert configuration ${i++}`);
    console.log(config);
  }
}
