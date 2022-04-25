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
  EnrichmentStatusListOutput,
  AnomalyAlertingConfigurationOutput,
  AnomalyDetectionConfigurationOutput,
  AnomalyAlertingConfigurationListOutput,
  DataSourceCredentialListOutput,
  DataSourceCredentialOutput,
  DataFeedListOutput,
  DataFeedDetailOutput,
  HookListOutput,
  HookInfoOutput,
  IngestionStatusListOutput,
  DataFeedIngestionProgressOutput,
  AnomalyDetectionConfigurationListOutput
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

/** Query a single anomaly alerting configuration */
export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyAlertingConfigurationOutput;
}

/** Query a single anomaly alerting configuration */
export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update anomaly alerting configuration */
export interface MetricsAdvisorAdministrationUpdateAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyAlertingConfigurationOutput;
}

/** Update anomaly alerting configuration */
export interface MetricsAdvisorAdministrationUpdateAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete anomaly alerting configuration */
export interface MetricsAdvisorAdministrationDeleteAnomalyAlertingConfiguration204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete anomaly alerting configuration */
export interface MetricsAdvisorAdministrationDeleteAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create anomaly alerting configuration */
export interface MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders &
    MetricsAdvisorAdministrationCreateAnomalyAlertingConfiguration201Headers;
}

/** Create anomaly alerting configuration */
export interface MetricsAdvisorAdministrationCreateAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Query a single anomaly detection configuration */
export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDetectionConfigurationOutput;
}

/** Query a single anomaly detection configuration */
export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update anomaly detection configuration */
export interface MetricsAdvisorAdministrationUpdateAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDetectionConfigurationOutput;
}

/** Update anomaly detection configuration */
export interface MetricsAdvisorAdministrationUpdateAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete anomaly detection configuration */
export interface MetricsAdvisorAdministrationDeleteAnomalyDetectionConfiguration204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete anomaly detection configuration */
export interface MetricsAdvisorAdministrationDeleteAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create anomaly detection configuration */
export interface MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders &
    MetricsAdvisorAdministrationCreateAnomalyDetectionConfiguration201Headers;
}

/** Create anomaly detection configuration */
export interface MetricsAdvisorAdministrationCreateAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all anomaly alerting configurations for specific anomaly detection configuration */
export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyAlertingConfigurationListOutput;
}

/** List all anomaly alerting configurations for specific anomaly detection configuration */
export interface MetricsAdvisorAdministrationGetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface MetricsAdvisorAdministrationCreateCredential201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new data source credential */
export interface MetricsAdvisorAdministrationCreateCredential201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders &
    MetricsAdvisorAdministrationCreateCredential201Headers;
}

/** Create a new data source credential */
export interface MetricsAdvisorAdministrationCreateCredentialdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all credentials */
export interface MetricsAdvisorAdministrationListCredentials200Response
  extends HttpResponse {
  status: "200";
  body: DataSourceCredentialListOutput;
}

/** List all credentials */
export interface MetricsAdvisorAdministrationListCredentialsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update a data source credential */
export interface MetricsAdvisorAdministrationUpdateCredential200Response
  extends HttpResponse {
  status: "200";
  body: DataSourceCredentialOutput;
}

/** Update a data source credential */
export interface MetricsAdvisorAdministrationUpdateCredentialdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete a data source credential */
export interface MetricsAdvisorAdministrationDeleteCredential204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a data source credential */
export interface MetricsAdvisorAdministrationDeleteCredentialdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a data source credential */
export interface MetricsAdvisorAdministrationGetCredential200Response
  extends HttpResponse {
  status: "200";
  body: DataSourceCredentialOutput;
}

/** Get a data source credential */
export interface MetricsAdvisorAdministrationGetCredentialdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all data feeds */
export interface MetricsAdvisorAdministrationListDataFeeds200Response
  extends HttpResponse {
  status: "200";
  body: DataFeedListOutput;
}

/** List all data feeds */
export interface MetricsAdvisorAdministrationListDataFeedsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface MetricsAdvisorAdministrationCreateDataFeed201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new data feed */
export interface MetricsAdvisorAdministrationCreateDataFeed201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders &
    MetricsAdvisorAdministrationCreateDataFeed201Headers;
}

/** Create a new data feed */
export interface MetricsAdvisorAdministrationCreateDataFeeddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a data feed by its id */
export interface MetricsAdvisorAdministrationGetDataFeedById200Response
  extends HttpResponse {
  status: "200";
  body: DataFeedDetailOutput;
}

/** Get a data feed by its id */
export interface MetricsAdvisorAdministrationGetDataFeedByIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update a data feed */
export interface MetricsAdvisorAdministrationUpdateDataFeed200Response
  extends HttpResponse {
  status: "200";
  body: DataFeedDetailOutput;
}

/** Update a data feed */
export interface MetricsAdvisorAdministrationUpdateDataFeeddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete a data feed */
export interface MetricsAdvisorAdministrationDeleteDataFeed204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a data feed */
export interface MetricsAdvisorAdministrationDeleteDataFeeddefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all hooks */
export interface MetricsAdvisorAdministrationListHooks200Response
  extends HttpResponse {
  status: "200";
  body: HookListOutput;
}

/** List all hooks */
export interface MetricsAdvisorAdministrationListHooksdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface MetricsAdvisorAdministrationCreateHook201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new hook */
export interface MetricsAdvisorAdministrationCreateHook201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & MetricsAdvisorAdministrationCreateHook201Headers;
}

/** Create a new hook */
export interface MetricsAdvisorAdministrationCreateHookdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a hook by its id */
export interface MetricsAdvisorAdministrationGetHook200Response
  extends HttpResponse {
  status: "200";
  body: HookInfoOutput;
}

/** Get a hook by its id */
export interface MetricsAdvisorAdministrationGetHookdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update a hook */
export interface MetricsAdvisorAdministrationUpdateHook200Response
  extends HttpResponse {
  status: "200";
  body: HookInfoOutput;
}

/** Update a hook */
export interface MetricsAdvisorAdministrationUpdateHookdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete a hook */
export interface MetricsAdvisorAdministrationDeleteHook204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a hook */
export interface MetricsAdvisorAdministrationDeleteHookdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get data ingestion status by data feed */
export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatus200Response
  extends HttpResponse {
  status: "200";
  body: IngestionStatusListOutput;
}

/** Get data ingestion status by data feed */
export interface MetricsAdvisorAdministrationGetDataFeedIngestionStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Reset data ingestion status by data feed to backfill data */
export interface MetricsAdvisorAdministrationResetDataFeedIngestionStatus204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reset data ingestion status by data feed to backfill data */
export interface MetricsAdvisorAdministrationResetDataFeedIngestionStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get data last success ingestion job timestamp by data feed */
export interface MetricsAdvisorAdministrationGetIngestionProgress200Response
  extends HttpResponse {
  status: "200";
  body: DataFeedIngestionProgressOutput;
}

/** Get data last success ingestion job timestamp by data feed */
export interface MetricsAdvisorAdministrationGetIngestionProgressdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all anomaly detection configurations for specific metric */
export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetric200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDetectionConfigurationListOutput;
}

/** List all anomaly detection configurations for specific metric */
export interface MetricsAdvisorAdministrationGetAnomalyDetectionConfigurationsByMetricdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}
