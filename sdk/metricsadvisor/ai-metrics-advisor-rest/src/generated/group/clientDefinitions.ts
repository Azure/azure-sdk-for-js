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
  GetEnrichmentStatusByMetricParameters,
  MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationParameters,
  MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationParameters,
  MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationParameters,
  MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationParameters,
  MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationParameters,
  MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationParameters,
  MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationParameters,
  MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationParameters,
  MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters,
  MetricsAdvisorAdministrationCreateCredentialParameters,
  MetricsAdvisorAdministrationListCredentialsParameters,
  MetricsAdvisorAdministrationUpdateCredentialParameters,
  MetricsAdvisorAdministrationDeleteCredentialParameters,
  MetricsAdvisorAdministrationGetCredentialParameters,
  MetricsAdvisorAdministrationListDataFeedsParameters,
  MetricsAdvisorAdministrationCreateDataFeedParameters,
  MetricsAdvisorAdministrationGetDataFeedByIdParameters,
  MetricsAdvisorAdministrationUpdateDataFeedParameters,
  MetricsAdvisorAdministrationDeleteDataFeedParameters,
  MetricsAdvisorAdministrationListHooksParameters,
  MetricsAdvisorAdministrationCreateHookParameters,
  MetricsAdvisorAdministrationGetHookParameters,
  MetricsAdvisorAdministrationUpdateHookParameters,
  MetricsAdvisorAdministrationDeleteHookParameters,
  MetricsAdvisorAdministrationGetDataFeedIngestionStatusParameters,
  MetricsAdvisorAdministrationResetDataFeedIngestionStatusParameters,
  MetricsAdvisorAdministrationGetIngestionProgressParameters,
  MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricParameters
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
  GetEnrichmentStatusByMetricdefaultResponse,
  MetricsAdvisorAdministrationGetAnomalyAlertingConfiguration200Response,
  MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationdefaultResponse,
  MetricsAdvisorAdministrationUpdateAnomalyAlertingConfiguration200Response,
  MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationdefaultResponse,
  MetricsAdvisorAdministrationDeleteAnomalyAlertingConfiguration204Response,
  MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationdefaultResponse,
  MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration201Response,
  MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationdefaultResponse,
  MetricsAdvisorAdministrationGetAnomalyDetectionConfiguration200Response,
  MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationdefaultResponse,
  MetricsAdvisorAdministrationUpdateAnomalyDetectionConfiguration200Response,
  MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationdefaultResponse,
  MetricsAdvisorAdministrationDeleteAnomalyDetectionConfiguration204Response,
  MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationdefaultResponse,
  MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration201Response,
  MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationdefaultResponse,
  MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response,
  MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse,
  MetricsAdvisorAdministrationCreateCredential201Response,
  MetricsAdvisorAdministrationCreateCredentialdefaultResponse,
  MetricsAdvisorAdministrationListCredentials200Response,
  MetricsAdvisorAdministrationListCredentialsdefaultResponse,
  MetricsAdvisorAdministrationUpdateCredential200Response,
  MetricsAdvisorAdministrationUpdateCredentialdefaultResponse,
  MetricsAdvisorAdministrationDeleteCredential204Response,
  MetricsAdvisorAdministrationDeleteCredentialdefaultResponse,
  MetricsAdvisorAdministrationGetCredential200Response,
  MetricsAdvisorAdministrationGetCredentialdefaultResponse,
  MetricsAdvisorAdministrationListDataFeeds200Response,
  MetricsAdvisorAdministrationListDataFeedsdefaultResponse,
  MetricsAdvisorAdministrationCreateDataFeed201Response,
  MetricsAdvisorAdministrationCreateDataFeeddefaultResponse,
  MetricsAdvisorAdministrationGetDataFeedById200Response,
  MetricsAdvisorAdministrationGetDataFeedByIddefaultResponse,
  MetricsAdvisorAdministrationUpdateDataFeed200Response,
  MetricsAdvisorAdministrationUpdateDataFeeddefaultResponse,
  MetricsAdvisorAdministrationDeleteDataFeed204Response,
  MetricsAdvisorAdministrationDeleteDataFeeddefaultResponse,
  MetricsAdvisorAdministrationListHooks200Response,
  MetricsAdvisorAdministrationListHooksdefaultResponse,
  MetricsAdvisorAdministrationCreateHook201Response,
  MetricsAdvisorAdministrationCreateHookdefaultResponse,
  MetricsAdvisorAdministrationGetHook200Response,
  MetricsAdvisorAdministrationGetHookdefaultResponse,
  MetricsAdvisorAdministrationUpdateHook200Response,
  MetricsAdvisorAdministrationUpdateHookdefaultResponse,
  MetricsAdvisorAdministrationDeleteHook204Response,
  MetricsAdvisorAdministrationDeleteHookdefaultResponse,
  MetricsAdvisorAdministrationGetDataFeedIngestionStatus200Response,
  MetricsAdvisorAdministrationGetDataFeedIngestionStatusdefaultResponse,
  MetricsAdvisorAdministrationResetDataFeedIngestionStatus204Response,
  MetricsAdvisorAdministrationResetDataFeedIngestionStatusdefaultResponse,
  MetricsAdvisorAdministrationGetIngestionProgress200Response,
  MetricsAdvisorAdministrationGetIngestionProgressdefaultResponse,
  MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetric200Response,
  MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricdefaultResponse
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

