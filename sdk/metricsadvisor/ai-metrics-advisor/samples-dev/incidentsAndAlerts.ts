// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to query incidents and alerts.
 * @azsdk-weight 70
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
  await listAnomalyDimensionValues(client, detectionConfigId);
  await getRootCauses(client, detectionConfigId, incidentId);
  await listAlerts(client, alertConfigId);
  await listIncidentsForAlert(client, alertConfigId, alertId);
  await listAnomaliesForAlert(client, alertConfigId, alertId);
}

async function listAnomalyDimensionValues(client: MetricsAdvisorClient, detectionConfigId: string) {
  const dimensionName = "city";
  console.log(
    `Listing anomaly dimension values for detection config ${detectionConfigId} and dimension ${dimensionName}`
  );
  const listIterator = await client.listAnomalyDimensionValues(
    detectionConfigId,
    new Date("10/22/2020"),
    new Date("10/24/2020"),
    dimensionName
  );
  for await (const dimensionValue of listIterator) {
    console.log(dimensionValue);
  }

  console.log(`  by pages`);
  const iterator = client
    .listAnomalyDimensionValues(
      detectionConfigId,
      new Date("10/22/2020"),
      new Date("10/24/2020"),
      dimensionName
    )
    .byPage({ maxPageSize: 20 });
  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page --");
    for await (const dimensionValue of result.value) {
      console.log(dimensionValue);
    }
    result = await iterator.next();
  }
}

async function listIncidentsForDetectionConfig(
  client: MetricsAdvisorClient,
  detectionConfigId: string
) {
  console.log(`Listing incidents for detection config '${detectionConfigId}'`);
  console.log("  using for-await-of syntax");
  const listIterator = client.listIncidentsForDetectionConfiguration(
    detectionConfigId,
    new Date("10/22/2020"),
    new Date("10/24/2020"),
    {
      seriesGroupKeys: [{ city: "Manila", category: "Shoes Handbags & Sunglasses" }],
    }
  );
  for await (const incident of listIterator) {
    console.log("    Incident");
    console.log(`      id: ${incident.id}`);
    console.log(`      severity: ${incident.severity}`);
    console.log(`      status: ${incident.status}`);
    console.log(`      root dimension key: ${incident.rootDimensionKey}`);
    console.log(`      startTime: ${incident.startTime}`);
    console.log(`      last occurred: ${incident.lastOccurredTime}`);
    console.log(`      detection config id: ${incident.detectionConfigurationId}`);
  }

  console.log(`  by pages`);
  const iterator = client
    .listIncidentsForDetectionConfiguration(
      detectionConfigId,
      new Date("10/22/2020"),
      new Date("10/24/2020")
    )
    .byPage({ maxPageSize: 20 });
  let result = await iterator.next();

  while (!result.done) {
    console.log("    -- Page --");
    for (const item of result.value) {
      console.log(`    id: ${item.id}`);
      console.log(`    severity: ${item.severity}`);
      console.log(`    status: ${item.status}`);
      console.log(`      root dimension key: ${item.rootDimensionKey}`);
      console.log(`      startTime: ${item.startTime}`);
      console.log(`      last occurred: ${item.lastOccurredTime}`);
      console.log(`      detection config id: ${item.detectionConfigurationId}`);
    }
    result = await iterator.next();
  }
}

async function listAnomaliesForDetectionConfig(
  client: MetricsAdvisorClient,
  detectionConfigId: string
) {
  console.log(`Listing anomalies for detection config '${detectionConfigId}'`);
  const listIterator = client.listAnomaliesForDetectionConfiguration(
    detectionConfigId,
    new Date("10/22/2020"),
    new Date("10/24/2020"),
    {
      severityFilter: { min: "Medium", max: "High" },
    }
  );
  console.log("  using for-await-of syntax");
  for await (const anomaly of listIterator) {
    console.log("    Anomaly");
    console.log(`      metric id: ${anomaly.metricId}`);
    console.log(`      detection config id: ${anomaly.detectionConfigurationId}`);
    console.log(`      created on: ${anomaly.createdOn}`);
    console.log(`      modified on: ${anomaly.modifiedOn}`);
    console.log(`      severity: ${anomaly.severity}`);
    console.log(`      status: ${anomaly.status}`);
    console.log(`      series key: ${anomaly.seriesKey}`);
  }

  console.log(`  by pages`);
  const iterator = client
    .listAnomaliesForDetectionConfiguration(
      detectionConfigId,
      new Date("10/22/2020"),
      new Date("10/24/2020"),
      {
        severityFilter: { min: "Medium", max: "High" },
      }
    )
    .byPage({ maxPageSize: 20 });
  let result = await iterator.next();

  while (!result.done) {
    console.log("    -- Page --");
    console.log(result.value, ["timestamp", "severity", "seriesKey"]);
    for (const item of result.value) {
      console.log(`      metric id: ${item.metricId}`);
      console.log(`      detection config id: ${item.detectionConfigurationId}`);
      console.log(`      created on: ${item.createdOn}`);
      console.log(`      modified on: ${item.modifiedOn}`);
      console.log(`      severity: ${item.severity}`);
      console.log(`      status: ${item.status}`);
      console.log(`      series key: ${item.seriesKey}`);
    }
    result = await iterator.next();
  }
}

