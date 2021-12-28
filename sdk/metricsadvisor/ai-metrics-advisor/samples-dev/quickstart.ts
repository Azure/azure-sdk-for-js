// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  @summary This sample demonstrates how to get started by creating a data feed, checking ingestion status,
 * creating detection and alerting configurations, and querying for alerts and anomalies.
 * @azsdk-weight 100
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  AnomalyAlert,
  MetricsAdvisorDataFeed,
  MetricsAdvisorClient,
  WebNotificationHook,
  DataFeedDescriptor,
  AnomalyAlertConfiguration,
  AnomalyDetectionConfiguration,
} from "@azure/ai-metrics-advisor";

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const sqlServerConnectionString =
    process.env["METRICS_ADVISOR_SQL_SERVER_CONNECTION_STRING"] ||
    "<connection string to SQL Server>";
  const sqlServerQuery =
    process.env["METRICS_ADVISOR_AZURE_SQL_SERVER_QUERY"] || "<SQL Server query to retrive data>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const client = new MetricsAdvisorClient(endpoint, credential);
  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const created = await createDataFeed(adminClient, sqlServerConnectionString, sqlServerQuery);
  console.log(`Data feed created: ${created.id}`);
  console.log("  metrics: ");
  console.log(created.schema.metrics);

  console.log("Waiting for a minute before checking ingestion status...");
  await delay(60 * 1000);

  try {
    await checkIngestionStatus(
      adminClient,
      created.id,
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12))
    );

    const metricId = created.schema.metrics[0].id!;
    const detectionConfig = await configureAnomalyDetectionConfiguration(adminClient, metricId);
    console.log(`Detection configuration created: ${detectionConfig.id!}`);

    const hook = await createWebhookHook(adminClient);
    console.log(`Webhook hook created: ${hook.id!}`);

    const alertConfig = await configureAlertConfiguration(adminClient, detectionConfig.id!, [
      hook.id!,
    ]);
    console.log(`Alert configuration created: ${alertConfig.id!}`);

    // you can use alert configuration created in above step to query the alert.
    const alerts = await queryAlerts(
      client,
      alertConfig.id!,
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12))
    );

    if (alerts.length > 1) {
      // query anomalies using an alert id.
      await queryAnomaliesByAlert(client, alerts[0]);
    } else {
      console.log("No alerts during the time period");
    }
  } finally {
    console.log(`Deleting the data feed '${created.id!}`);
    await adminClient.deleteDataFeed(created.id!);
  }
}

async function createDataFeed(
  adminClient: MetricsAdvisorAdministrationClient,
  sqlServerConnectionString: string,
  sqlServerQuery: string
): Promise<MetricsAdvisorDataFeed> {
  console.log("Creating Datafeed...");
  const dataFeed: DataFeedDescriptor = {
    name: "test_datafeed_" + new Date().getTime().toString(),
    source: {
      dataSourceType: "SqlServer",
      connectionString: sqlServerConnectionString,
      query: sqlServerQuery,
      authenticationType: "Basic",
    },
    granularity: {
      granularityType: "Daily",
    },
    schema: {
      metrics: [
        {
          name: "revenue",
          displayName: "revenue",
          description: "Metric1 description",
        },
        {
          name: "cost",
          displayName: "cost",
          description: "Metric2 description",
        },
      ],
      dimensions: [
        { name: "city", displayName: "city display" },
        { name: "category", displayName: "category display" },
      ],
      timestampColumn: undefined,
    },
    ingestionSettings: {
      ingestionStartTime: new Date(Date.UTC(2020, 5, 1)),
      ingestionStartOffsetInSeconds: 0,
      dataSourceRequestConcurrency: -1,
      ingestionRetryDelayInSeconds: -1,
      stopRetryAfterInSeconds: -1,
    },
    rollupSettings: {
      rollupType: "AutoRollup",
      rollupMethod: "Sum",
      rollupIdentificationValue: "__SUM__",
    },
    missingDataPointFillSettings: {
      fillType: "SmartFilling",
    },
    accessMode: "Private",
    admins: ["xyz@microsoft.com"],
  };
  const result = await adminClient.createDataFeed(dataFeed);

  return result;
}

