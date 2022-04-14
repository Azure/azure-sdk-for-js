// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetActiveSeriesCountParameters,
  GetAlertsByAnomalyAlertingConfigurationParameters,
  GetAnomaliesFromAlertByAnomalyAlertingConfigurationParameters,
  GetIncidentsFromAlertByAnomalyAlertingConfigurationParameters,
  GetSeriesByAnomalyDetectionConfigurationParameters,
  GetAnomaliesByAnomalyDetectionConfigurationParameters,
  GetDimensionOfAnomaliesByAnomalyDetectionConfigurationParameters,
  GetIncidentsByAnomalyDetectionConfigurationParameters,
  GetIncidentsByAnomalyDetectionConfigurationNextPagesParameters,
  GetRootCauseOfIncidentByAnomalyDetectionConfigurationParameters,
  GetMetricFeedbackParameters,
  ListMetricFeedbacksParameters,
  CreateMetricFeedbackParameters,
  GetMetricDataParameters,
  GetMetricSeriesParameters,
  GetMetricDimensionParameters,
  GetEnrichmentStatusByMetricParameters
} from "./parameters";
import {
  GetActiveSeriesCount200Response,
  GetActiveSeriesCountdefaultResponse,
  GetAlertsByAnomalyAlertingConfiguration200Response,
  GetAlertsByAnomalyAlertingConfigurationdefaultResponse,
  GetAnomaliesFromAlertByAnomalyAlertingConfiguration200Response,
  GetAnomaliesFromAlertByAnomalyAlertingConfigurationdefaultResponse,
  GetIncidentsFromAlertByAnomalyAlertingConfiguration200Response,
  GetIncidentsFromAlertByAnomalyAlertingConfigurationdefaultResponse,
  GetSeriesByAnomalyDetectionConfiguration200Response,
  GetSeriesByAnomalyDetectionConfigurationdefaultResponse,
  GetAnomaliesByAnomalyDetectionConfiguration200Response,
  GetAnomaliesByAnomalyDetectionConfigurationdefaultResponse,
  GetDimensionOfAnomaliesByAnomalyDetectionConfiguration200Response,
  GetDimensionOfAnomaliesByAnomalyDetectionConfigurationdefaultResponse,
  GetIncidentsByAnomalyDetectionConfiguration200Response,
  GetIncidentsByAnomalyDetectionConfigurationdefaultResponse,
  GetIncidentsByAnomalyDetectionConfigurationNextPages200Response,
  GetIncidentsByAnomalyDetectionConfigurationNextPagesdefaultResponse,
  GetRootCauseOfIncidentByAnomalyDetectionConfiguration200Response,
  GetRootCauseOfIncidentByAnomalyDetectionConfigurationdefaultResponse,
  GetMetricFeedback200Response,
  GetMetricFeedbackdefaultResponse,
  ListMetricFeedbacks200Response,
  ListMetricFeedbacksdefaultResponse,
  CreateMetricFeedback201Response,
  CreateMetricFeedbackdefaultResponse,
  GetMetricData200Response,
  GetMetricDatadefaultResponse,
  GetMetricSeries200Response,
  GetMetricSeriesdefaultResponse,
  GetMetricDimension200Response,
  GetMetricDimensiondefaultResponse,
  GetEnrichmentStatusByMetric200Response,
  GetEnrichmentStatusByMetricdefaultResponse
} from "./responses";
import { Client } from "@azure-rest/core-client";