async function getRootCauses(
  client: MetricsAdvisorClient,
  detectionConfigId: string,
  incidentId: string
) {
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

async function listAlerts(client: MetricsAdvisorClient, alertConfigId: string) {
  console.log(`Listing alerts for alert configuration '${alertConfigId}'`);
  console.log("  using for-await-of syntax");
  const listIterator = client.listAlerts(
    alertConfigId,
    new Date("11/01/2020"),
    new Date("11/05/2020"),
    "AnomalyTime"
  );
  for await (const alert of listIterator) {
    console.log("    Alert");
    console.log(`      id: ${alert.id}`);
    console.log(`      timestamp: ${alert.timestamp}`);
    console.log(`      created on: ${alert.createdOn}`);
  }

  console.log(`  by pages`);
  const iterator = client
    .listAlerts(alertConfigId, new Date("11/01/2020"), new Date("11/05/2020"), "AnomalyTime")
    .byPage({ maxPageSize: 20 });

  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page --");
    for (const item of result.value) {
      console.log(`      id: ${item.id}`);
      console.log(`      timestamp: ${item.timestamp}`);
      console.log(`      created on: ${item.createdOn}`);
    }
    result = await iterator.next();
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
  console.log("  using for-await-of syntax");
  const listIterator = client.listIncidentsForAlert({ alertConfigId, id: alertId });
  for await (const incident of listIterator) {
    console.log("    Incident");
    console.log(`      id: ${incident.id}`);
    console.log(`      severity: ${incident.severity}`);
    console.log(`      status: ${incident.status}`);
    console.log(`      root dimension key: ${incident.rootDimensionKey}`);
    console.log(`      startTime: ${incident.startTime}`);
    console.log(`      last occurred: ${incident.lastOccurredTime}`);
    console.log(`      detection config id: ${incident.detectionConfigurationId}`);
  }

  console.log(`  by pages`);
  const iterator = client
    .listIncidentsForAlert({ alertConfigId, id: alertId })
    .byPage({ maxPageSize: 20 });

  let result = await iterator.next();
  while (!result.done) {
    console.log("  Page");
    for (const item of result.value) {
      console.log(`      id: ${item.id}`);
      console.log(`      severity: ${item.severity}`);
      console.log(`      status: ${item.status}`);
      console.log(`      root dimension key: ${item.rootDimensionKey}`);
      console.log(`      startTime: ${item.startTime}`);
      console.log(`      last occurred: ${item.lastOccurredTime}`);
      console.log(`      detection config id: ${item.detectionConfigurationId}`);
    }
    result = await iterator.next();
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
  console.log("  using for-await-of syntax");
  const listIterator = client.listAnomaliesForAlert({ alertConfigId, id: alertId });
  for await (const anomaly of listIterator) {
    console.log("    Anomaly");
    console.log(`      timestamp: ${anomaly.timestamp}`);
    console.log(`      dimension: ${anomaly.seriesKey}`);
    console.log(`      status: ${anomaly.status}`);
  }

  console.log(`  by pages`);
  const iterator = client
    .listAnomaliesForAlert({ alertConfigId, id: alertId })
    .byPage({ maxPageSize: 20 });

  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page --");
    for (const item of result.value) {
      console.log(`      timestamp: ${item.timestamp}`);
      console.log(`      dimension: ${item.seriesKey}`);
      console.log(`      status: ${item.status}`);
    }
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
