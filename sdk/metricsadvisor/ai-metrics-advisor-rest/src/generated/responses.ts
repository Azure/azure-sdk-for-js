// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  UsageStatsOutput,
  ErrorCodeOutput,
  AnomalyAlertingConfigurationOutput,
  AlertResultListOutput,
  AnomalyResultListOutput,
  IncidentResultListOutput,
  AnomalyDetectionConfigurationOutput,
  AnomalyAlertingConfigurationListOutput,
  SeriesResultListOutput,
  AnomalyDimensionListOutput,
  RootCauseListOutput,
  DataSourceCredentialListOutput,
  DataSourceCredentialOutput,
  DataFeedListOutput,
  DataFeedDetailOutput,
  MetricFeedbackOutput,
  MetricFeedbackListOutput,
  HookListOutput,
  HookInfoOutput,
  IngestionStatusListOutput,
  DataFeedIngestionProgressOutput,
  MetricDataListOutput,
  MetricSeriesListOutput,
  MetricDimensionListOutput,
  AnomalyDetectionConfigurationListOutput,
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

/** Query a single anomaly alerting configuration */
export interface GetAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyAlertingConfigurationOutput;
}

/** Query a single anomaly alerting configuration */
export interface GetAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update anomaly alerting configuration */
export interface UpdateAnomalyAlertingConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyAlertingConfigurationOutput;
}

/** Update anomaly alerting configuration */
export interface UpdateAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete anomaly alerting configuration */
export interface DeleteAnomalyAlertingConfiguration204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete anomaly alerting configuration */
export interface DeleteAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface CreateAnomalyAlertingConfiguration201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create anomaly alerting configuration */
export interface CreateAnomalyAlertingConfiguration201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & CreateAnomalyAlertingConfiguration201Headers;
}

/** Create anomaly alerting configuration */
export interface CreateAnomalyAlertingConfigurationdefaultResponse
  extends HttpResponse {
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

/** Query a single anomaly detection configuration */
export interface GetAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDetectionConfigurationOutput;
}

/** Query a single anomaly detection configuration */
export interface GetAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update anomaly detection configuration */
export interface UpdateAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDetectionConfigurationOutput;
}

/** Update anomaly detection configuration */
export interface UpdateAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete anomaly detection configuration */
export interface DeleteAnomalyDetectionConfiguration204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete anomaly detection configuration */
export interface DeleteAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface CreateAnomalyDetectionConfiguration201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create anomaly detection configuration */
export interface CreateAnomalyDetectionConfiguration201Response
  extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & CreateAnomalyDetectionConfiguration201Headers;
}

/** Create anomaly detection configuration */
export interface CreateAnomalyDetectionConfigurationdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all anomaly alerting configurations for specific anomaly detection configuration */
export interface GetAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyAlertingConfigurationListOutput;
}

/** List all anomaly alerting configurations for specific anomaly detection configuration */
export interface GetAnomalyAlertingConfigurationsByAnomalyDetectionConfigurationdefaultResponse
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

export interface CreateCredential201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new data source credential */
export interface CreateCredential201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & CreateCredential201Headers;
}

/** Create a new data source credential */
export interface CreateCredentialdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all credentials */
export interface ListCredentials200Response extends HttpResponse {
  status: "200";
  body: DataSourceCredentialListOutput;
}

/** List all credentials */
export interface ListCredentialsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update a data source credential */
export interface UpdateCredential200Response extends HttpResponse {
  status: "200";
  body: DataSourceCredentialOutput;
}

/** Update a data source credential */
export interface UpdateCredentialdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete a data source credential */
export interface DeleteCredential204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a data source credential */
export interface DeleteCredentialdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a data source credential */
export interface GetCredential200Response extends HttpResponse {
  status: "200";
  body: DataSourceCredentialOutput;
}

/** Get a data source credential */
export interface GetCredentialdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** List all data feeds */
export interface ListDataFeeds200Response extends HttpResponse {
  status: "200";
  body: DataFeedListOutput;
}

/** List all data feeds */
export interface ListDataFeedsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface CreateDataFeed201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new data feed */
export interface CreateDataFeed201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & CreateDataFeed201Headers;
}

/** Create a new data feed */
export interface CreateDataFeeddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a data feed by its id */
export interface GetDataFeedById200Response extends HttpResponse {
  status: "200";
  body: DataFeedDetailOutput;
}

/** Get a data feed by its id */
export interface GetDataFeedByIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update a data feed */
export interface UpdateDataFeed200Response extends HttpResponse {
  status: "200";
  body: DataFeedDetailOutput;
}

/** Update a data feed */
export interface UpdateDataFeeddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete a data feed */
export interface DeleteDataFeed204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a data feed */
export interface DeleteDataFeeddefaultResponse extends HttpResponse {
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

/** List all hooks */
export interface ListHooks200Response extends HttpResponse {
  status: "200";
  body: HookListOutput;
}

/** List all hooks */
export interface ListHooksdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

export interface CreateHook201Headers {
  /** Location of the newly created resource. */
  location?: string;
}

/** Create a new hook */
export interface CreateHook201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & CreateHook201Headers;
}

/** Create a new hook */
export interface CreateHookdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get a hook by its id */
export interface GetHook200Response extends HttpResponse {
  status: "200";
  body: HookInfoOutput;
}

/** Get a hook by its id */
export interface GetHookdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Update a hook */
export interface UpdateHook200Response extends HttpResponse {
  status: "200";
  body: HookInfoOutput;
}

/** Update a hook */
export interface UpdateHookdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Delete a hook */
export interface DeleteHook204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a hook */
export interface DeleteHookdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get data ingestion status by data feed */
export interface GetDataFeedIngestionStatus200Response extends HttpResponse {
  status: "200";
  body: IngestionStatusListOutput;
}

/** Get data ingestion status by data feed */
export interface GetDataFeedIngestionStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Reset data ingestion status by data feed to backfill data */
export interface ResetDataFeedIngestionStatus204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Reset data ingestion status by data feed to backfill data */
export interface ResetDataFeedIngestionStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorCodeOutput;
}

/** Get data last success ingestion job timestamp by data feed */
export interface GetIngestionProgress200Response extends HttpResponse {
  status: "200";
  body: DataFeedIngestionProgressOutput;
}

/** Get data last success ingestion job timestamp by data feed */
export interface GetIngestionProgressdefaultResponse extends HttpResponse {
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

/** List all anomaly detection configurations for specific metric */
export interface GetAnomalyDetectionConfigurationsByMetric200Response
  extends HttpResponse {
  status: "200";
  body: AnomalyDetectionConfigurationListOutput;
}

/** List all anomaly detection configurations for specific metric */
export interface GetAnomalyDetectionConfigurationsByMetricdefaultResponse
  extends HttpResponse {
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
