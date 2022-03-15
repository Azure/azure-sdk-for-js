// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AnomalyAlertingConfigurationPatch,
  AnomalyAlertingConfiguration,
  AlertingResultQuery,
  AnomalyDetectionConfigurationPatch,
  AnomalyDetectionConfiguration,
  DetectionSeriesQuery,
  DetectionAnomalyResultQuery,
  AnomalyDimensionQuery,
  DetectionIncidentResultQuery,
  DataSourceCredential,
  DataSourceCredentialPatch,
  DataFeedDetail,
  DataFeedDetailPatch,
  MetricFeedbackFilter,
  MetricFeedback,
  HookInfo,
  HookInfoPatch,
  IngestionStatusQueryOptions,
  IngestionProgressResetOptions,
  MetricDataQueryOptions,
  MetricSeriesQueryOptions,
  MetricDimensionQueryOptions,
  EnrichmentStatusQueryOption
} from "./models";

export type GetActiveSeriesCountParameters = RequestParameters;
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

export interface GetAlertsByAnomalyAlertingConfigurationBodyParam {
  /** query alerting result request */
  body: AlertingResultQuery;
}

export interface GetAlertsByAnomalyAlertingConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetAlertsByAnomalyAlertingConfigurationQueryParam {
  queryParameters?: GetAlertsByAnomalyAlertingConfigurationQueryParamProperties;
}

export interface GetAlertsByAnomalyAlertingConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetAlertsByAnomalyAlertingConfigurationParameters = GetAlertsByAnomalyAlertingConfigurationQueryParam &
  GetAlertsByAnomalyAlertingConfigurationMediaTypesParam &
  GetAlertsByAnomalyAlertingConfigurationBodyParam &
  RequestParameters;

export interface GetAnomaliesFromAlertByAnomalyAlertingConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetAnomaliesFromAlertByAnomalyAlertingConfigurationQueryParam {
  queryParameters?: GetAnomaliesFromAlertByAnomalyAlertingConfigurationQueryParamProperties;
}

export type GetAnomaliesFromAlertByAnomalyAlertingConfigurationParameters = GetAnomaliesFromAlertByAnomalyAlertingConfigurationQueryParam &
  RequestParameters;

export interface GetIncidentsFromAlertByAnomalyAlertingConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetIncidentsFromAlertByAnomalyAlertingConfigurationQueryParam {
  queryParameters?: GetIncidentsFromAlertByAnomalyAlertingConfigurationQueryParamProperties;
}

export type GetIncidentsFromAlertByAnomalyAlertingConfigurationParameters = GetIncidentsFromAlertByAnomalyAlertingConfigurationQueryParam &
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

export interface GetSeriesByAnomalyDetectionConfigurationBodyParam {
  /** query series detection result request */
  body: DetectionSeriesQuery;
}

export interface GetSeriesByAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetSeriesByAnomalyDetectionConfigurationParameters = GetSeriesByAnomalyDetectionConfigurationMediaTypesParam &
  GetSeriesByAnomalyDetectionConfigurationBodyParam &
  RequestParameters;

export interface GetAnomaliesByAnomalyDetectionConfigurationBodyParam {
  /** query detection anomaly result request */
  body: DetectionAnomalyResultQuery;
}

export interface GetAnomaliesByAnomalyDetectionConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetAnomaliesByAnomalyDetectionConfigurationQueryParam {
  queryParameters?: GetAnomaliesByAnomalyDetectionConfigurationQueryParamProperties;
}

export interface GetAnomaliesByAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetAnomaliesByAnomalyDetectionConfigurationParameters = GetAnomaliesByAnomalyDetectionConfigurationQueryParam &
  GetAnomaliesByAnomalyDetectionConfigurationMediaTypesParam &
  GetAnomaliesByAnomalyDetectionConfigurationBodyParam &
  RequestParameters;

export interface GetDimensionOfAnomaliesByAnomalyDetectionConfigurationBodyParam {
  /** query dimension values request */
  body: AnomalyDimensionQuery;
}

export interface GetDimensionOfAnomaliesByAnomalyDetectionConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetDimensionOfAnomaliesByAnomalyDetectionConfigurationQueryParam {
  queryParameters?: GetDimensionOfAnomaliesByAnomalyDetectionConfigurationQueryParamProperties;
}

export interface GetDimensionOfAnomaliesByAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetDimensionOfAnomaliesByAnomalyDetectionConfigurationParameters = GetDimensionOfAnomaliesByAnomalyDetectionConfigurationQueryParam &
  GetDimensionOfAnomaliesByAnomalyDetectionConfigurationMediaTypesParam &
  GetDimensionOfAnomaliesByAnomalyDetectionConfigurationBodyParam &
  RequestParameters;

