// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

export interface SparkJobListViewResponse {
  nJobs?: number;
  sparkJobs?: SparkJob[] | null;
}

export interface SparkJob {
  state?: string;
  name?: string;
  submitter?: string;
  compute?: string;
  sparkApplicationId?: string;
  livyId?: string;
  timing?: string[];
  sparkJobDefinition?: string | null;
  pipeline?: SparkJob[] | null;
  jobType?: string;
  submitTime?: Date | null;
  endTime?: Date | null;
  queuedDuration?: string;
  runningDuration?: string;
  totalDuration?: string;
}

export interface SqlQueryStringDataModel {
  query?: string;
}

/** Optional parameters. */
export interface MonitoringGetSparkJobListOptionalParams
  extends coreHttp.OperationOptions {
  /** Can provide a guid, which is helpful for debugging and to provide better customer support */
  xMsClientRequestId?: string;
}

/** Contains response data for the getSparkJobList operation. */
export type MonitoringGetSparkJobListResponse = SparkJobListViewResponse & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SparkJobListViewResponse;
  };
};

/** Optional parameters. */
export interface MonitoringGetSqlJobQueryStringOptionalParams
  extends coreHttp.OperationOptions {
  /** Can provide a guid, which is helpful for debugging and to provide better customer support */
  xMsClientRequestId?: string;
  filter?: string;
  orderby?: string;
  skip?: string;
}

/** Contains response data for the getSqlJobQueryString operation. */
export type MonitoringGetSqlJobQueryStringResponse = SqlQueryStringDataModel & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SqlQueryStringDataModel;
  };
};

/** Optional parameters. */
export interface MonitoringClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
