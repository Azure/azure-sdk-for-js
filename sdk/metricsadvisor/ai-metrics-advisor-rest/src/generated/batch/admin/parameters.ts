// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AnomalyAlertingConfigurationPatch,
  AnomalyAlertingConfiguration,
  AnomalyDetectionConfigurationPatch,
  AnomalyDetectionConfiguration,
  DataSourceCredential,
  DataSourceCredentialPatch,
  DataFeedDetail,
  DataFeedDetailPatch,
  HookInfo,
  HookInfoPatch,
  IngestionStatusQueryOptions,
  IngestionProgressResetOptions
} from "./models";

export type GetAnomalyAlertingConfigurationParameters = RequestParameters;

export interface UpdateAnomalyAlertingConfigurationBodyParam {
  /** anomaly alerting configuration */
  body: AnomalyAlertingConfigurationPatch;
}

export interface UpdateAnomalyAlertingConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type UpdateAnomalyAlertingConfigurationParameters = UpdateAnomalyAlertingConfigurationMediaTypesParam &
  UpdateAnomalyAlertingConfigurationBodyParam &
  RequestParameters;
export type DeleteAnomalyAlertingConfigurationParameters = RequestParameters;

export interface CreateAnomalyAlertingConfigurationBodyParam {
  /** anomaly alerting configuration */
  body: AnomalyAlertingConfiguration;
}

export interface CreateAnomalyAlertingConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateAnomalyAlertingConfigurationParameters = CreateAnomalyAlertingConfigurationMediaTypesParam &
  CreateAnomalyAlertingConfigurationBodyParam &
  RequestParameters;
export type GetAnomalyDetectionConfigurationParameters = RequestParameters;

export interface UpdateAnomalyDetectionConfigurationBodyParam {
  /** anomaly detection configuration */
  body: AnomalyDetectionConfigurationPatch;
}

export interface UpdateAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type UpdateAnomalyDetectionConfigurationParameters = UpdateAnomalyDetectionConfigurationMediaTypesParam &
  UpdateAnomalyDetectionConfigurationBodyParam &
  RequestParameters;
export type DeleteAnomalyDetectionConfigurationParameters = RequestParameters;

export interface CreateAnomalyDetectionConfigurationBodyParam {
  /** anomaly detection configuration */
  body: AnomalyDetectionConfiguration;
}

export interface CreateAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateAnomalyDetectionConfigurationParameters = CreateAnomalyDetectionConfigurationMediaTypesParam &
  CreateAnomalyDetectionConfigurationBodyParam &
  RequestParameters;

export interface GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParam {
  queryParameters?: GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParamProperties;
}

export type GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters = GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParam &
  RequestParameters;

export interface CreateCredentialBodyParam {
  /** Create data source credential request */
  body: DataSourceCredential;
}

export interface CreateCredentialMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateCredentialParameters = CreateCredentialMediaTypesParam &
  CreateCredentialBodyParam &
  RequestParameters;

export interface ListCredentialsQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface ListCredentialsQueryParam {
  queryParameters?: ListCredentialsQueryParamProperties;
}

export type ListCredentialsParameters = ListCredentialsQueryParam &
  RequestParameters;

export interface UpdateCredentialBodyParam {
  /** Update data source credential request */
  body: DataSourceCredentialPatch;
}

export interface UpdateCredentialMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type UpdateCredentialParameters = UpdateCredentialMediaTypesParam &
  UpdateCredentialBodyParam &
  RequestParameters;
export type DeleteCredentialParameters = RequestParameters;
export type GetCredentialParameters = RequestParameters;

export interface ListDataFeedsQueryParamProperties {
  /** filter data feed by its name */
  dataFeedName?: string;
  /** filter data feed by its source type */
  dataSourceType?:
    | "AzureApplicationInsights"
    | "AzureBlob"
    | "AzureCosmosDB"
    | "AzureDataExplorer"
    | "AzureDataLakeStorageGen2"
    | "AzureEventHubs"
    | "AzureLogAnalytics"
    | "AzureTable"
    | "InfluxDB"
    | "MongoDB"
    | "MySql"
    | "PostgreSql"
    | "SqlServer";
  /** filter data feed by its granularity */
  granularityName?:
    | "Yearly"
    | "Monthly"
    | "Weekly"
    | "Daily"
    | "Hourly"
    | "Minutely"
    | "Custom";
  /** filter data feed by its status */
  status?: "Active" | "Paused";
  /** filter data feed by its creator */
  creator?: string;
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface ListDataFeedsQueryParam {
  queryParameters?: ListDataFeedsQueryParamProperties;
}

export type ListDataFeedsParameters = ListDataFeedsQueryParam &
  RequestParameters;

export interface CreateDataFeedBodyParam {
  /** parameters to create a data feed */
  body: DataFeedDetail;
}

export interface CreateDataFeedMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateDataFeedParameters = CreateDataFeedMediaTypesParam &
  CreateDataFeedBodyParam &
  RequestParameters;
export type GetDataFeedByIdParameters = RequestParameters;

export interface UpdateDataFeedBodyParam {
  /** parameters to update a data feed */
  body: DataFeedDetailPatch;
}

export interface UpdateDataFeedMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type UpdateDataFeedParameters = UpdateDataFeedMediaTypesParam &
  UpdateDataFeedBodyParam &
  RequestParameters;
export type DeleteDataFeedParameters = RequestParameters;

export interface ListHooksQueryParamProperties {
  /** filter hook by its name */
  hookName?: string;
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface ListHooksQueryParam {
  queryParameters?: ListHooksQueryParamProperties;
}

export type ListHooksParameters = ListHooksQueryParam & RequestParameters;

export interface CreateHookBodyParam {
  /** Create hook request */
  body: HookInfo;
}

export interface CreateHookMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateHookParameters = CreateHookMediaTypesParam &
  CreateHookBodyParam &
  RequestParameters;
export type GetHookParameters = RequestParameters;

export interface UpdateHookBodyParam {
  /** Update hook request */
  body: HookInfoPatch;
}

export interface UpdateHookMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type UpdateHookParameters = UpdateHookMediaTypesParam &
  UpdateHookBodyParam &
  RequestParameters;
export type DeleteHookParameters = RequestParameters;

export interface GetDataFeedIngestionStatusBodyParam {
  /** The query time range */
  body: IngestionStatusQueryOptions;
}

export interface GetDataFeedIngestionStatusQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetDataFeedIngestionStatusQueryParam {
  queryParameters?: GetDataFeedIngestionStatusQueryParamProperties;
}

export interface GetDataFeedIngestionStatusMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetDataFeedIngestionStatusParameters = GetDataFeedIngestionStatusQueryParam &
  GetDataFeedIngestionStatusMediaTypesParam &
  GetDataFeedIngestionStatusBodyParam &
  RequestParameters;

export interface ResetDataFeedIngestionStatusBodyParam {
  /** The backfill time range */
  body: IngestionProgressResetOptions;
}

export interface ResetDataFeedIngestionStatusMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ResetDataFeedIngestionStatusParameters = ResetDataFeedIngestionStatusMediaTypesParam &
  ResetDataFeedIngestionStatusBodyParam &
  RequestParameters;
export type GetIngestionProgressParameters = RequestParameters;

export interface GetAnomalyDetectionConfigurationsByMetricQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetAnomalyDetectionConfigurationsByMetricQueryParam {
  queryParameters?: GetAnomalyDetectionConfigurationsByMetricQueryParamProperties;
}

export type GetAnomalyDetectionConfigurationsByMetricParameters = GetAnomalyDetectionConfigurationsByMetricQueryParam &
  RequestParameters;
