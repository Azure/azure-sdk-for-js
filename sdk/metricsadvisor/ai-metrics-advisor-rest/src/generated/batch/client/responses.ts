// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  UsageStatsOutput,
  ErrorCodeOutput,
  AlertResultListOutput,
  AnomalyResultListOutput,
  IncidentResultListOutput,
  SeriesResultListOutput,
  AnomalyDimensionListOutput,
  RootCauseListOutput,
  MetricFeedbackOutput,
  MetricFeedbackListOutput,
  MetricDataListOutput,
  MetricSeriesListOutput,
  MetricDimensionListOutput,
  EnrichmentStatusListOutput
} from "./outputModels";

/** Get latest usage stats */
export interface GetActiveSeriesCount200Response extends HttpResponse {
  status: "200";
  body: UsageStatsOutput;
}

/** Get latest usage stats */
export interface GetActiveSeriesCountdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query alerts under anomaly alerting configuration */
export interface GetAlertsByAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AlertResultListOutput;
}

/** Query alerts under anomaly alerting configuration */
export interface GetAlertsByAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query anomalies under a specific alert */
export interface GetAnomaliesFromAlertByAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyResultListOutput;
}

/** Query anomalies under a specific alert */
export interface GetAnomaliesFromAlertByAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query incidents under a specific alert */
export interface GetIncidentsFromAlertByAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: IncidentResultListOutput;
}

/** Query incidents under a specific alert */
export interface GetIncidentsFromAlertByAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query series enriched by anomaly detection */
export interface GetSeriesByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: SeriesResultListOutput;
}

/** Query series enriched by anomaly detection */
export interface GetSeriesByAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query anomalies under anomaly detection configuration */
export interface GetAnomaliesByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyResultListOutput;
}

/** Query anomalies under anomaly detection configuration */
export interface GetAnomaliesByAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query dimension values of anomalies */
export interface GetDimensionOfAnomaliesByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDimensionListOutput;
}

/** Query dimension values of anomalies */
export interface GetDimensionOfAnomaliesByAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query incidents under anomaly detection configuration */
export interface GetIncidentsByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: IncidentResultListOutput;
}

/** Query incidents under anomaly detection configuration */
export interface GetIncidentsByAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query incidents under anomaly detection configuration */
export interface GetIncidentsByAnomalyDetectionConfigurationNextPages200Response
  extends HttpResponse {
  status: "200";
  body: IncidentResultListOutput;
}

/** Query incidents under anomaly detection configuration */
export interface GetIncidentsByAnomalyDetectionConfigurationNextPagesdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query root cause for incident */
export interface GetRootCauseOfIncidentByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: RootCauseListOutput;
}

/** Query root cause for incident */
export interface GetRootCauseOfIncidentByAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a metric feedback by its id */
export interface GetMetricFeedback200Response extends HttpResponse {
  status: "200";
  body: MetricFeedbackOutput;
}

/** Get a metric feedback by its id */
export interface GetMetricFeedbackdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List feedback on the given metric */
export interface ListMetricFeedbacks200Response extends HttpResponse {
  status: "200";
  body: MetricFeedbackListOutput;
}

/** List feedback on the given metric */
export interface ListMetricFeedbacksdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface CreateMetricFeedback201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new metric feedback */
export interface CreateMetricFeedback201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & CreateMetricFeedback201Headers;
}

/** Create a new metric feedback */
export interface CreateMetricFeedbackdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get time series data from metric */
export interface GetMetricData200Response extends HttpResponse {
  status: "200";
  body: MetricDataListOutput;
}

/** Get time series data from metric */
export interface GetMetricDatadefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List series (dimension combinations) from metric */
export interface GetMetricSeries200Response extends HttpResponse {
  status: "200";
  body: MetricSeriesListOutput;
}

/** List series (dimension combinations) from metric */
export interface GetMetricSeriesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List dimension from certain metric */
export interface GetMetricDimension200Response extends HttpResponse {
  status: "200";
  body: MetricDimensionListOutput;
}

/** List dimension from certain metric */
export interface GetMetricDimensiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query anomaly detection status */
export interface GetEnrichmentStatusByMetric200Response extends HttpResponse {
  status: "200";
  body: EnrichmentStatusListOutput;
}

/** Query anomaly detection status */
export interface GetEnrichmentStatusByMetricdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}