/** Contains operations for MetricsAdvisorAdministration operations */
export interface MetricsAdvisorAdministrationOperations {
  /** Query a single anomaly alerting configuration */
  getAnomalyAlertingConfiguration(
    configurationId: string,
    options?: MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfiguration200Response
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Update anomaly alerting configuration */
  updateAnomalyAlertingConfiguration(
    configurationId: string,
    options: MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateAnomalyAlertingConfiguration200Response
    | MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Delete anomaly alerting configuration */
  deleteAnomalyAlertingConfiguration(
    configurationId: string,
    options?: MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteAnomalyAlertingConfiguration204Response
    | MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Create anomaly alerting configuration */
  createAnomalyAlertingConfiguration(
    options: MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration201Response
    | MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Query a single anomaly detection configuration */
  getAnomalyDetectionConfiguration(
    configurationId: string,
    options?: MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfiguration200Response
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Update anomaly detection configuration */
  updateAnomalyDetectionConfiguration(
    configurationId: string,
    options: MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateAnomalyDetectionConfiguration200Response
    | MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Delete anomaly detection configuration */
  deleteAnomalyDetectionConfiguration(
    configurationId: string,
    options?: MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteAnomalyDetectionConfiguration204Response
    | MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Create anomaly detection configuration */
  createAnomalyDetectionConfiguration(
    options: MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration201Response
    | MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationdefaultResponse
  >;
  /** List all anomaly alerting configurations for specific anomaly detection configuration */
  getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration(
    configurationId: string,
    options?: MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Create a new data source credential */
  createCredential(
    options: MetricsAdvisorAdministrationCreateCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateCredential201Response
    | MetricsAdvisorAdministrationCreateCredentialdefaultResponse
  >;
  /** List all credentials */
  listCredentials(
    options?: MetricsAdvisorAdministrationListCredentialsParameters
  ): Promise<
    | MetricsAdvisorAdministrationListCredentials200Response
    | MetricsAdvisorAdministrationListCredentialsdefaultResponse
  >;
  /** Update a data source credential */
  updateCredential(
    credentialId: string,
    options: MetricsAdvisorAdministrationUpdateCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateCredential200Response
    | MetricsAdvisorAdministrationUpdateCredentialdefaultResponse
  >;
  /** Delete a data source credential */
  deleteCredential(
    credentialId: string,
    options?: MetricsAdvisorAdministrationDeleteCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteCredential204Response
    | MetricsAdvisorAdministrationDeleteCredentialdefaultResponse
  >;
  /** Get a data source credential */
  getCredential(
    credentialId: string,
    options?: MetricsAdvisorAdministrationGetCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetCredential200Response
    | MetricsAdvisorAdministrationGetCredentialdefaultResponse
  >;
  /** List all data feeds */
  listDataFeeds(
    options?: MetricsAdvisorAdministrationListDataFeedsParameters
  ): Promise<
    | MetricsAdvisorAdministrationListDataFeeds200Response
    | MetricsAdvisorAdministrationListDataFeedsdefaultResponse
  >;
  /** Create a new data feed */
  createDataFeed(
    options: MetricsAdvisorAdministrationCreateDataFeedParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateDataFeed201Response
    | MetricsAdvisorAdministrationCreateDataFeeddefaultResponse
  >;
  /** Get a data feed by its id */
  getDataFeedById(
    dataFeedId: string,
    options?: MetricsAdvisorAdministrationGetDataFeedByIdParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetDataFeedById200Response
    | MetricsAdvisorAdministrationGetDataFeedByIddefaultResponse
  >;
  /** Update a data feed */
  updateDataFeed(
    dataFeedId: string,
    options: MetricsAdvisorAdministrationUpdateDataFeedParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateDataFeed200Response
    | MetricsAdvisorAdministrationUpdateDataFeeddefaultResponse
  >;
  /** Delete a data feed */
  deleteDataFeed(
    dataFeedId: string,
    options?: MetricsAdvisorAdministrationDeleteDataFeedParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteDataFeed204Response
    | MetricsAdvisorAdministrationDeleteDataFeeddefaultResponse
  >;
  /** List all hooks */
  listHooks(
    options?: MetricsAdvisorAdministrationListHooksParameters
  ): Promise<
    | MetricsAdvisorAdministrationListHooks200Response
    | MetricsAdvisorAdministrationListHooksdefaultResponse
  >;
  /** Create a new hook */
  createHook(
    options: MetricsAdvisorAdministrationCreateHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateHook201Response
    | MetricsAdvisorAdministrationCreateHookdefaultResponse
  >;
  /** Get a hook by its id */
  getHook(
    hookId: string,
    options?: MetricsAdvisorAdministrationGetHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetHook200Response
    | MetricsAdvisorAdministrationGetHookdefaultResponse
  >;
  /** Update a hook */
  updateHook(
    hookId: string,
    options: MetricsAdvisorAdministrationUpdateHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateHook200Response
    | MetricsAdvisorAdministrationUpdateHookdefaultResponse
  >;
  /** Delete a hook */
  deleteHook(
    hookId: string,
    options?: MetricsAdvisorAdministrationDeleteHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteHook204Response
    | MetricsAdvisorAdministrationDeleteHookdefaultResponse
  >;
  /** Get data ingestion status by data feed */
  getDataFeedIngestionStatus(
    dataFeedId: string,
    options: MetricsAdvisorAdministrationGetDataFeedIngestionStatusParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetDataFeedIngestionStatus200Response
    | MetricsAdvisorAdministrationGetDataFeedIngestionStatusdefaultResponse
  >;
  /** Reset data ingestion status by data feed to backfill data */
  resetDataFeedIngestionStatus(
    dataFeedId: string,
    options: MetricsAdvisorAdministrationResetDataFeedIngestionStatusParameters
  ): Promise<
    | MetricsAdvisorAdministrationResetDataFeedIngestionStatus204Response
    | MetricsAdvisorAdministrationResetDataFeedIngestionStatusdefaultResponse
  >;
  /** Get data last success ingestion job timestamp by data feed */
  getIngestionProgress(
    dataFeedId: string,
    options?: MetricsAdvisorAdministrationGetIngestionProgressParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetIngestionProgress200Response
    | MetricsAdvisorAdministrationGetIngestionProgressdefaultResponse
  >;
  /** List all anomaly detection configurations for specific metric */
  getAnomalyDetectionConfigurationsByMetric(
    metricId: string,
    options?: MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetric200Response
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricdefaultResponse
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

export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfiguration {
  /** Query a single anomaly alerting configuration */
  get(
    options?: MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfiguration200Response
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Update anomaly alerting configuration */
  patch(
    options: MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateAnomalyAlertingConfiguration200Response
    | MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Delete anomaly alerting configuration */
  delete(
    options?: MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteAnomalyAlertingConfiguration204Response
    | MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration {
  /** Create anomaly alerting configuration */
  post(
    options: MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration201Response
    | MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfiguration {
  /** Query a single anomaly detection configuration */
  get(
    options?: MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfiguration200Response
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Update anomaly detection configuration */
  patch(
    options: MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateAnomalyDetectionConfiguration200Response
    | MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Delete anomaly detection configuration */
  delete(
    options?: MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteAnomalyDetectionConfiguration204Response
    | MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration {
  /** Create anomaly detection configuration */
  post(
    options: MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration201Response
    | MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration {
  /** List all anomaly alerting configurations for specific anomaly detection configuration */
  get(
    options?: MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response
    | MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationCreateCredential {
  /** Create a new data source credential */
  post(
    options: MetricsAdvisorAdministrationCreateCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateCredential201Response
    | MetricsAdvisorAdministrationCreateCredentialdefaultResponse
  >;
  /** List all credentials */
  get(
    options?: MetricsAdvisorAdministrationListCredentialsParameters
  ): Promise<
    | MetricsAdvisorAdministrationListCredentials200Response
    | MetricsAdvisorAdministrationListCredentialsdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationUpdateCredential {
  /** Update a data source credential */
  patch(
    options: MetricsAdvisorAdministrationUpdateCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateCredential200Response
    | MetricsAdvisorAdministrationUpdateCredentialdefaultResponse
  >;
  /** Delete a data source credential */
  delete(
    options?: MetricsAdvisorAdministrationDeleteCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteCredential204Response
    | MetricsAdvisorAdministrationDeleteCredentialdefaultResponse
  >;
  /** Get a data source credential */
  get(
    options?: MetricsAdvisorAdministrationGetCredentialParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetCredential200Response
    | MetricsAdvisorAdministrationGetCredentialdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationListDataFeeds {
  /** List all data feeds */
  get(
    options?: MetricsAdvisorAdministrationListDataFeedsParameters
  ): Promise<
    | MetricsAdvisorAdministrationListDataFeeds200Response
    | MetricsAdvisorAdministrationListDataFeedsdefaultResponse
  >;
  /** Create a new data feed */
  post(
    options: MetricsAdvisorAdministrationCreateDataFeedParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateDataFeed201Response
    | MetricsAdvisorAdministrationCreateDataFeeddefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetDataFeedById {
  /** Get a data feed by its id */
  get(
    options?: MetricsAdvisorAdministrationGetDataFeedByIdParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetDataFeedById200Response
    | MetricsAdvisorAdministrationGetDataFeedByIddefaultResponse
  >;
  /** Update a data feed */
  patch(
    options: MetricsAdvisorAdministrationUpdateDataFeedParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateDataFeed200Response
    | MetricsAdvisorAdministrationUpdateDataFeeddefaultResponse
  >;
  /** Delete a data feed */
  delete(
    options?: MetricsAdvisorAdministrationDeleteDataFeedParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteDataFeed204Response
    | MetricsAdvisorAdministrationDeleteDataFeeddefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationListHooks {
  /** List all hooks */
  get(
    options?: MetricsAdvisorAdministrationListHooksParameters
  ): Promise<
    | MetricsAdvisorAdministrationListHooks200Response
    | MetricsAdvisorAdministrationListHooksdefaultResponse
  >;
  /** Create a new hook */
  post(
    options: MetricsAdvisorAdministrationCreateHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationCreateHook201Response
    | MetricsAdvisorAdministrationCreateHookdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetHook {
  /** Get a hook by its id */
  get(
    options?: MetricsAdvisorAdministrationGetHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetHook200Response
    | MetricsAdvisorAdministrationGetHookdefaultResponse
  >;
  /** Update a hook */
  patch(
    options: MetricsAdvisorAdministrationUpdateHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationUpdateHook200Response
    | MetricsAdvisorAdministrationUpdateHookdefaultResponse
  >;
  /** Delete a hook */
  delete(
    options?: MetricsAdvisorAdministrationDeleteHookParameters
  ): Promise<
    | MetricsAdvisorAdministrationDeleteHook204Response
    | MetricsAdvisorAdministrationDeleteHookdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatus {
  /** Get data ingestion status by data feed */
  post(
    options: MetricsAdvisorAdministrationGetDataFeedIngestionStatusParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetDataFeedIngestionStatus200Response
    | MetricsAdvisorAdministrationGetDataFeedIngestionStatusdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationResetDataFeedIngestionStatus {
  /** Reset data ingestion status by data feed to backfill data */
  post(
    options: MetricsAdvisorAdministrationResetDataFeedIngestionStatusParameters
  ): Promise<
    | MetricsAdvisorAdministrationResetDataFeedIngestionStatus204Response
    | MetricsAdvisorAdministrationResetDataFeedIngestionStatusdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetIngestionProgress {
  /** Get data last success ingestion job timestamp by data feed */
  get(
    options?: MetricsAdvisorAdministrationGetIngestionProgressParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetIngestionProgress200Response
    | MetricsAdvisorAdministrationGetIngestionProgressdefaultResponse
  >;
}

export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetric {
  /** List all anomaly detection configurations for specific metric */
  get(
    options?: MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricParameters
  ): Promise<
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetric200Response
    | MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricdefaultResponse
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
  /** Resource for '/alert/anomaly/configurations/\{configurationId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/alert/anomaly/configurations/{configurationId}",
    configurationId: string
  ): MetricsAdvisorAdministrationGetAnomalyAlertingConfiguration;
  /** Resource for '/alert/anomaly/configurations' has methods for the following verbs: post */
  (
    path: "/alert/anomaly/configurations"
  ): MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}",
    configurationId: string
  ): MetricsAdvisorAdministrationGetAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations' has methods for the following verbs: post */
  (
    path: "/enrichment/anomalyDetection/configurations"
  ): MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/alert/anomaly/configurations' has methods for the following verbs: get */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/alert/anomaly/configurations",
    configurationId: string
  ): MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration;
  /** Resource for '/credentials' has methods for the following verbs: post, get */
  (path: "/credentials"): MetricsAdvisorAdministrationCreateCredential;
  /** Resource for '/credentials/\{credentialId\}' has methods for the following verbs: patch, delete, get */
  (
    path: "/credentials/{credentialId}",
    credentialId: string
  ): MetricsAdvisorAdministrationUpdateCredential;
  /** Resource for '/dataFeeds' has methods for the following verbs: get, post */
  (path: "/dataFeeds"): MetricsAdvisorAdministrationListDataFeeds;
  /** Resource for '/dataFeeds/\{dataFeedId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/dataFeeds/{dataFeedId}",
    dataFeedId: string
  ): MetricsAdvisorAdministrationGetDataFeedById;
  /** Resource for '/hooks' has methods for the following verbs: get, post */
  (path: "/hooks"): MetricsAdvisorAdministrationListHooks;
  /** Resource for '/hooks/\{hookId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/hooks/{hookId}",
    hookId: string
  ): MetricsAdvisorAdministrationGetHook;
  /** Resource for '/dataFeeds/\{dataFeedId\}/ingestionStatus/query' has methods for the following verbs: post */
  (
    path: "/dataFeeds/{dataFeedId}/ingestionStatus/query",
    dataFeedId: string
  ): MetricsAdvisorAdministrationGetDataFeedIngestionStatus;
  /** Resource for '/dataFeeds/\{dataFeedId\}/ingestionProgress/reset' has methods for the following verbs: post */
  (
    path: "/dataFeeds/{dataFeedId}/ingestionProgress/reset",
    dataFeedId: string
  ): MetricsAdvisorAdministrationResetDataFeedIngestionStatus;
  /** Resource for '/dataFeeds/\{dataFeedId\}/ingestionProgress' has methods for the following verbs: get */
  (
    path: "/dataFeeds/{dataFeedId}/ingestionProgress",
    dataFeedId: string
  ): MetricsAdvisorAdministrationGetIngestionProgress;
  /** Resource for '/metrics/\{metricId\}/enrichment/anomalyDetection/configurations' has methods for the following verbs: get */
  (
    path: "/metrics/{metricId}/enrichment/anomalyDetection/configurations",
    metricId: string
  ): MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetric;
}

export type GeneratedClient = Client & {
  path: Routes;
  metricsAdvisorAdministration: MetricsAdvisorAdministrationOperations;
} & ClientOperations;
