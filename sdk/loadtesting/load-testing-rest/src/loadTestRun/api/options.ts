// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TimeGrain, MetricRequestPayload } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GenerateTestRunInsightsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface UpdateLatestTestRunInsightsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetLatestTestRunInsightsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StopTestRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListTestRunsOptionalParams extends OperationOptions {
  /**
   * Sort on the supported fields in (field asc/desc) format. eg: createdDateTime asc.
   * Supported fields - createdDateTime, executedDateTime (legacy)
   */
  orderby?: string;
  /**
   * Prefix based, case sensitive search on searchable fields - description,
   * executedUser. For example, to search for a test run, with description 500 VUs,
   * the search parameter can be 500.
   */
  search?: string;
  /** Unique name of an existing load test. */
  testId?: string;
  /** Start DateTime(RFC 3339 literal format) of test-run execution time filter range. */
  executionFrom?: Date;
  /** End DateTime(RFC 3339 literal format) of test-run execution time filter range. */
  executionTo?: Date;
  /** Comma separated list of test run status. */
  status?: string;
  /** Number of results in response. */
  maxpagesize?: number;
  /** Comma separated list of type of entities that have created the test run. */
  createdByTypes?: string[];
  /** Comma-separated list of test IDs. If you are using testIds, do not send a value for testId. */
  testIds?: string[];
}

/** Optional parameters. */
export interface ListMetricsOptionalParams extends OperationOptions {
  /** The aggregation */
  aggregation?: string;
  /** The interval (i.e. timegrain) of the query. */
  interval?: TimeGrain;
  /** Metric dimension filter */
  body?: MetricRequestPayload;
}

/** Optional parameters. */
export interface ListMetricNamespacesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListMetricDimensionValuesOptionalParams extends OperationOptions {
  /** The interval (i.e. timegrain) of the query. */
  interval?: TimeGrain;
}

/** Optional parameters. */
export interface GetTestRunFileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetTestRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetServerMetricsConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAppComponentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteTestRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateServerMetricsConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateAppComponentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateTestRunOptionalParams extends OperationOptions {
  /**
   * Existing test run identifier that should be rerun, if this is provided, the
   * test will run with the JMX file, configuration and app components from the
   * existing test run. You can override the configuration values for new test run
   * in the request body.
   */
  oldTestRunId?: string;
}
