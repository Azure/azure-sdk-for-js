// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetAnomalyAlertingConfigurationParameters,
  UpdateAnomalyAlertingConfigurationParameters,
  DeleteAnomalyAlertingConfigurationParameters,
  CreateAnomalyAlertingConfigurationParameters,
  GetAnomalyDetectionConfigurationParameters,
  UpdateAnomalyDetectionConfigurationParameters,
  DeleteAnomalyDetectionConfigurationParameters,
  CreateAnomalyDetectionConfigurationParameters,
  GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters,
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
  ListHooksParameters,
  CreateHookParameters,
  GetHookParameters,
  UpdateHookParameters,
  DeleteHookParameters,
  GetDataFeedIngestionStatusParameters,
  ResetDataFeedIngestionStatusParameters,
  GetIngestionProgressParameters,
  GetAnomalyDetectionConfigurationsByMetricParameters
} from "./parameters";
import {
  GetAnomalyAlertingConfiguration200Response,
  GetAnomalyAlertingConfigurationdefaultResponse,
  UpdateAnomalyAlertingConfiguration200Response,
  UpdateAnomalyAlertingConfigurationdefaultResponse,
  DeleteAnomalyAlertingConfiguration204Response,
  DeleteAnomalyAlertingConfigurationdefaultResponse,
  CreateAnomalyAlertingConfiguration201Response,
  CreateAnomalyAlertingConfigurationdefaultResponse,
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
  GetAnomalyDetectionConfigurationsByMetric200Response,
  GetAnomalyDetectionConfigurationsByMetricdefaultResponse
} from "./responses";
import { Client } from "@azure-rest/core-client";

/** Contains operations for Client operations */
export interface ClientOperations {
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
  /** List all anomaly detection configurations for specific metric */
  getAnomalyDetectionConfigurationsByMetric(
    metricId: string,
    options?: GetAnomalyDetectionConfigurationsByMetricParameters
  ): Promise<
    | GetAnomalyDetectionConfigurationsByMetric200Response
    | GetAnomalyDetectionConfigurationsByMetricdefaultResponse
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

export interface GetAnomalyDetectionConfigurationsByMetric {
  /** List all anomaly detection configurations for specific metric */
  get(
    options?: GetAnomalyDetectionConfigurationsByMetricParameters
  ): Promise<
    | GetAnomalyDetectionConfigurationsByMetric200Response
    | GetAnomalyDetectionConfigurationsByMetricdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/alert/anomaly/configurations/\{configurationId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/alert/anomaly/configurations/{configurationId}",
    configurationId: string
  ): GetAnomalyAlertingConfiguration;
  /** Resource for '/alert/anomaly/configurations' has methods for the following verbs: post */
  (path: "/alert/anomaly/configurations"): CreateAnomalyAlertingConfiguration;
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
  /** Resource for '/credentials' has methods for the following verbs: post, get */
  (path: "/credentials"): CreateCredential;
  /** Resource for '/credentials/\{credentialId\}' has methods for the following verbs: patch, delete, get */
  (path: "/credentials/{credentialId}", credentialId: string): UpdateCredential;
  /** Resource for '/dataFeeds' has methods for the following verbs: get, post */
  (path: "/dataFeeds"): ListDataFeeds;
  /** Resource for '/dataFeeds/\{dataFeedId\}' has methods for the following verbs: get, patch, delete */
  (path: "/dataFeeds/{dataFeedId}", dataFeedId: string): GetDataFeedById;
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
  /** Resource for '/metrics/\{metricId\}/enrichment/anomalyDetection/configurations' has methods for the following verbs: get */
  (
    path: "/metrics/{metricId}/enrichment/anomalyDetection/configurations",
    metricId: string
  ): GetAnomalyDetectionConfigurationsByMetric;
}

export type MetricsAdvisorAdministrationClient = Client & {
  path: Routes;
} & ClientOperations;
