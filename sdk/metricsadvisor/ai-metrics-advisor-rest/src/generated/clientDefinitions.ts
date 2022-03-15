// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetActiveSeriesCountParameters,
  GetAnomalyAlertingConfigurationParameters,
  UpdateAnomalyAlertingConfigurationParameters,
  DeleteAnomalyAlertingConfigurationParameters,
  CreateAnomalyAlertingConfigurationParameters,
  GetAlertsByAnomalyAlertingConfigurationParameters,
  GetAnomaliesFromAlertByAnomalyAlertingConfigurationParameters,
  GetIncidentsFromAlertByAnomalyAlertingConfigurationParameters,
  GetAnomalyDetectionConfigurationParameters,
  UpdateAnomalyDetectionConfigurationParameters,
  DeleteAnomalyDetectionConfigurationParameters,
  CreateAnomalyDetectionConfigurationParameters,
  GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters,
  GetSeriesByAnomalyDetectionConfigurationParameters,
  GetAnomaliesByAnomalyDetectionConfigurationParameters,
  GetDimensionOfAnomaliesByAnomalyDetectionConfigurationParameters,
  GetIncidentsByAnomalyDetectionConfigurationParameters,
  GetIncidentsByAnomalyDetectionConfigurationNextPagesParameters,
  GetRootCauseOfIncidentByAnomalyDetectionConfigurationParameters,
  CreateCredentialParameters,
  ListCredentialsParameters,
  UpdateCredentialParameters,
  DeleteCredentialParameters,
  GetCredentialParameters,
  ListDataFeedsParameters,
  CreateDataFeedParameters,
  GetDataFeedByIdParameters,
  UpdateDataFeedParameters,
  DeleteDataFeedParameters,
  GetMetricFeedbackParameters,
  ListMetricFeedbacksParameters,
  CreateMetricFeedbackParameters,
  ListHooksParameters,
  CreateHookParameters,
  GetHookParameters,
  UpdateHookParameters,
  DeleteHookParameters,
  GetDataFeedIngestionStatusParameters,
  ResetDataFeedIngestionStatusParameters,
  GetIngestionProgressParameters,
  GetMetricDataParameters,
  GetMetricSeriesParameters,
  GetMetricDimensionParameters,
  GetAnomalyDetectionConfigurationsByMetricParameters,
  GetEnrichmentStatusByMetricParameters
} from "./parameters";
import {
  GetActiveSeriesCount200Response,
  GetActiveSeriesCountdefaultResponse,
  GetAnomalyAlertingConfiguration200Response,
  GetAnomalyAlertingConfigurationdefaultResponse,
  UpdateAnomalyAlertingConfiguration200Response,
  UpdateAnomalyAlertingConfigurationdefaultResponse,
  DeleteAnomalyAlertingConfiguration204Response,
  DeleteAnomalyAlertingConfigurationdefaultResponse,
  CreateAnomalyAlertingConfiguration201Response,
  CreateAnomalyAlertingConfigurationdefaultResponse,
  GetAlertsByAnomalyAlertingConfiguration200Response,
  GetAlertsByAnomalyAlertingConfigurationdefaultResponse,
  GetAnomaliesFromAlertByAnomalyAlertingConfiguration200Response,
  GetAnomaliesFromAlertByAnomalyAlertingConfigurationdefaultResponse,
  GetIncidentsFromAlertByAnomalyAlertingConfiguration200Response,
  GetIncidentsFromAlertByAnomalyAlertingConfigurationdefaultResponse,
  GetAnomalyDetectionConfiguration200Response,
  GetAnomalyDetectionConfigurationdefaultResponse,
  UpdateAnomalyDetectionConfiguration200Response,
  UpdateAnomalyDetectionConfigurationdefaultResponse,
  DeleteAnomalyDetectionConfiguration204Response,
  DeleteAnomalyDetectionConfigurationdefaultResponse,
  CreateAnomalyDetectionConfiguration201Response,
  CreateAnomalyDetectionConfigurationdefaultResponse,
  GetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response,
  GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse,
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
  CreateCredential201Response,
  CreateCredentialdefaultResponse,
  ListCredentials200Response,
  ListCredentialsdefaultResponse,
  UpdateCredential200Response,
  UpdateCredentialdefaultResponse,
  DeleteCredential204Response,
  DeleteCredentialdefaultResponse,
  GetCredential200Response,
  GetCredentialdefaultResponse,
  ListDataFeeds200Response,
  ListDataFeedsdefaultResponse,
  CreateDataFeed201Response,
  CreateDataFeeddefaultResponse,
  GetDataFeedById200Response,
  GetDataFeedByIddefaultResponse,
  UpdateDataFeed200Response,
  UpdateDataFeeddefaultResponse,
  DeleteDataFeed204Response,
  DeleteDataFeeddefaultResponse,
  GetMetricFeedback200Response,
  GetMetricFeedbackdefaultResponse,
  ListMetricFeedbacks200Response,
  ListMetricFeedbacksdefaultResponse,
  CreateMetricFeedback201Response,
  CreateMetricFeedbackdefaultResponse,
  ListHooks200Response,
  ListHooksdefaultResponse,
  CreateHook201Response,
  CreateHookdefaultResponse,
  GetHook200Response,
  GetHookdefaultResponse,
  UpdateHook200Response,
  UpdateHookdefaultResponse,
  DeleteHook204Response,
  DeleteHookdefaultResponse,
  GetDataFeedIngestionStatus200Response,
  GetDataFeedIngestionStatusdefaultResponse,
  ResetDataFeedIngestionStatus204Response,
  ResetDataFeedIngestionStatusdefaultResponse,
  GetIngestionProgress200Response,
  GetIngestionProgressdefaultResponse,
  GetMetricData200Response,
  GetMetricDatadefaultResponse,
  GetMetricSeries200Response,
  GetMetricSeriesdefaultResponse,
  GetMetricDimension200Response,
  GetMetricDimensiondefaultResponse,
  GetAnomalyDetectionConfigurationsByMetric200Response,
  GetAnomalyDetectionConfigurationsByMetricdefaultResponse,
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
  /** Query a single anomaly alerting configuration */
  getAnomalyAlertingConfiguration(
    configurationId: string,
    options?: GetAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetAnomalyAlertingConfiguration200Response
    | GetAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Update anomaly alerting configuration */
  updateAnomalyAlertingConfiguration(
    configurationId: string,
    options: UpdateAnomalyAlertingConfigurationParameters
  ): Promise<
    | UpdateAnomalyAlertingConfiguration200Response
    | UpdateAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Delete anomaly alerting configuration */
  deleteAnomalyAlertingConfiguration(
    configurationId: string,
    options?: DeleteAnomalyAlertingConfigurationParameters
  ): Promise<
    | DeleteAnomalyAlertingConfiguration204Response
    | DeleteAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Create anomaly alerting configuration */
  createAnomalyAlertingConfiguration(
    options: CreateAnomalyAlertingConfigurationParameters
  ): Promise<
    | CreateAnomalyAlertingConfiguration201Response
    | CreateAnomalyAlertingConfigurationdefaultResponse
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
  /** Query a single anomaly detection configuration */
  getAnomalyDetectionConfiguration(
    configurationId: string,
    options?: GetAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetAnomalyDetectionConfiguration200Response
    | GetAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Update anomaly detection configuration */
  updateAnomalyDetectionConfiguration(
    configurationId: string,
    options: UpdateAnomalyDetectionConfigurationParameters
  ): Promise<
    | UpdateAnomalyDetectionConfiguration200Response
    | UpdateAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Delete anomaly detection configuration */
  deleteAnomalyDetectionConfiguration(
    configurationId: string,
    options?: DeleteAnomalyDetectionConfigurationParameters
  ): Promise<
    | DeleteAnomalyDetectionConfiguration204Response
    | DeleteAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Create anomaly detection configuration */
  createAnomalyDetectionConfiguration(
    options: CreateAnomalyDetectionConfigurationParameters
  ): Promise<
    | CreateAnomalyDetectionConfiguration201Response
    | CreateAnomalyDetectionConfigurationdefaultResponse
  >;
  /** List all anomaly alerting configurations for specific anomaly detection configuration */
  getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration(
    configurationId: string,
    options?: GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response
    | GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse
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
  /** Create a new data source credential */
  createCredential(
    options: CreateCredentialParameters
  ): Promise<CreateCredential201Response | CreateCredentialdefaultResponse>;
  /** List all credentials */
  listCredentials(
    options?: ListCredentialsParameters
  ): Promise<ListCredentials200Response | ListCredentialsdefaultResponse>;
  /** Update a data source credential */
  updateCredential(
    credentialId: string,
    options: UpdateCredentialParameters
  ): Promise<UpdateCredential200Response | UpdateCredentialdefaultResponse>;
  /** Delete a data source credential */
  deleteCredential(
    credentialId: string,
    options?: DeleteCredentialParameters
  ): Promise<DeleteCredential204Response | DeleteCredentialdefaultResponse>;
  /** Get a data source credential */
  getCredential(
    credentialId: string,
    options?: GetCredentialParameters
  ): Promise<GetCredential200Response | GetCredentialdefaultResponse>;
  /** List all data feeds */
  listDataFeeds(
    options?: ListDataFeedsParameters
  ): Promise<ListDataFeeds200Response | ListDataFeedsdefaultResponse>;
  /** Create a new data feed */
  createDataFeed(
    options: CreateDataFeedParameters
  ): Promise<CreateDataFeed201Response | CreateDataFeeddefaultResponse>;
  /** Get a data feed by its id */
  getDataFeedById(
    dataFeedId: string,
    options?: GetDataFeedByIdParameters
  ): Promise<GetDataFeedById200Response | GetDataFeedByIddefaultResponse>;
  /** Update a data feed */
  updateDataFeed(
    dataFeedId: string,
    options: UpdateDataFeedParameters
  ): Promise<UpdateDataFeed200Response | UpdateDataFeeddefaultResponse>;
  /** Delete a data feed */
  deleteDataFeed(
    dataFeedId: string,
    options?: DeleteDataFeedParameters
  ): Promise<DeleteDataFeed204Response | DeleteDataFeeddefaultResponse>;
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
  /** List all hooks */
  listHooks(
    options?: ListHooksParameters
  ): Promise<ListHooks200Response | ListHooksdefaultResponse>;
  /** Create a new hook */
  createHook(
    options: CreateHookParameters
  ): Promise<CreateHook201Response | CreateHookdefaultResponse>;
  /** Get a hook by its id */
  getHook(
    hookId: string,
    options?: GetHookParameters
  ): Promise<GetHook200Response | GetHookdefaultResponse>;
  /** Update a hook */
  updateHook(
    hookId: string,
    options: UpdateHookParameters
  ): Promise<UpdateHook200Response | UpdateHookdefaultResponse>;
  /** Delete a hook */
  deleteHook(
    hookId: string,
    options?: DeleteHookParameters
  ): Promise<DeleteHook204Response | DeleteHookdefaultResponse>;
  /** Get data ingestion status by data feed */
  getDataFeedIngestionStatus(
    dataFeedId: string,
    options: GetDataFeedIngestionStatusParameters
  ): Promise<
    | GetDataFeedIngestionStatus200Response
    | GetDataFeedIngestionStatusdefaultResponse
  >;
  /** Reset data ingestion status by data feed to backfill data */
  resetDataFeedIngestionStatus(
    dataFeedId: string,
    options: ResetDataFeedIngestionStatusParameters
  ): Promise<
    | ResetDataFeedIngestionStatus204Response
    | ResetDataFeedIngestionStatusdefaultResponse
  >;
  /** Get data last success ingestion job timestamp by data feed */
  getIngestionProgress(
    dataFeedId: string,
    options?: GetIngestionProgressParameters
  ): Promise<
    GetIngestionProgress200Response | GetIngestionProgressdefaultResponse
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
  /** List all anomaly detection configurations for specific metric */
  getAnomalyDetectionConfigurationsByMetric(
    metricId: string,
    options?: GetAnomalyDetectionConfigurationsByMetricParameters
  ): Promise<
    | GetAnomalyDetectionConfigurationsByMetric200Response
    | GetAnomalyDetectionConfigurationsByMetricdefaultResponse
  >;
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

export interface GetAnomalyAlertingConfiguration {
  /** Query a single anomaly alerting configuration */
  get(
    options?: GetAnomalyAlertingConfigurationParameters
  ): Promise<
    | GetAnomalyAlertingConfiguration200Response
    | GetAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Update anomaly alerting configuration */
  patch(
    options: UpdateAnomalyAlertingConfigurationParameters
  ): Promise<
    | UpdateAnomalyAlertingConfiguration200Response
    | UpdateAnomalyAlertingConfigurationdefaultResponse
  >;
  /** Delete anomaly alerting configuration */
  delete(
    options?: DeleteAnomalyAlertingConfigurationParameters
  ): Promise<
    | DeleteAnomalyAlertingConfiguration204Response
    | DeleteAnomalyAlertingConfigurationdefaultResponse
  >;
}

export interface CreateAnomalyAlertingConfiguration {
  /** Create anomaly alerting configuration */
  post(
    options: CreateAnomalyAlertingConfigurationParameters
  ): Promise<
    | CreateAnomalyAlertingConfiguration201Response
    | CreateAnomalyAlertingConfigurationdefaultResponse
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

export interface GetAnomalyDetectionConfiguration {
  /** Query a single anomaly detection configuration */
  get(
    options?: GetAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetAnomalyDetectionConfiguration200Response
    | GetAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Update anomaly detection configuration */
  patch(
    options: UpdateAnomalyDetectionConfigurationParameters
  ): Promise<
    | UpdateAnomalyDetectionConfiguration200Response
    | UpdateAnomalyDetectionConfigurationdefaultResponse
  >;
  /** Delete anomaly detection configuration */
  delete(
    options?: DeleteAnomalyDetectionConfigurationParameters
  ): Promise<
    | DeleteAnomalyDetectionConfiguration204Response
    | DeleteAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface CreateAnomalyDetectionConfiguration {
  /** Create anomaly detection configuration */
  post(
    options: CreateAnomalyDetectionConfigurationParameters
  ): Promise<
    | CreateAnomalyDetectionConfiguration201Response
    | CreateAnomalyDetectionConfigurationdefaultResponse
  >;
}

export interface GetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration {
  /** List all anomaly alerting configurations for specific anomaly detection configuration */
  get(
    options?: GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters
  ): Promise<
    | GetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response
    | GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse
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

export interface CreateCredential {
  /** Create a new data source credential */
  post(
    options: CreateCredentialParameters
  ): Promise<CreateCredential201Response | CreateCredentialdefaultResponse>;
  /** List all credentials */
  get(
    options?: ListCredentialsParameters
  ): Promise<ListCredentials200Response | ListCredentialsdefaultResponse>;
}

export interface UpdateCredential {
  /** Update a data source credential */
  patch(
    options: UpdateCredentialParameters
  ): Promise<UpdateCredential200Response | UpdateCredentialdefaultResponse>;
  /** Delete a data source credential */
  delete(
    options?: DeleteCredentialParameters
  ): Promise<DeleteCredential204Response | DeleteCredentialdefaultResponse>;
  /** Get a data source credential */
  get(
    options?: GetCredentialParameters
  ): Promise<GetCredential200Response | GetCredentialdefaultResponse>;
}

export interface ListDataFeeds {
  /** List all data feeds */
  get(
    options?: ListDataFeedsParameters
  ): Promise<ListDataFeeds200Response | ListDataFeedsdefaultResponse>;
  /** Create a new data feed */
  post(
    options: CreateDataFeedParameters
  ): Promise<CreateDataFeed201Response | CreateDataFeeddefaultResponse>;
}

export interface GetDataFeedById {
  /** Get a data feed by its id */
  get(
    options?: GetDataFeedByIdParameters
  ): Promise<GetDataFeedById200Response | GetDataFeedByIddefaultResponse>;
  /** Update a data feed */
  patch(
    options: UpdateDataFeedParameters
  ): Promise<UpdateDataFeed200Response | UpdateDataFeeddefaultResponse>;
  /** Delete a data feed */
  delete(
    options?: DeleteDataFeedParameters
  ): Promise<DeleteDataFeed204Response | DeleteDataFeeddefaultResponse>;
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

export interface ListHooks {
  /** List all hooks */
  get(
    options?: ListHooksParameters
  ): Promise<ListHooks200Response | ListHooksdefaultResponse>;
  /** Create a new hook */
  post(
    options: CreateHookParameters
  ): Promise<CreateHook201Response | CreateHookdefaultResponse>;
}

export interface GetHook {
  /** Get a hook by its id */
  get(
    options?: GetHookParameters
  ): Promise<GetHook200Response | GetHookdefaultResponse>;
  /** Update a hook */
  patch(
    options: UpdateHookParameters
  ): Promise<UpdateHook200Response | UpdateHookdefaultResponse>;
  /** Delete a hook */
  delete(
    options?: DeleteHookParameters
  ): Promise<DeleteHook204Response | DeleteHookdefaultResponse>;
}

export interface GetDataFeedIngestionStatus {
  /** Get data ingestion status by data feed */
  post(
    options: GetDataFeedIngestionStatusParameters
  ): Promise<
    | GetDataFeedIngestionStatus200Response
    | GetDataFeedIngestionStatusdefaultResponse
  >;
}

export interface ResetDataFeedIngestionStatus {
  /** Reset data ingestion status by data feed to backfill data */
  post(
    options: ResetDataFeedIngestionStatusParameters
  ): Promise<
    | ResetDataFeedIngestionStatus204Response
    | ResetDataFeedIngestionStatusdefaultResponse
  >;
}

export interface GetIngestionProgress {
  /** Get data last success ingestion job timestamp by data feed */
  get(
    options?: GetIngestionProgressParameters
  ): Promise<
    GetIngestionProgress200Response | GetIngestionProgressdefaultResponse
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

export interface GetAnomalyDetectionConfigurationsByMetric {
  /** List all anomaly detection configurations for specific metric */
  get(
    options?: GetAnomalyDetectionConfigurationsByMetricParameters
  ): Promise<
    | GetAnomalyDetectionConfigurationsByMetric200Response
    | GetAnomalyDetectionConfigurationsByMetricdefaultResponse
  >;
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
  /** Resource for '/alert/anomaly/configurations/\{configurationId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/alert/anomaly/configurations/{configurationId}",
    configurationId: string
  ): GetAnomalyAlertingConfiguration;
  /** Resource for '/alert/anomaly/configurations' has methods for the following verbs: post */
  (path: "/alert/anomaly/configurations"): CreateAnomalyAlertingConfiguration;
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
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}",
    configurationId: string
  ): GetAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations' has methods for the following verbs: post */
  (
    path: "/enrichment/anomalyDetection/configurations"
  ): CreateAnomalyDetectionConfiguration;
  /** Resource for '/enrichment/anomalyDetection/configurations/\{configurationId\}/alert/anomaly/configurations' has methods for the following verbs: get */
  (
    path: "/enrichment/anomalyDetection/configurations/{configurationId}/alert/anomaly/configurations",
    configurationId: string
  ): GetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration;
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
  /** Resource for '/credentials' has methods for the following verbs: post, get */
  (path: "/credentials"): CreateCredential;
  /** Resource for '/credentials/\{credentialId\}' has methods for the following verbs: patch, delete, get */
  (path: "/credentials/{credentialId}", credentialId: string): UpdateCredential;
  /** Resource for '/dataFeeds' has methods for the following verbs: get, post */
  (path: "/dataFeeds"): ListDataFeeds;
  /** Resource for '/dataFeeds/\{dataFeedId\}' has methods for the following verbs: get, patch, delete */
  (path: "/dataFeeds/{dataFeedId}", dataFeedId: string): GetDataFeedById;
  /** Resource for '/feedback/metric/\{feedbackId\}' has methods for the following verbs: get */
  (
    path: "/feedback/metric/{feedbackId}",
    feedbackId: string
  ): GetMetricFeedback;
  /** Resource for '/feedback/metric/query' has methods for the following verbs: post */
  (path: "/feedback/metric/query"): ListMetricFeedbacks;
  /** Resource for '/feedback/metric' has methods for the following verbs: post */
  (path: "/feedback/metric"): CreateMetricFeedback;
  /** Resource for '/hooks' has methods for the following verbs: get, post */
  (path: "/hooks"): ListHooks;
  /** Resource for '/hooks/\{hookId\}' has methods for the following verbs: get, patch, delete */
  (path: "/hooks/{hookId}", hookId: string): GetHook;
  /** Resource for '/dataFeeds/\{dataFeedId\}/ingestionStatus/query' has methods for the following verbs: post */
  (
    path: "/dataFeeds/{dataFeedId}/ingestionStatus/query",
    dataFeedId: string
  ): GetDataFeedIngestionStatus;
  /** Resource for '/dataFeeds/\{dataFeedId\}/ingestionProgress/reset' has methods for the following verbs: post */
  (
    path: "/dataFeeds/{dataFeedId}/ingestionProgress/reset",
    dataFeedId: string
  ): ResetDataFeedIngestionStatus;
  /** Resource for '/dataFeeds/\{dataFeedId\}/ingestionProgress' has methods for the following verbs: get */
  (
    path: "/dataFeeds/{dataFeedId}/ingestionProgress",
    dataFeedId: string
  ): GetIngestionProgress;
  /** Resource for '/metrics/\{metricId\}/data/query' has methods for the following verbs: post */
  (path: "/metrics/{metricId}/data/query", metricId: string): GetMetricData;
  /** Resource for '/metrics/\{metricId\}/series/query' has methods for the following verbs: post */
  (path: "/metrics/{metricId}/series/query", metricId: string): GetMetricSeries;
  /** Resource for '/metrics/\{metricId\}/dimension/query' has methods for the following verbs: post */
  (
    path: "/metrics/{metricId}/dimension/query",
    metricId: string
  ): GetMetricDimension;
  /** Resource for '/metrics/\{metricId\}/enrichment/anomalyDetection/configurations' has methods for the following verbs: get */
  (
    path: "/metrics/{metricId}/enrichment/anomalyDetection/configurations",
    metricId: string
  ): GetAnomalyDetectionConfigurationsByMetric;
  /** Resource for '/metrics/\{metricId\}/status/enrichment/anomalyDetection/query' has methods for the following verbs: post */
  (
    path: "/metrics/{metricId}/status/enrichment/anomalyDetection/query",
    metricId: string
  ): GetEnrichmentStatusByMetric;
}

export type MetricsAdvisorRestClientLike = Client & {
  path: Routes;
} & ClientOperations;
