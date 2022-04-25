// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "./clientDefinitions";

export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): GeneratedClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/metricsadvisor/v1.0`;

  options = {
    ...options,
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"]
    }
  };

  const userAgentInfo = `azsdk-js-ai-metrics-advisor-rest/1.0.0-beta.2`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    }
  };

  const client = getClient(baseUrl, credentials, options) as GeneratedClient;

  return {
    ...client,
    ...{
      getActiveSeriesCount: (options) => {
        return client.path("/stats/latest").get(options);
      },
      getAlertsByAnomalyAlertingConfiguration: (configurationId, options) => {
        return client
          .path(
            "/alert/anomaly/configurations/{configurationId}/alerts/query",
            configurationId
          )
          .post(options);
      },
      getAnomaliesFromAlertByAnomalyAlertingConfiguration: (
        configurationId,
        alertId,
        options
      ) => {
        return client
          .path(
            "/alert/anomaly/configurations/{configurationId}/alerts/{alertId}/anomalies",
            configurationId,
            alertId
          )
          .get(options);
      },
      getIncidentsFromAlertByAnomalyAlertingConfiguration: (
        configurationId,
        alertId,
        options
      ) => {
        return client
          .path(
            "/alert/anomaly/configurations/{configurationId}/alerts/{alertId}/incidents",
            configurationId,
            alertId
          )
          .get(options);
      },
      getSeriesByAnomalyDetectionConfiguration: (configurationId, options) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/series/query",
            configurationId
          )
          .post(options);
      },
      getAnomaliesByAnomalyDetectionConfiguration: (
        configurationId,
        options
      ) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/anomalies/query",
            configurationId
          )
          .post(options);
      },
      getDimensionOfAnomaliesByAnomalyDetectionConfiguration: (
        configurationId,
        options
      ) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/anomalies/dimension/query",
            configurationId
          )
          .post(options);
      },
      getIncidentsByAnomalyDetectionConfiguration: (
        configurationId,
        options
      ) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/incidents/query",
            configurationId
          )
          .post(options);
      },
      getIncidentsByAnomalyDetectionConfigurationNextPages: (
        configurationId,
        options
      ) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/incidents/query",
            configurationId
          )
          .get(options);
      },
      getRootCauseOfIncidentByAnomalyDetectionConfiguration: (
        configurationId,
        incidentId,
        options
      ) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/incidents/{incidentId}/rootCause",
            configurationId,
            incidentId
          )
          .get(options);
      },
      getMetricFeedback: (feedbackId, options) => {
        return client
          .path("/feedback/metric/{feedbackId}", feedbackId)
          .get(options);
      },
      listMetricFeedbacks: (options) => {
        return client.path("/feedback/metric/query").post(options);
      },
      createMetricFeedback: (options) => {
        return client.path("/feedback/metric").post(options);
      },
      getMetricData: (metricId, options) => {
        return client
          .path("/metrics/{metricId}/data/query", metricId)
          .post(options);
      },
      getMetricSeries: (metricId, options) => {
        return client
          .path("/metrics/{metricId}/series/query", metricId)
          .post(options);
      },
      getMetricDimension: (metricId, options) => {
        return client
          .path("/metrics/{metricId}/dimension/query", metricId)
          .post(options);
      },
      getEnrichmentStatusByMetric: (metricId, options) => {
        return client
          .path(
            "/metrics/{metricId}/status/enrichment/anomalyDetection/query",
            metricId
          )
          .post(options);
      }
    },
    metricsAdvisorAdministration: {
      getAnomalyAlertingConfiguration: (configurationId, options) => {
        return client
          .path(
            "/alert/anomaly/configurations/{configurationId}",
            configurationId
          )
          .get(options);
      },
      updateAnomalyAlertingConfiguration: (configurationId, options) => {
        return client
          .path(
            "/alert/anomaly/configurations/{configurationId}",
            configurationId
          )
          .patch(options);
      },
      deleteAnomalyAlertingConfiguration: (configurationId, options) => {
        return client
          .path(
            "/alert/anomaly/configurations/{configurationId}",
            configurationId
          )
          .delete(options);
      },
      createAnomalyAlertingConfiguration: (options) => {
        return client.path("/alert/anomaly/configurations").post(options);
      },
      getAnomalyDetectionConfiguration: (configurationId, options) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}",
            configurationId
          )
          .get(options);
      },
      updateAnomalyDetectionConfiguration: (configurationId, options) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}",
            configurationId
          )
          .patch(options);
      },
      deleteAnomalyDetectionConfiguration: (configurationId, options) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}",
            configurationId
          )
          .delete(options);
      },
      createAnomalyDetectionConfiguration: (options) => {
        return client
          .path("/enrichment/anomalyDetection/configurations")
          .post(options);
      },
      getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration: (
        configurationId,
        options
      ) => {
        return client
          .path(
            "/enrichment/anomalyDetection/configurations/{configurationId}/alert/anomaly/configurations",
            configurationId
          )
          .get(options);
      },
      createCredential: (options) => {
        return client.path("/credentials").post(options);
      },
      listCredentials: (options) => {
        return client.path("/credentials").get(options);
      },
      updateCredential: (credentialId, options) => {
        return client
          .path("/credentials/{credentialId}", credentialId)
          .patch(options);
      },
      deleteCredential: (credentialId, options) => {
        return client
          .path("/credentials/{credentialId}", credentialId)
          .delete(options);
      },
      getCredential: (credentialId, options) => {
        return client
          .path("/credentials/{credentialId}", credentialId)
          .get(options);
      },
      listDataFeeds: (options) => {
        return client.path("/dataFeeds").get(options);
      },
      createDataFeed: (options) => {
        return client.path("/dataFeeds").post(options);
      },
      getDataFeedById: (dataFeedId, options) => {
        return client.path("/dataFeeds/{dataFeedId}", dataFeedId).get(options);
      },
      updateDataFeed: (dataFeedId, options) => {
        return client
          .path("/dataFeeds/{dataFeedId}", dataFeedId)
          .patch(options);
      },
      deleteDataFeed: (dataFeedId, options) => {
        return client
          .path("/dataFeeds/{dataFeedId}", dataFeedId)
          .delete(options);
      },
      listHooks: (options) => {
        return client.path("/hooks").get(options);
      },
      createHook: (options) => {
        return client.path("/hooks").post(options);
      },
      getHook: (hookId, options) => {
        return client.path("/hooks/{hookId}", hookId).get(options);
      },
      updateHook: (hookId, options) => {
        return client.path("/hooks/{hookId}", hookId).patch(options);
      },
      deleteHook: (hookId, options) => {
        return client.path("/hooks/{hookId}", hookId).delete(options);
      },
      getDataFeedIngestionStatus: (dataFeedId, options) => {
        return client
          .path("/dataFeeds/{dataFeedId}/ingestionStatus/query", dataFeedId)
          .post(options);
      },
      resetDataFeedIngestionStatus: (dataFeedId, options) => {
        return client
          .path("/dataFeeds/{dataFeedId}/ingestionProgress/reset", dataFeedId)
          .post(options);
      },
      getIngestionProgress: (dataFeedId, options) => {
        return client
          .path("/dataFeeds/{dataFeedId}/ingestionProgress", dataFeedId)
          .get(options);
      },
      getAnomalyDetectionConfigurationsByMetric: (metricId, options) => {
        return client
          .path(
            "/metrics/{metricId}/enrichment/anomalyDetection/configurations",
            metricId
          )
          .get(options);
      }
    }
  };
}
