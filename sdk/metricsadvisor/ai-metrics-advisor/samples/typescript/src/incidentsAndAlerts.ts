// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to query incidents.
 */
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import { MetricsAdvisorKeyCredential, MetricsAdvisorClient } from "@azure/ai-metrics-advisor";

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const detectionConfigId =
    process.env["METRICS_ADVISOR_DETECTION_CONFIG_ID"] || "<detection config id>";
  const incidentId = process.env["METRICS_ADVISOR_INCIDENT_ID"] || "<incident id>";
  const alertConfigId = process.env["METRICS_ADVISOR_ALERT_CONFIG_ID"] || "<alert config id>";
  const alertId = process.env["METRICS_ADVISOR_ALERT_ID"] || "<alert id>";

  const client = new MetricsAdvisorClient(endpoint, credential);

  await listIncidentsForDetectionConfig(client, detectionConfigId);
  await listAnomaliesForDetectionConfig(client, detectionConfigId);
  await getRootCauses(client, detectionConfigId, incidentId);
  await listAlerts(client, alertConfigId);
  await listIncidentsForAlert(client, alertConfigId, alertId);
  await listAnomaliesForAlert(client, alertConfigId, alertId);
}

async function listIncidentsForDetectionConfig(
  client: MetricsAdvisorClient,
  detectionConfigId: string
) {
  console.log(`Listing incidents for detection config '${detectionConfigId}'`);
  const iterator = client
    .listIncidentsForDetectionConfiguration(
      detectionConfigId,
      new Date("09/06/2020"),
      new Date("09/11/2020")
    )
    .byPage({ maxPageSize: 2 });
  const result = await iterator.next();

  if (!result.done) {
    console.log("first page");
    console.table(result.value.incidents, [
      "id",
      "severity",
      "status",
      "startTime",
      "endTime",
      "detectionConfigurationId"
    ]);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("second page");
      console.table(nextPage.value.incidents, [
        "id",
        "severity",
        "status",
        "startTime",
        "endTime",
        "detectionConfigurationId"
      ]);
    }
  }
}

async function listAnomaliesForDetectionConfig(
  client: MetricsAdvisorClient,
  detectionConfigId: string
) {
  console.log(`Listing anomalies for detection config '${detectionConfigId}'`);
  const iterator = client
    .listAnomaliesForDetectionConfiguration(
      detectionConfigId,
      new Date("09/06/2020"),
      new Date("09/11/2020"),
      {
        severityFilter: { min: "Medium", max: "High" }
      }
    )
    .byPage({ maxPageSize: 2 });
  const result = await iterator.next();

  if (!result.done) {
    console.log("first page");
    console.table(result.value.anomalies, ["timestamp", "dimension", "status"]);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("second page");
      console.table(result.value.anomalies, ["timestamp", "dimension", "status"]);
    }
  }
}

async function getRootCauses(
  client: MetricsAdvisorClient,
  detectionConfigId: string,
  incidentId: string
) {
  console.log("Retrieving root causes...");
  const result = await client.getIncidentRootCauses(detectionConfigId, incidentId);
  console.table(result.rootCauses);
}

async function listAlerts(client: MetricsAdvisorClient, alertConfigId: string) {
  console.log(`Listing alerts for alert configuration '${alertConfigId}'`);
  const iterator = client
    .listAlertsForAlertConfiguration(
      alertConfigId,
      new Date("01/01/2020"),
      new Date("09/09/2020"),
      "AnomalyTime"
    )
    .byPage({ maxPageSize: 2 });

  const result = await iterator.next();

  if (!result.done) {
    console.log("first page");
    console.table(result.value.alerts);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("second page");
      console.table(nextPage.value.alerts);
    }
  }
}

async function listIncidentsForAlert(
  client: MetricsAdvisorClient,
  alertConfigId: string,
  alertId: string
) {
  console.log(
    `Listing incidents for alert configuration '${alertConfigId}' and alert '${alertId}'`
  );
  const iterator = client.listIncidentsForAlert(alertConfigId, alertId).byPage({ maxPageSize: 1 });

  const result = await iterator.next();

  if (!result.done) {
    console.log("first page");
    console.table(result.value.incidents);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("second page");
      console.table(nextPage.value.incidents);
    }
  }
}

async function listAnomaliesForAlert(
  client: MetricsAdvisorClient,
  alertConfigId: string,
  alertId: string
) {
  console.log(
    `Listing anomalies for alert configuration '${alertConfigId}' and alert '${alertId}'`
  );
  const iterator = client.listAnomaliesForAlert(alertConfigId, alertId).byPage({ maxPageSize: 1 });

  const result = await iterator.next();

  if (!result.done) {
    console.log("first page");
    console.table(result.value.anomalies);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("second page");
      console.table(nextPage.value.anomalies);
    }
  }
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });
