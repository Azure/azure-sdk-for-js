// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  AnomalyAlertingConfigurationOutput,
  ErrorCodeOutput,
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
