// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { MetricsAdvisorClient } from "./clientDefinitions";

export function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): MetricsAdvisorClient {
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

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as MetricsAdvisorClient;

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
    }
  };
}
