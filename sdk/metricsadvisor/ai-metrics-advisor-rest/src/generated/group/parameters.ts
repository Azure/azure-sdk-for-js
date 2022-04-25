// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AlertingResultQuery,
  DetectionSeriesQuery,
  DetectionAnomalyResultQuery,
  AnomalyDimensionQuery,
  DetectionIncidentResultQuery,
  MetricFeedbackFilter,
  MetricFeedback,
  MetricDataQueryOptions,
  MetricSeriesQueryOptions,
  MetricDimensionQueryOptions,
  EnrichmentStatusQueryOption,
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

export type GetActiveSeriesCountParameters = RequestParameters;

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
export type MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationParameters = RequestParameters;

export interface MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationBodyParam {
  /** anomaly alerting configuration */
  body: AnomalyAlertingConfigurationPatch;
}

export interface MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationParameters = MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationMediaTypesParam &
  MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationParameters = RequestParameters;

export interface MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationBodyParam {
  /** anomaly alerting configuration */
  body: AnomalyAlertingConfiguration;
}

export interface MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationParameters = MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationMediaTypesParam &
  MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationParameters = RequestParameters;

export interface MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationBodyParam {
  /** anomaly detection configuration */
  body: AnomalyDetectionConfigurationPatch;
}

export interface MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationParameters = MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationMediaTypesParam &
  MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationParameters = RequestParameters;

export interface MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationBodyParam {
  /** anomaly detection configuration */
  body: AnomalyDetectionConfiguration;
}

export interface MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationParameters = MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationMediaTypesParam &
  MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationBodyParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParam {
  queryParameters?: MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParamProperties;
}

export type MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationParameters = MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationQueryParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationCreateCredentialBodyParam {
  /** Create data source credential request */
  body: DataSourceCredential;
}

export interface MetricsAdvisorAdministrationCreateCredentialMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationCreateCredentialParameters = MetricsAdvisorAdministrationCreateCredentialMediaTypesParam &
  MetricsAdvisorAdministrationCreateCredentialBodyParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationListCredentialsQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface MetricsAdvisorAdministrationListCredentialsQueryParam {
  queryParameters?: MetricsAdvisorAdministrationListCredentialsQueryParamProperties;
}

export type MetricsAdvisorAdministrationListCredentialsParameters = MetricsAdvisorAdministrationListCredentialsQueryParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationUpdateCredentialBodyParam {
  /** Update data source credential request */
  body: DataSourceCredentialPatch;
}

export interface MetricsAdvisorAdministrationUpdateCredentialMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type MetricsAdvisorAdministrationUpdateCredentialParameters = MetricsAdvisorAdministrationUpdateCredentialMediaTypesParam &
  MetricsAdvisorAdministrationUpdateCredentialBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationDeleteCredentialParameters = RequestParameters;
export type MetricsAdvisorAdministrationGetCredentialParameters = RequestParameters;

export interface MetricsAdvisorAdministrationListDataFeedsQueryParamProperties {
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

export interface MetricsAdvisorAdministrationListDataFeedsQueryParam {
  queryParameters?: MetricsAdvisorAdministrationListDataFeedsQueryParamProperties;
}

export type MetricsAdvisorAdministrationListDataFeedsParameters = MetricsAdvisorAdministrationListDataFeedsQueryParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationCreateDataFeedBodyParam {
  /** parameters to create a data feed */
  body: DataFeedDetail;
}

export interface MetricsAdvisorAdministrationCreateDataFeedMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationCreateDataFeedParameters = MetricsAdvisorAdministrationCreateDataFeedMediaTypesParam &
  MetricsAdvisorAdministrationCreateDataFeedBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationGetDataFeedByIdParameters = RequestParameters;

export interface MetricsAdvisorAdministrationUpdateDataFeedBodyParam {
  /** parameters to update a data feed */
  body: DataFeedDetailPatch;
}

export interface MetricsAdvisorAdministrationUpdateDataFeedMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type MetricsAdvisorAdministrationUpdateDataFeedParameters = MetricsAdvisorAdministrationUpdateDataFeedMediaTypesParam &
  MetricsAdvisorAdministrationUpdateDataFeedBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationDeleteDataFeedParameters = RequestParameters;

export interface MetricsAdvisorAdministrationListHooksQueryParamProperties {
  /** filter hook by its name */
  hookName?: string;
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface MetricsAdvisorAdministrationListHooksQueryParam {
  queryParameters?: MetricsAdvisorAdministrationListHooksQueryParamProperties;
}

export type MetricsAdvisorAdministrationListHooksParameters = MetricsAdvisorAdministrationListHooksQueryParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationCreateHookBodyParam {
  /** Create hook request */
  body: HookInfo;
}

export interface MetricsAdvisorAdministrationCreateHookMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationCreateHookParameters = MetricsAdvisorAdministrationCreateHookMediaTypesParam &
  MetricsAdvisorAdministrationCreateHookBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationGetHookParameters = RequestParameters;

export interface MetricsAdvisorAdministrationUpdateHookBodyParam {
  /** Update hook request */
  body: HookInfoPatch;
}

export interface MetricsAdvisorAdministrationUpdateHookMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type MetricsAdvisorAdministrationUpdateHookParameters = MetricsAdvisorAdministrationUpdateHookMediaTypesParam &
  MetricsAdvisorAdministrationUpdateHookBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationDeleteHookParameters = RequestParameters;

export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatusBodyParam {
  /** The query time range */
  body: IngestionStatusQueryOptions;
}

export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatusQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatusQueryParam {
  queryParameters?: MetricsAdvisorAdministrationGetDataFeedIngestionStatusQueryParamProperties;
}

export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatusMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationGetDataFeedIngestionStatusParameters = MetricsAdvisorAdministrationGetDataFeedIngestionStatusQueryParam &
  MetricsAdvisorAdministrationGetDataFeedIngestionStatusMediaTypesParam &
  MetricsAdvisorAdministrationGetDataFeedIngestionStatusBodyParam &
  RequestParameters;

export interface MetricsAdvisorAdministrationResetDataFeedIngestionStatusBodyParam {
  /** The backfill time range */
  body: IngestionProgressResetOptions;
}

export interface MetricsAdvisorAdministrationResetDataFeedIngestionStatusMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MetricsAdvisorAdministrationResetDataFeedIngestionStatusParameters = MetricsAdvisorAdministrationResetDataFeedIngestionStatusMediaTypesParam &
  MetricsAdvisorAdministrationResetDataFeedIngestionStatusBodyParam &
  RequestParameters;
export type MetricsAdvisorAdministrationGetIngestionProgressParameters = RequestParameters;

export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricQueryParamProperties {
  /** for paging, skipped number */
  $skip?: number;
  /** the maximum number of items in one page */
  $maxpagesize?: number;
}

export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricQueryParam {
  queryParameters?: MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricQueryParamProperties;
}

export type MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricParameters = MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricQueryParam &
  RequestParameters;
