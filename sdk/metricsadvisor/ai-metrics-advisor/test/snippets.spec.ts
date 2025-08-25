// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MetricsAdvisorAdministrationClient,
  MetricsAdvisorClient,
  MetricsAdvisorKeyCredential,
} from "@azure/ai-metrics-advisor";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    // @ts-preserve-whitespace
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
  });

  it("ReadmeSampleCreateDataFeed", async () => {
    const endpoint = "<service endpoint>";
    const subscriptionKey = "<subscription key>";
    const apiKey = "<api key>";
    const sqlServerConnectionString = "<connection string to SQL Server>";
    const sqlServerQuery = "<SQL Server query to retrive data>";
    // @ts-preserve-whitespace
    const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
    // @ts-preserve-whitespace
    const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const created = await createDataFeed(adminClient, sqlServerConnectionString, sqlServerQuery);
    console.log(`Data feed created: ${created.id}`);
    // @ts-preserve-whitespace
    async function createDataFeed(adminClient, sqlServerConnectionString, sqlServerQuery) {
      console.log("Creating Datafeed...");
      const dataFeed = {
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
          timestampColumn: null,
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
          rollupIdentificationValue: "__CUSTOM_SUM__",
        },
        missingDataPointFillSettings: {
          fillType: "SmartFilling",
        },
        accessMode: "Private",
        admins: ["xyz@example.com"],
      };
      return adminClient.createDataFeed(dataFeed);
    }
  });

  it("ReadmeSampleCheckIngestionStatus", async () => {
    const endpoint = "<service endpoint>";
    const subscriptionKey = "<subscription key>";
    const apiKey = "<api key>";
    const dataFeedId = "<data feed id>";
    // @ts-preserve-whitespace
    const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
    // @ts-preserve-whitespace
    const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
    await checkIngestionStatus(
      adminClient,
      dataFeedId,
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
    );
    // @ts-preserve-whitespace
    async function checkIngestionStatus(adminClient, datafeedId, startTime, endTime) {
      // This shows how to use for-await-of syntax to list status
      console.log("Checking ingestion status...");
      const iterator = adminClient.listDataFeedIngestionStatus(datafeedId, startTime, endTime);
      for await (const status of iterator) {
        console.log(`  [${status.timestamp}] ${status.status} - ${status.message}`);
      }
    }
  });

  it("ReadmeSampleCreateDetectionConfig", async () => {
    const endpoint = "<service endpoint>";
    const subscriptionKey = "<subscription key>";
    const apiKey = "<api key>";
    const metricId = "<metric id>";
    // @ts-preserve-whitespace
    const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
    // @ts-preserve-whitespace
    const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const detectionConfig = await configureAnomalyDetectionConfiguration(adminClient, metricId);
    console.log(`Detection configuration created: ${detectionConfig.id}`);
    // @ts-preserve-whitespace
    async function configureAnomalyDetectionConfiguration(adminClient, metricId) {
      console.log(`Creating an anomaly detection configuration on metric '${metricId}'...`);
      const anomalyConfig = {
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
      return adminClient.createDetectionConfig(anomalyConfig);
    }
  });

  it("ReadmeSampleCreateWebhookHook", async () => {
    const endpoint = "<service endpoint>";
    const subscriptionKey = "<subscription key>";
    const apiKey = "<api key>";
    // @ts-preserve-whitespace
    const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
    // @ts-preserve-whitespace
    const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
    const hook = await createWebhookHook(adminClient);
    console.log(`Webhook hook created: ${hook.id}`);
    // @ts-preserve-whitespace
    async function createWebhookHook(adminClient) {
      console.log("Creating a webhook hook");
      const hook = {
        hookType: "Webhook",
        name: "web hook " + new Date().getTime().toString(),
        description: "description",
        hookParameter: {
          endpoint: "https://example.com/handleAlerts",
          username: "username",
          password: "password",
          // certificateKey: "certificate key",
          // certificatePassword: "certificate password"
        },
      };

      return adminClient.createHook(hook);
    }
  });

  it("ReadmeSampleCreateAlertConfig", async () => {
    const endpoint = "<service endpoint>";
    const subscriptionKey = "<subscription key>";
    const apiKey = "<api key>";
    const detectionConfigId = "<detection id>";
    const hookId = "<hook id>";
    // @ts-preserve-whitespace
    const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
    // @ts-preserve-whitespace
    const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
    const alertConfig = await configureAlertConfiguration(adminClient, detectionConfigId, [hookId]);
    console.log(`Alert configuration created: ${alertConfig.id}`);
    // @ts-preserve-whitespace
    async function configureAlertConfiguration(adminClient, detectionConfigId, hookIds) {
      console.log("Creating a new alerting configuration...");
      const anomalyAlertConfig = {
        name: "test_alert_config_" + new Date().getTime().toString(),
        crossMetricsOperator: "AND",
        metricAlertConfigurations: [
          {
            detectionConfigurationId: detectionConfigId,
            alertScope: {
              scopeType: "All",
            },
            alertConditions: {
              severityCondition: { minAlertSeverity: "Medium", maxAlertSeverity: "High" },
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
      return adminClient.createAlertConfig(anomalyAlertConfig);
    }
  });

  it("ReadmeSampleQueryAnomalies", async () => {
    const endpoint = "<service endpoint>";
    const subscriptionKey = "<subscription key>";
    const apiKey = "<api key>";
    const alertConfigId = "<alert config id>";
    // @ts-preserve-whitespace
    const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
    // @ts-preserve-whitespace
    const client = new MetricsAdvisorClient(endpoint, credential);
    // @ts-preserve-whitespace
    const alerts = await queryAlerts(
      client,
      alertConfigId,
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
    );
    // @ts-preserve-whitespace
    if (alerts.length > 1) {
      // query anomalies using an alert id.
      await queryAnomaliesByAlert(client, alerts[0]);
    } else {
      console.log("No alerts during the time period");
    }
    // @ts-preserve-whitespace
    async function queryAlerts(client, alertConfigId, startTime, endTime) {
      const alerts = [];
      const iterator = client.listAlerts(alertConfigId, startTime, endTime, "AnomalyTime");
      for await (const alert of iterator) {
        alerts.push(alert);
      }

      return alerts;
    }
    // @ts-preserve-whitespace
    async function queryAnomaliesByAlert(client, alert) {
      console.log(
        `Listing anomalies for alert configuration '${alert.alertConfigId}' and alert '${alert.id}'`,
      );
      const iterator = client.listAnomaliesForAlert(alert);
      for await (const anomaly of iterator) {
        console.log(
          `  Anomaly ${anomaly.severity} ${anomaly.status} ${anomaly.seriesKey} ${anomaly.timestamp}`,
        );
      }
    }
  });

  it("MetricsAdvisorClientListAlerts", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const alerts = client.listAlerts(
      "<alert config id>",
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
      "AnomalyTime",
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const alert of alerts) {
      console.log(alert.id);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = alerts[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.id);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of alerts.byPage()) {
      for (const alert of page) {
        console.log(alert.id);
      }
    }
  });

  it("MetricsAdvisorClientListAnomaliesForAlert", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const alertConfigId = "<alert config id>";
    const alertId = "<alert id>";
    const anamolyList = client.listAnomaliesForAlert({ alertConfigId, id: alertId });
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const anomaly of anamolyList) {
      console.log(anomaly.severity);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = anamolyList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.severity);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of anamolyList.byPage()) {
      for (const anomaly of page) {
        console.log(anomaly.severity);
      }
    }
  });

  it("MetricsAdvisorClientListIncidentsForAlert", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const alertConfigId = "<alert config id>";
    const alertId = "<alert id>";
    const incidentList = client.listIncidentsForAlert({ alertConfigId, id: alertId });
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const incident of incidentList) {
      console.log(incident.rootDimensionKey);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = incidentList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.rootDimensionKey);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of incidentList.byPage()) {
      for (const incident of page) {
        console.log(incident.rootDimensionKey);
      }
    }
  });

  it("MetricsAdvisorClientListAnomaliesForDetectionConfiguration", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const anomalies = client.listAnomaliesForDetectionConfiguration(
      "<detection config id>",
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const anomaly of anomalies) {
      console.log(anomaly.severity);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = anomalies[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.severity);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of anomalies.byPage()) {
      for (const anomaly of page) {
        console.log(anomaly.severity);
      }
    }
  });

  it("MetricsAdvisorClientListAnomalyDimensionValues", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const dimensionValues = client.listAnomalyDimensionValues(
      "<detection config id>",
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
      "city",
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const dimensionValue of dimensionValues) {
      console.log(dimensionValue);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = dimensionValues[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of dimensionValues.byPage()) {
      for (const dimensionValue of page) {
        console.log(dimensionValue);
      }
    }
  });

  it("MetricsAdvisorClientListIncidentsForDetectionConfiguration", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const incidentList = client.listIncidentsForDetectionConfiguration(
      "<detection config id>",
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const incident of incidentList) {
      console.log(incident.rootDimensionKey);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = incidentList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.rootDimensionKey);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of incidentList.byPage()) {
      for (const incident of page) {
        console.log(incident.rootDimensionKey);
      }
    }
  });

  it("MetricsAdvisorClientListFeedback", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const feedbacks = client.listFeedback("<metric id>");
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const feedback of feedbacks) {
      console.log(feedback.feedbackType);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = feedbacks[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.feedbackType);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of feedbacks.byPage()) {
      for (const feedback of page) {
        console.log(feedback.feedbackType);
      }
    }
  });

  it("MetricsAdvisorClientListMetricSeriesDefinitions", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const definitions = client.listMetricSeriesDefinitions(
      "<metric id>",
      new Date(Date.UTC(2020, 8, 1)),
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const definition of definitions) {
      console.log(definition.seriesKey);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = definitions[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.seriesKey);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of definitions.byPage()) {
      for (const definition of page) {
        console.log(definition.seriesKey);
      }
    }
  });

  it("MetricsAdvisorClientListMetricDimensionValues", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const dimensionValues = client.listMetricDimensionValues("<metric id>", "city");
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const dimensionValue of dimensionValues) {
      console.log(dimensionValue);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = dimensionValues[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of dimensionValues.byPage()) {
      for (const dimensionValue of page) {
        console.log(dimensionValue);
      }
    }
  });

  it("MetricsAdvisorClientListMetricEnrichmentStatus", async () => {
    const credential = new DefaultAzureCredential();
    const client = new MetricsAdvisorClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const statusList = client.listMetricEnrichmentStatus(
      "<metric id>",
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const status of statusList) {
      console.log(status.status);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = statusList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.status);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of statusList.byPage()) {
      for (const status of page) {
        console.log(status.status);
      }
    }
  });

  it("MetricsAdvisorAdministrationClientConstructor", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
  });

  it("MetricsAdvisorAdministrationClientListDataFeeds", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const dataFeedList = adminClient.listDataFeeds({
      filter: {
        dataFeedName: "js-blob-datafeed",
      },
    });
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const dataFeed of dataFeedList) {
      console.log(dataFeed.name);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = dataFeedList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.name);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of dataFeedList.byPage()) {
      for (const dataFeed of page) {
        console.log(dataFeed.name);
      }
    }
  });

  it("MetricsAdvisorAdministrationClientListAlertConfigs", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const alertConfigurations = adminClient.listAlertConfigs("<detection config id>");
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const alertConfig of alertConfigurations) {
      console.log(alertConfig.id);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = alertConfigurations[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.id);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of alertConfigurations.byPage()) {
      for (const alertConfig of page) {
        console.log(alertConfig.id);
      }
    }
  });

  it("MetricsAdvisorAdministrationClientListHooks", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const hookList = adminClient.listHooks();
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const hook of hookList) {
      console.log(hook.id);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = hookList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.id);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of hookList.byPage()) {
      for (const hook of page) {
        console.log(hook.id);
      }
    }
  });

  it("MetricsAdvisorAdministrationClientListDetectionConfigs", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const anomalyDetectionList = adminClient.listDetectionConfigs("<metric id>");
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const detectionConfig of anomalyDetectionList) {
      console.log(detectionConfig.id);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = anomalyDetectionList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.id);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of anomalyDetectionList.byPage()) {
      for (const detectionConfig of page) {
        console.log(detectionConfig.id);
      }
    }
  });

  it("MetricsAdvisorAdministrationClientListDataFeedIngestionStatus", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const ingestionStatusList = adminClient.listDataFeedIngestionStatus(
      "<data feed id>",
      new Date(Date.UTC(2020, 8, 1)),
      new Date(Date.UTC(2020, 8, 12)),
    );
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const status of ingestionStatusList) {
      console.log(status.status);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = ingestionStatusList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.status);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of ingestionStatusList.byPage()) {
      for (const status of page) {
        console.log(status.status);
      }
    }
  });

  it("MetricsAdvisorAdministrationClientListDataSourceCredentials", async () => {
    const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");
    const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
    // @ts-preserve-whitespace
    const dataSourceCredentialList = adminClient.listDataSourceCredential();
    // @ts-preserve-whitespace
    // Iterate via for-await-of
    for await (const credential of dataSourceCredentialList) {
      console.log(credential.id);
    }
    // @ts-preserve-whitespace
    // Iterate via generator
    const iter = dataSourceCredentialList[Symbol.asyncIterator]();
    let { done, value } = await iter.next();
    while (!done) {
      console.log(value.id);
      ({ done, value } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Iterate by page
    for await (const page of dataSourceCredentialList.byPage()) {
      for (const credential of page) {
        console.log(credential.id);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
