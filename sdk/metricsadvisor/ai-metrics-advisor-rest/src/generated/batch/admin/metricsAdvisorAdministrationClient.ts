// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { MetricsAdvisorAdministrationClient } from "./clientDefinitions";

export function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): MetricsAdvisorAdministrationClient {
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
  ) as MetricsAdvisorAdministrationClient;

  return {
    ...client,
    ...{
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