export interface GetIncidentsByAnomalyDetectionConfigurationBodyParam {
  /** query detection incident result request */
  body: DetectionIncidentResultQuery;
}

export interface GetIncidentsByAnomalyDetectionConfigurationQueryParamProperties {
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetIncidentsByAnomalyDetectionConfigurationQueryParam {
  queryParameters?: GetIncidentsByAnomalyDetectionConfigurationQueryParamProperties;
}

export interface GetIncidentsByAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetIncidentsByAnomalyDetectionConfigurationParameters = GetIncidentsByAnomalyDetectionConfigurationQueryParam &
  GetIncidentsByAnomalyDetectionConfigurationMediaTypesParam &
  GetIncidentsByAnomalyDetectionConfigurationBodyParam &
  RequestParameters;

export interface GetIncidentsByAnomalyDetectionConfigurationNextPagesQueryParamProperties {
  /** the maximum number of items in one page */
  $maxpagesize?: number;
  /** the token for getting the next page */
  $token?: string;
}

export interface GetIncidentsByAnomalyDetectionConfigurationNextPagesQueryParam {
  queryParameters?: GetIncidentsByAnomalyDetectionConfigurationNextPagesQueryParamProperties;
}

export type GetIncidentsByAnomalyDetectionConfigurationNextPagesParameters = GetIncidentsByAnomalyDetectionConfigurationNextPagesQueryParam &
  RequestParameters;
export type GetRootCauseOfIncidentByAnomalyDetectionConfigurationParameters = RequestParameters;

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
export type GetMetricFeedbackParameters = RequestParameters;

export interface ListMetricFeedbacksBodyParam {
  /** metric feedback filter */
  body: MetricFeedbackFilter;
}

export interface ListMetricFeedbacksQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface ListMetricFeedbacksQueryParam {
  queryParameters?: ListMetricFeedbacksQueryParamProperties;
}

export interface ListMetricFeedbacksMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ListMetricFeedbacksParameters = ListMetricFeedbacksQueryParam &
  ListMetricFeedbacksMediaTypesParam &
  ListMetricFeedbacksBodyParam &
  RequestParameters;

export interface CreateMetricFeedbackBodyParam {
  /** metric feedback */
  body: MetricFeedback;
}

export interface CreateMetricFeedbackMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateMetricFeedbackParameters = CreateMetricFeedbackMediaTypesParam &
  CreateMetricFeedbackBodyParam &
  RequestParameters;

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

export interface GetMetricDataBodyParam {
  /** query time series data condition */
  body: MetricDataQueryOptions;
}

export interface GetMetricDataMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetMetricDataParameters = GetMetricDataMediaTypesParam &
  GetMetricDataBodyParam &
  RequestParameters;

export interface GetMetricSeriesBodyParam {
  /** filter to query series */
  body: MetricSeriesQueryOptions;
}

export interface GetMetricSeriesQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetMetricSeriesQueryParam {
  queryParameters?: GetMetricSeriesQueryParamProperties;
}

export interface GetMetricSeriesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetMetricSeriesParameters = GetMetricSeriesQueryParam &
  GetMetricSeriesMediaTypesParam &
  GetMetricSeriesBodyParam &
  RequestParameters;

export interface GetMetricDimensionBodyParam {
  /** query dimension option */
  body: MetricDimensionQueryOptions;
}

export interface GetMetricDimensionQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetMetricDimensionQueryParam {
  queryParameters?: GetMetricDimensionQueryParamProperties;
}

export interface GetMetricDimensionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetMetricDimensionParameters = GetMetricDimensionQueryParam &
  GetMetricDimensionMediaTypesParam &
  GetMetricDimensionBodyParam &
  RequestParameters;

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

export interface GetEnrichmentStatusByMetricBodyParam {
  /** query options */
  body: EnrichmentStatusQueryOption;
}

export interface GetEnrichmentStatusByMetricQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface GetEnrichmentStatusByMetricQueryParam {
  queryParameters?: GetEnrichmentStatusByMetricQueryParamProperties;
}

export interface GetEnrichmentStatusByMetricMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetEnrichmentStatusByMetricParameters = GetEnrichmentStatusByMetricQueryParam &
  GetEnrichmentStatusByMetricMediaTypesParam &
  GetEnrichmentStatusByMetricBodyParam &
  RequestParameters;
