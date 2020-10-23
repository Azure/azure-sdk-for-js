// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to query incidents.
 */
// Load the .env file if it exists
require("dotenv").config();

const { MetricsAdvisorKeyCredential, MetricsAdvisorClient } = require("@azure/ai-metrics-advisor");

async function main() {
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

async function listIncidentsForDetectionConfig(client, detectionConfigId) {
  console.log(`Listing incidents for detection config '${detectionConfigId}'`);
  console.log("  using for-await-of syntax");
  for await (const incident of client.listIncidentsForDetectionConfiguration(
    detectionConfigId,
    new Date("09/06/2020"),
    new Date("09/11/2020"),
    {
      dimensionFilter: [{ dimension: { city: "Manila", category: "Shoes Handbags & Sunglasses" } }]
    }
  )) {
    console.log("    Incident");
    console.log(`      id: ${incident.id}`);
    console.log(`      severity: ${incident.severity}`);
    console.log(`      status: ${incident.status}`);
    console.log(`      startTime: ${incident.rootDimensionKey}`);
    console.log(`      startTime: ${incident.startTime}`);
    console.log(`      last occured: ${incident.lastOccuredTime}`);
    console.log(`      detection config id: ${incident.detectionConfigurationId}`);
  }

  const pageSettings = { maxPageSize: 20 };
  console.log(`  by pages`);
  const iterator = client
    .listIncidentsForDetectionConfiguration(
      detectionConfigId,
      new Date("09/06/2020"),
      new Date("09/11/2020")
    )
    .byPage(pageSettings);
  let result = await iterator.next();

  while (!result.done) {
    console.log("    -- Page --");
    console.table(result.value.incidents, [
      "id",
      "severity",
      "status",
      "rootDimensionKey",
      "startTime",
      "lastOccuredTime",
      "detectionConfigurationId"
    ]);
    result = await iterator.next();
  }
}

async function listAnomaliesForDetectionConfig(client, detectionConfigId) {
  console.log(`Listing anomalies for detection config '${detectionConfigId}'`);
  console.log("  using for-await-of syntax");
  for await (const anomaly of client.listAnomaliesForDetectionConfiguration(
    detectionConfigId,
    new Date("09/06/2020"),
    new Date("09/11/2020"),
    {
      severityFilter: { min: "Medium", max: "High" }
    }
  )) {
    console.log("    Anomaly");
    console.log(`      metric id: ${anomaly.metricId}`);
    console.log(`      detection config id: ${anomaly.detectionConfigurationId}`);
    console.log(`      created on: ${anomaly.createdOn}`);
    console.log(`      modified on: ${anomaly.modifiedOn}`);
    console.log(`      severity: ${anomaly.severity}`);
    console.log(`      status: ${anomaly.status}`);
    console.log(`      series key: ${anomaly.seriesKey}`);
  }
  const pageSettings = { maxPageSize: 20 };
  console.log(`  by pages`);
  const iterator = client
    .listAnomaliesForDetectionConfiguration(
      detectionConfigId,
      new Date("09/06/2020"),
      new Date("09/11/2020"),
      {
        severityFilter: { min: "Medium", max: "High" }
      }
    )
    .byPage(pageSettings);
  let result = await iterator.next();

  while (!result.done) {
    console.log("    -- Page --");
    console.table(result.value.anomalies, ["timestamp", "severity", "seriesKey"]);
    result = await iterator.next();
  }
}

async function getRootCauses(client, detectionConfigId, incidentId) {
  console.log("Retrieving root causes...");
  const result = await client.getIncidentRootCauses(detectionConfigId, incidentId);
  for (const rootcause of result.rootCauses) {
    console.log(`Root cause`);
    console.log(`  Trace the path for the incident root cause ${rootcause.path.join(" => ")}`);
    console.log(`  Series key: ${rootcause.seriesKey}`);
    console.log(`  Description: ${rootcause.description}`);
    console.log(`  ranking score: ${rootcause.score}`);
  }
}

async function listAlerts(client, alertConfigId) {
  console.log(`Listing alerts for alert configuration '${alertConfigId}'`);
  console.log("  using for-await-of syntax");
  for await (const alert of client.listAlertsForAlertConfiguration(
    alertConfigId,
    new Date("01/01/2020"),
    new Date("09/09/2020"),
    "AnomalyTime"
  )) {
    console.log("    Alert");
    console.log(`      id: ${alert.id}`);
    console.log(`      timestamp: ${alert.timestamp}`);
    console.log(`      created on: ${alert.createdOn}`);
  }

  console.log(`  by pages`);
  const pageSettings = { maxPageSize: 20 };
  const iterator = client
    .listAlertsForAlertConfiguration(
      alertConfigId,
      new Date("01/01/2020"),
      new Date("09/09/2020"),
      "AnomalyTime"
    )
    .byPage(pageSettings);

  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page --");
    console.table(result.value.alerts, ["id", "timestamp", "createdOn"]);
    result = await iterator.next();
  }
}

async function listIncidentsForAlert(client, alertConfigId, alertId) {
  console.log(
    `Listing incidents for alert configuration '${alertConfigId}' and alert '${alertId}'`
  );
  console.log("  using for-await-of syntax");
  for await (const incident of client.listIncidentsForAlert(alertConfigId, alertId)) {
    console.log("    Incident");
    console.log(`      id: ${incident.id}`);
    console.log(`      severity: ${incident.severity}`);
    console.log(`      status: ${incident.status}`);
    console.log(`      startTime: ${incident.rootDimensionKey}`);
    console.log(`      startTime: ${incident.startTime}`);
    console.log(`      last occured: ${incident.lastOccuredTime}`);
    console.log(`      detection config id: ${incident.detectionConfigurationId}`);
  }

  console.log(`  by pages`);
  const pageSettings = { maxPageSize: 20 };
  const iterator = client.listIncidentsForAlert(alertConfigId, alertId).byPage(pageSettings);

  let result = await iterator.next();
  while (!result.done) {
    console.log("  Page");
    console.table(result.value.incidents, [
      "id",
      "severity",
      "status",
      "rootDimensionKey",
      "startTime",
      "lastOccuredTime",
      "detectionConfigurationId"
    ]);
    result = await iterator.next();
  }
}

async function listAnomaliesForAlert(client, alertConfigId, alertId) {
  console.log(
    `Listing anomalies for alert configuration '${alertConfigId}' and alert '${alertId}'`
  );
  console.log("  using for-await-of syntax");
  for await (const anomaly of client.listAnomaliesForAlert(alertConfigId, alertId)) {
    console.log("    Anomaly");
    console.log(`      metric id: ${anomaly.metricId}`);
    console.log(`      detection config id: ${anomaly.detectionConfigurationId}`);
    console.log(`      created on: ${anomaly.createdOn}`);
    console.log(`      modified on: ${anomaly.modifiedOn}`);
    console.log(`      severity: ${anomaly.severity}`);
    console.log(`      status: ${anomaly.status}`);
    console.log(`      series key: ${anomaly.seriesKey}`);
  }
  const pageSettings = { maxPageSize: 20 };
  console.log(`  by pages`);
  const iterator = client.listAnomaliesForAlert(alertConfigId, alertId).byPage(pageSettings);

  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page --");
    console.table(result.value.anomalies, ["timestamp", "seriesKey", "status"]);
    result = await iterator.next();
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
