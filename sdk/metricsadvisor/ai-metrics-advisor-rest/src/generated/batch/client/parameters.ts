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
  EnrichmentStatusQueryOption
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