/** Contains operations for Client operations */
export interface ClientOperations {
  /** Get latest usage stats */
  getActiveSeriesCount(
    options?: GetActiveSeriesCountParameters
  ): Promise<
    GetActiveSeriesCount200Response | GetActiveSeriesCountdefaultResponse
  >;
  /** Query alerts under anomaly alerting configuration */
  getAlertsByAnomalyAlertingConfiguration(
    configurationId: string,
    options: GetAlertsByAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetAlertsByAnomalyAlertingConfiguration200Response
    | GetAlertsByAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Query anomalies under a specific alert */
  getAnomaliesFromAlertByAnomalyAlertingConfiguration(
    configurationId: string,
    alertId: string,
    options?: GetAnomaliesFromAlertByAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetAnomaliesFromAlertByAnomalyAlertingConfiguration200Response
    | GetAnomaliesFromAlertByAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Query incidents under a specific alert */
  getIncidentsFromAlertByAnomalyAlertingConfiguration(
    configurationId: string,
    alertId: string,
    options?: GetIncidentsFromAlertByAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetIncidentsFromAlertByAnomalyAlertingConfiguration200Response
    | GetIncidentsFromAlertByAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Query series enriched by anomaly detection */
  getSeriesByAnomalyDetectionConfiguration(
    configurationId: string,
    options: GetSeriesByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetSeriesByAnomalyDetectionConfiguration200Response
    | GetSeriesByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Query anomalies under anomaly detection configuration */
  getAnomaliesByAnomalyDetectionConfiguration(
    configurationId: string,
    options: GetAnomaliesByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetAnomaliesByAnomalyDetectionConfiguration200Response
    | GetAnomaliesByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Query dimension values of anomalies */
  getDimensionOfAnomaliesByAnomalyDetectionConfiguration(
    configurationId: string,
    options: GetDimensionOfAnomaliesByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetDimensionOfAnomaliesByAnomalyDetectionConfiguration200Response
    | GetDimensionOfAnomaliesByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Query incidents under anomaly detection configuration */
  getIncidentsByAnomalyDetectionConfiguration(
    configurationId: string,
    options: GetIncidentsByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetIncidentsByAnomalyDetectionConfiguration200Response
    | GetIncidentsByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Query incidents under anomaly detection configuration */
  getIncidentsByAnomalyDetectionConfigurationNextPages(
    configurationId: string,
    options?: GetIncidentsByAnomalyDetectionConfigurationNextPagesParameters
  ): Promise<
    | GetIncidentsByAnomalyDetectionConfigurationNextPages200Response
    | GetIncidentsByAnomalyDetectionConfigurationNextPagesdefaultResponse
  >;
  /** Query root cause for incident */
  getRootCauseOfIncidentByAnomalyDetectionConfiguration(
    configurationId: string,
    incidentId: string,
    options?: GetRootCauseOfIncidentByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetRootCauseOfIncidentByAnomalyDetectionConfiguration200Response
    | GetRootCauseOfIncidentByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Get a metric feedback by its id */
  getMetricFeedback(
    feedbackId: string,
    options?: GetMetricFeedbackParameters
  ): Promise<GetMetricFeedback200Response | GetMetricFeedbackdefaultResponse>;
  /** List feedback on the given metric */
  listMetricFeedbacks(
    options: ListMetricFeedbacksParameters
  ): Promise<
    ListMetricFeedbacks200Response | ListMetricFeedbacksdefaultResponse
  >;
  /** Create a new metric feedback */
  createMetricFeedback(
    options: CreateMetricFeedbackParameters
  ): Promise<
    CreateMetricFeedback201Response | CreateMetricFeedbackdefaultResponse
  >;
  /** Get time series data from metric */
  getMetricData(
    metricId: string,
    options: GetMetricDataParameters
  ): Promise<GetMetricData200Response | GetMetricDatadefaultResponse>;
  /** List series (dimension combinations) from metric */
  getMetricSeries(
    metricId: string,
    options: GetMetricSeriesParameters
  ): Promise<GetMetricSeries200Response | GetMetricSeriesdefaultResponse>;
  /** List dimension from certain metric */
  getMetricDimension(
    metricId: string,
    options: GetMetricDimensionParameters
  ): Promise<GetMetricDimension200Response | GetMetricDimensiondefaultResponse>;
  /** Query anomaly detection status */
  getEnrichmentStatusByMetric(
    metricId: string,
    options: GetEnrichmentStatusByMetricParameters
  ): Promise<
    | GetEnrichmentStatusByMetric200Response
    | GetEnrichmentStatusByMetricdefaultResponse
  >;
}

export interface GetActiveSeriesCount {
  /** Get latest usage stats */
  get(
    options?: GetActiveSeriesCountParameters
  ): Promise<
    GetActiveSeriesCount200Response | GetActiveSeriesCountdefaultResponse
  >;
}

export interface GetAlertsByAnomalyAlertingConfiguration {
  /** Query alerts under anomaly alerting configuration */
  post(
    options: GetAlertsByAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetAlertsByAnomalyAlertingConfiguration200Response
    | GetAlertsByAnomalyAlertingConfigurationdefaultResponse
  >;
}

export interface GetAnomaliesFromAlertByAnomalyAlertingConfiguration {
  /** Query anomalies under a specific alert */
  get(
    options?: GetAnomaliesFromAlertByAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetAnomaliesFromAlertByAnomalyAlertingConfiguration200Response
    | GetAnomaliesFromAlertByAnomalyAlertingConfigurationdefaultResponse
  >;
}

export interface GetIncidentsFromAlertByAnomalyAlertingConfiguration {
  /** Query incidents under a specific alert */
  get(
    options?: GetIncidentsFromAlertByAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetIncidentsFromAlertByAnomalyAlertingConfiguration200Response
    | GetIncidentsFromAlertByAnomalyAlertingConfigurationdefaultResponse
  >;
}

export interface GetSeriesByAnomalyDetectionConfiguration {
  /** Query series enriched by anomaly detection */
  post(
    options: GetSeriesByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetSeriesByAnomalyDetectionConfiguration200Response
    | GetSeriesByAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface GetAnomaliesByAnomalyDetectionConfiguration {
  /** Query anomalies under anomaly detection configuration */
  post(
    options: GetAnomaliesByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetAnomaliesByAnomalyDetectionConfiguration200Response
    | GetAnomaliesByAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface GetDimensionOfAnomaliesByAnomalyDetectionConfiguration {
  /** Query dimension values of anomalies */
  post(
    options: GetDimensionOfAnomaliesByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetDimensionOfAnomaliesByAnomalyDetectionConfiguration200Response
    | GetDimensionOfAnomaliesByAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface GetIncidentsByAnomalyDetectionConfiguration {
  /** Query incidents under anomaly detection configuration */
  post(
    options: GetIncidentsByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetIncidentsByAnomalyDetectionConfiguration200Response
    | GetIncidentsByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Query incidents under anomaly detection configuration */
  get(
    options?: GetIncidentsByAnomalyDetectionConfigurationNextPagesParameters
  ): Promise<
    | GetIncidentsByAnomalyDetectionConfigurationNextPages200Response
    | GetIncidentsByAnomalyDetectionConfigurationNextPagesdefaultResponse
  >;
}

export interface GetRootCauseOfIncidentByAnomalyDetectionConfiguration {
  /** Query root cause for incident */
  get(
    options?: GetRootCauseOfIncidentByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetRootCauseOfIncidentByAnomalyDetectionConfiguration200Response
    | GetRootCauseOfIncidentByAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface GetMetricFeedback {
  /** Get a metric feedback by its id */
  get(
    options?: GetMetricFeedbackParameters
  ): Promise<GetMetricFeedback200Response | GetMetricFeedbackdefaultResponse>;
}

export interface ListMetricFeedbacks {
  /** List feedback on the given metric */
  post(
    options: ListMetricFeedbacksParameters
  ): Promise<
    ListMetricFeedbacks200Response | ListMetricFeedbacksdefaultResponse
  >;
}

export interface CreateMetricFeedback {
  /** Create a new metric feedback */
  post(
    options: CreateMetricFeedbackParameters
  ): Promise<
    CreateMetricFeedback201Response | CreateMetricFeedbackdefaultResponse
  >;
}

export interface GetMetricData {
  /** Get time series data from metric */
  post(
    options: GetMetricDataParameters
  ): Promise<GetMetricData200Response | GetMetricDatadefaultResponse>;
}

export interface GetMetricSeries {
  /** List series (dimension combinations) from metric */
  post(
    options: GetMetricSeriesParameters
  ): Promise<GetMetricSeries200Response | GetMetricSeriesdefaultResponse>;
}

export interface GetMetricDimension {
  /** List dimension from certain metric */
  post(
    options: GetMetricDimensionParameters
  ): Promise<GetMetricDimension200Response | GetMetricDimensiondefaultResponse>;
}

export interface GetEnrichmentStatusByMetric {
  /** Query anomaly detection status */
  post(
    options: GetEnrichmentStatusByMetricParameters
  ): Promise<
    | GetEnrichmentStatusByMetric200Response
    | GetEnrichmentStatusByMetricdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/stats/latest' has methods for the following verbs: get */
  (path: "/stats/latest"): GetActiveSeriesCount;
  /** Resource for '/alert/anomaly/configurations/\{configurationId\}/alerts/query' has methods for the following verbs: post */
  (
    path: "/alert/anomaly/configurations/{configurationId}/alerts/query",
    configurationId: string
  ): GetAlertsByAnomalyAlertingConfiguration;
  /** Resource for '/alert/anomaly/configurations/\{configurationId\}/alerts/\{alertId\}/anomalies' has methods for the following verbs: get */
  (
    path: "/alert/anomaly/configurations/{configurationId}/alerts/{alertId}/anomalies",
    configurationId: string,
    alertId: string
  ): GetAnomaliesFromAlertByAnomalyAlertingConfiguration;
  /** Resource for '/alert/anomaly/configurations/\{configurationId\}/alerts/\{alertId\}/incidents' has methods for the following verbs: get */
  (
    path: "/alert/anomaly/configurations/{configurationId}/alerts/{alertId}/incidents",
    configurationId: string,
    alertId: string
  ): GetIncidentsFromAlertByAnomalyAlertingConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/series/query' has methods for the following verbs: post */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/series/query",
    configurationId: string
  ): GetSeriesByAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/anomalies/query' has methods for the following verbs: post */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/anomalies/query",
    configurationId: string
  ): GetAnomaliesByAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/anomalies/dimension/query' has methods for the following verbs: post */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/anomalies/dimension/query",
    configurationId: string
  ): GetDimensionOfAnomaliesByAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/incidents/query' has methods for the following verbs: post, get */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/incidents/query",
    configurationId: string
  ): GetIncidentsByAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/incidents/\{incidentId\}/rootCause' has methods for the following verbs: get */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/incidents/{incidentId}/rootCause",
    configurationId: string,
    incidentId: string
  ): GetRootCauseOfIncidentByAnomalyDetectionConfiguration;
  /** Resource for '/feedback/metric/\{feedbackId\}' has methods for the following verbs: get */
  (
    path: "/feedback/metric/{feedbackId}",
    feedbackId: string
  ): GetMetricFeedback;
  /** Resource for '/feedback/metric/query' has methods for the following verbs: post */
  (path: "/feedback/metric/query"): ListMetricFeedbacks;
  /** Resource for '/feedback/metric' has methods for the following verbs: post */
  (path: "/feedback/metric"): CreateMetricFeedback;
  /** Resource for '/metrics/\{metricId\}/data/query' has methods for the following verbs: post */
  (path: "/metrics/{metricId}/data/query", metricId: string): GetMetricData;
  /** Resource for '/metrics/\{metricId\}/series/query' has methods for the following verbs: post */
  (path: "/metrics/{metricId}/series/query", metricId: string): GetMetricSeries;
  /** Resource for '/metrics/\{metricId\}/dimension/query' has methods for the following verbs: post */
  (
    path: "/metrics/{metricId}/dimension/query",
    metricId: string
  ): GetMetricDimension;
  /** Resource for '/metrics/\{metricId\}/status/enrichment/anomalyDetection/query' has methods for the following verbs: post */
  (
    path: "/metrics/{metricId}/status/enrichment/anomalyDetection/query",
    metricId: string
  ): GetEnrichmentStatusByMetric;
}

export type MetricsAdvisorClient = Client & {
  path: Routes;
} & ClientOperations;
