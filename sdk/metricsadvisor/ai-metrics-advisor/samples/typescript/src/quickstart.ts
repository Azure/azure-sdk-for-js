// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get started by creating a data feed, checking ingestion status,
 * creating detection and alerting configurations, and querying for alerts and anomalies.
 */
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();
import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  DataFeedSchema,
  DataFeedMetric,
  DataFeedDimension,
  DataFeedIngestionSettings,
  DataFeedGranularity,
  DataFeedSource,
  DataFeedOptions,
  GetDataFeedResponse,
  MetricsAdvisorClient,
  WebNotificationHook,
  MetricAlertConfiguration,
  AnomalyAlert
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
  console.log("  metric ids: ");
  console.log(created.metricIds);

  console.log("Waiting for a minute before checking ingestion status...");
  await delay(60 * 1000);

  try {
    await checkIngestionStatus(
      adminClient,
      created.id,
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12))
    );

    const metricId = created.metricIds[0];
    const detectionConfig = await configureAnomalyDetectionConfiguration(adminClient, metricId);
    console.log(`Detection configuration created: ${detectionConfig.id!}`);

    const hook = await createWebhookHook(adminClient);
    console.log(`Webhook hook created: ${hook.id!}`);

    const alertConfig = await configureAlertConfiguration(adminClient, detectionConfig.id!, [
      hook.id!
    ]);
    console.log(`Alert configuration created: ${alertConfig.id!}`);

    // you can use alert configuration created in above step to query the alert.
    const alertIds = await queryAlerts(
      client,
      alertConfig.id!,
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12))
    );

    if (alertIds.length > 1) {
      // query anomalies using an alert id.
      await queryAnomaliesByAlert(client, alertConfig.id!, alertIds[0]);
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
): Promise<GetDataFeedResponse> {
  const metric: DataFeedMetric[] = [
    {
      name: "revenue",
      displayName: "revenue",
      description: "Metric1 description"
    },
    {
      name: "cost",
      displayName: "cost",
      description: "Metric2 description"
    }
  ];
  const dimension: DataFeedDimension[] = [
    { name: "city", displayName: "city display" },
    { name: "category", displayName: "category display" }
  ];
  const dataFeedSchema: DataFeedSchema = {
    metrics: metric,
    dimensions: dimension,
    timestampColumn: undefined
  };
  const dataFeedIngestion: DataFeedIngestionSettings = {
    ingestionStartTime: new Date(Date.UTC(2020, 5, 1)),
    ingestionStartOffsetInSeconds: 0,
    dataSourceRequestConcurrency: -1,
    ingestionRetryDelayInSeconds: -1,
    stopRetryAfterInSeconds: -1
  };
  const granularity: DataFeedGranularity = {
    granularityType: "Daily"
  };
  const source: DataFeedSource = {
    dataSourceType: "SqlServer",
    dataSourceParameter: {
      connectionString: sqlServerConnectionString,
      query: sqlServerQuery
    }
  };
  const options: DataFeedOptions = {
    rollupSettings: {
      rollupType: "AutoRollup",
      rollupMethod: "Sum",
      rollupIdentificationValue: "__CUSTOM_SUM__"
    },
    missingDataPointFillSettings: {
      fillType: "SmartFilling"
    },
    accessMode: "Private",
    adminEmails: ["xyz@microsoft.com"]
  };

  console.log("Creating Datafeed...");
  const result = await adminClient.createDataFeed({
    name: "test_datafeed_" + new Date().getTime().toFixed(),
    source,
    granularity,
    schema: dataFeedSchema,
    ingestionSettings: dataFeedIngestion,
    options
  });

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
  for await (const status of adminClient.listDataFeedIngestionStatus(
    datafeedId,
    startTime,
    endTime
  )) {
    console.log(`  [${status.timestamp}] ${status.status} - ${status.message}`);
  }
}

async function configureAnomalyDetectionConfiguration(
  adminClient: MetricsAdvisorAdministrationClient,
  metricId: string
) {
  console.log(`Creating an anomaly detection configuration on metric '${metricId}'...`);
  return await adminClient.createMetricAnomalyDetectionConfiguration({
    name: "test_detection_configuration" + new Date().getTime().toString(),
    metricId,
    wholeSeriesDetectionCondition: {
      smartDetectionCondition: {
        sensitivity: 100,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 1,
          minRatio: 1
        }
      }
    },
    description: "Detection configuration description"
  });
}

async function createWebhookHook(adminClient: MetricsAdvisorAdministrationClient) {
  console.log("Creating a webhook hook");
  const hook: WebNotificationHook = {
    hookType: "Webhook",
    name: "web hook " + new Date().getTime().toFixed(),
    description: "description",
    hookParameter: {
      endpoint: "https://httpbin.org/post",
      username: "user",
      password: "pass"
      // certificateKey: "k",
      // certificatePassword: "kp"
    }
  };

  return await adminClient.createHook(hook);
}

async function configureAlertConfiguration(
  adminClient: MetricsAdvisorAdministrationClient,
  detectionConfigId: string,
  hookIds: string[]
) {
  console.log("Creating a new alerting configuration...");
  const metricAlertingConfig: MetricAlertConfiguration = {
    detectionConfigurationId: detectionConfigId,
    alertScope: {
      scopeType: "All"
    },
    alertConditions: {
      severityCondition: {
        minAlertSeverity: "Medium",
        maxAlertSeverity: "High"
      }
    },
    snoozeCondition: {
      autoSnooze: 0,
      snoozeScope: "Metric",
      onlyForSuccessive: true
    }
  };
  return await adminClient.createAnomalyAlertConfiguration({
    name: "test_alert_config_" + new Date().getTime().toString(),
    crossMetricsOperator: "AND",
    metricAlertConfigurations: [metricAlertingConfig],
    hookIds,
    description: "Alerting config description"
  });
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
  let alertIds: string[] = [];
  for await (const alert of client.listAlertsForAlertConfiguration(
    alertConfigId,
    startTime,
    endTime,
    "AnomalyTime"
  )) {
    alertIds.push(alert.id);
    console.log("    Alert");
    console.log(`      id: ${alert.id}`);
    console.log(`      timestamp: ${alert.timestamp}`);
    console.log(`      created on: ${alert.createdOn}`);
  }
  // alternatively we could list results by pages
  console.log(`  by pages`);
  const iterator = client
    .listAlertsForAlertConfiguration(alertConfigId, startTime, endTime, "AnomalyTime")
    .byPage({ maxPageSize: 2 });

  let result = await iterator.next();
  while (!result.done) {
    console.log("    -- Page -- ");
    console.table(result.value.alerts);
    result = await iterator.next();
  }

  return alertIds;
}

async function queryAnomaliesByAlert(
  client: MetricsAdvisorClient,
  alertConfigId: string,
  alertId: string
) {
  console.log(
    `Listing anomalies for alert configuration '${alertConfigId}' and alert '${alertId}'`
  );
  for await (const anomaly of client.listAnomaliesForAlert(alertConfigId, alertId)) {
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