async function checkIngestionStatus(
  adminClient: MetricsAdvisorAdministrationClient,
  datafeedId: string,
  startTime: Date,
  endTime: Date
) {
  // This shows how to use for-await-of syntax to list status
  console.log("Checking ingestion status...");
  const listIterator = adminClient.listDataFeedIngestionStatus(datafeedId, startTime, endTime);
  for await (const status of listIterator) {
    console.log(`  [${status.timestamp}] ${status.status} - ${status.message}`);
  }
}

async function configureAnomalyDetectionConfiguration(
  adminClient: MetricsAdvisorAdministrationClient,
  metricId: string
) {
  console.log(`Creating an anomaly detection configuration on metric '${metricId}'...`);
  const anomalyConfig: Omit<AnomalyDetectionConfiguration, "id"> = {
    name: "test_detection_configuration" + new Date().getTime().toString(),
    metricId,
    wholeSeriesDetectionCondition: {
      smartDetectionCondition: {
        sensitivity: 100,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 1,
          minRatio: 1,
        },
      },
    },
    description: "Detection configuration description",
  };
  return await adminClient.createDetectionConfig(anomalyConfig);
}

async function createWebhookHook(adminClient: MetricsAdvisorAdministrationClient) {
  console.log("Creating a webhook hook");
  const hook: WebNotificationHook = {
    hookType: "Webhook",
    name: "web hook " + new Date().getTime().toString(),
    description: "description",
    hookParameter: {
      endpoint: "https://httpbin.org/post",
      username: "user",
      password: "pass",
      // certificateKey: "k",
      // certificatePassword: "kp"
    },
  };

  return await adminClient.createHook(hook);
}

async function configureAlertConfiguration(
  adminClient: MetricsAdvisorAdministrationClient,
  detectionConfigId: string,
  hookIds: string[]
) {
  console.log("Creating a new alerting configuration...");
  const anomalyAlert: Omit<AnomalyAlertConfiguration, "id"> = {
    name: "test_alert_config_" + new Date().getTime().toString(),
    crossMetricsOperator: "AND",
    metricAlertConfigurations: [
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "All",
        },
        alertConditions: {
          severityCondition: {
            minAlertSeverity: "Medium",
            maxAlertSeverity: "High",
          },
        },
        snoozeCondition: {
          autoSnooze: 0,
          snoozeScope: "Metric",
          onlyForSuccessive: true,
        },
      },
    ],
    hookIds,
    description: "Alerting config description",
  };
  return await adminClient.createAlertConfig(anomalyAlert);
}

async function queryAlerts(
  client: MetricsAdvisorClient,
  alertConfigId: string,
  startTime: Date,
  endTime: Date
) {
  console.log(`Listing alerts for alert configuration '${alertConfigId}'`);
  // This shows how to use `for-await-of` syntax to list alerts
  console.log("  using for-await-of syntax");
  let alerts: AnomalyAlert[] = [];
  const listIterator = client.listAlerts(alertConfigId, startTime, endTime, "AnomalyTime");
  for await (const alert of listIterator) {
    alerts.push(alert);
    console.log("    Alert");
    console.log(`      id: ${alert.id}`);
    console.log(`      timestamp: ${alert.timestamp}`);
    console.log(`      created on: ${alert.createdOn}`);
  }
  // alternatively we could list results by pages
  console.log(`  by pages`);
  const iterator = client
    .listAlerts(alertConfigId, startTime, endTime, "AnomalyTime")
    .byPage({ maxPageSize: 2 });

  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page -- ");
    for (const item of result.value) {
      console.log(`      id: ${item.id}`);
      console.log(`      timestamp: ${item.timestamp}`);
      console.log(`      created on: ${item.createdOn}`);
    }
    result = await iterator.next();
  }

  return alerts;
}

async function queryAnomaliesByAlert(client: MetricsAdvisorClient, alert: AnomalyAlert) {
  console.log(
    `Listing anomalies for alert configuration '${alert.alertConfigId}' and alert '${alert.id}'`
  );
  const listIterator = client.listAnomaliesForAlert(alert);
  for await (const anomaly of listIterator) {
    console.log(
      `  Anomaly ${anomaly.severity} ${anomaly.status} ${anomaly.seriesKey.dimension} ${anomaly.timestamp}`
    );
  }
}

async function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });
