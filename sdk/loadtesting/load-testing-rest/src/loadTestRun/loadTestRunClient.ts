// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  LoadTestRunContext,
  LoadTestRunClientOptionalParams,
  createLoadTestRun,
} from "./api/index.js";
import {
  TestRun,
  TestRunFileInfo,
  TestRunAppComponents,
  TestRunServerMetricsConfiguration,
  MetricDefinitionCollection,
  MetricNamespaceCollection,
  TimeSeriesElement,
  TestRunInsights,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  generateTestRunInsights,
  updateLatestTestRunInsights,
  getLatestTestRunInsights,
  stopTestRun,
  listTestRuns,
  listMetrics,
  listMetricNamespaces,
  listMetricDefinitions,
  listMetricDimensionValues,
  getTestRunFile,
  getTestRun,
  getServerMetricsConfig,
  getAppComponents,
  deleteTestRun,
  createOrUpdateServerMetricsConfig,
  createOrUpdateAppComponents,
  createOrUpdateTestRun,
} from "./api/operations.js";
import {
  GenerateTestRunInsightsOptionalParams,
  UpdateLatestTestRunInsightsOptionalParams,
  GetLatestTestRunInsightsOptionalParams,
  StopTestRunOptionalParams,
  ListTestRunsOptionalParams,
  ListMetricsOptionalParams,
  ListMetricNamespacesOptionalParams,
  ListMetricDefinitionsOptionalParams,
  ListMetricDimensionValuesOptionalParams,
  GetTestRunFileOptionalParams,
  GetTestRunOptionalParams,
  GetServerMetricsConfigOptionalParams,
  GetAppComponentsOptionalParams,
  DeleteTestRunOptionalParams,
  CreateOrUpdateServerMetricsConfigOptionalParams,
  CreateOrUpdateAppComponentsOptionalParams,
  CreateOrUpdateTestRunOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { LoadTestRunClientOptionalParams } from "./api/loadTestRunContext.js";

export class LoadTestRunClient {
  private _client: LoadTestRunContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: LoadTestRunClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createLoadTestRun(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Generate insights for the test run. */
  generateTestRunInsights(
    testRunId: string,
    options: GenerateTestRunInsightsOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return generateTestRunInsights(this._client, testRunId, options);
  }

  /** Update the latest insights for the test run. */
  updateLatestTestRunInsights(
    testRunId: string,
    body: TestRunInsights,
    options: UpdateLatestTestRunInsightsOptionalParams = { requestOptions: {} },
  ): Promise<TestRunInsights> {
    return updateLatestTestRunInsights(this._client, testRunId, body, options);
  }

  /** Get the latest insights for the test run. */
  getLatestTestRunInsights(
    testRunId: string,
    options: GetLatestTestRunInsightsOptionalParams = { requestOptions: {} },
  ): Promise<TestRunInsights> {
    return getLatestTestRunInsights(this._client, testRunId, options);
  }

  /** Stop test run by test run Id. */
  stopTestRun(
    testRunId: string,
    options: StopTestRunOptionalParams = { requestOptions: {} },
  ): Promise<TestRun> {
    return stopTestRun(this._client, testRunId, options);
  }

  /** Get all test runs for the given filters. */
  listTestRuns(
    options: ListTestRunsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TestRun> {
    return listTestRuns(this._client, options);
  }

  /** List the metric values for a load test run. */
  listMetrics(
    testRunId: string,
    metricname: string,
    metricNamespace: string,
    timespan: string,
    options: ListMetricsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TimeSeriesElement> {
    return listMetrics(this._client, testRunId, metricname, metricNamespace, timespan, options);
  }

  /** List the metric namespaces for a load test run. */
  listMetricNamespaces(
    testRunId: string,
    options: ListMetricNamespacesOptionalParams = { requestOptions: {} },
  ): Promise<MetricNamespaceCollection> {
    return listMetricNamespaces(this._client, testRunId, options);
  }

  /** List the metric definitions for a load test run. */
  listMetricDefinitions(
    testRunId: string,
    metricNamespace: string,
    options: ListMetricDefinitionsOptionalParams = { requestOptions: {} },
  ): Promise<MetricDefinitionCollection> {
    return listMetricDefinitions(this._client, testRunId, metricNamespace, options);
  }

  /** List the dimension values for the given metric dimension name. */
  listMetricDimensionValues(
    testRunId: string,
    name: string,
    metricname: string,
    metricNamespace: string,
    timespan: string,
    options: ListMetricDimensionValuesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<string> {
    return listMetricDimensionValues(
      this._client,
      testRunId,
      name,
      metricname,
      metricNamespace,
      timespan,
      options,
    );
  }

  /** Get test run file by file name. */
  getTestRunFile(
    testRunId: string,
    fileName: string,
    options: GetTestRunFileOptionalParams = { requestOptions: {} },
  ): Promise<TestRunFileInfo> {
    return getTestRunFile(this._client, testRunId, fileName, options);
  }

  /** Get test run details by test run Id. */
  getTestRun(
    testRunId: string,
    options: GetTestRunOptionalParams = { requestOptions: {} },
  ): Promise<TestRun> {
    return getTestRun(this._client, testRunId, options);
  }

  /** Get associated server metrics configuration for the given test run. */
  getServerMetricsConfig(
    testRunId: string,
    options: GetServerMetricsConfigOptionalParams = { requestOptions: {} },
  ): Promise<TestRunServerMetricsConfiguration> {
    return getServerMetricsConfig(this._client, testRunId, options);
  }

  /**
   * Get associated app component (collection of azure resources) for the given test
   * run.
   */
  getAppComponents(
    testRunId: string,
    options: GetAppComponentsOptionalParams = { requestOptions: {} },
  ): Promise<TestRunAppComponents> {
    return getAppComponents(this._client, testRunId, options);
  }

  /** Delete an existing load test run by providing the testRunId. */
  deleteTestRun(
    testRunId: string,
    options: DeleteTestRunOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTestRun(this._client, testRunId, options);
  }

  /** Configure server metrics for a test run */
  createOrUpdateServerMetricsConfig(
    testRunId: string,
    body: TestRunServerMetricsConfiguration,
    options: CreateOrUpdateServerMetricsConfigOptionalParams = { requestOptions: {} },
  ): Promise<TestRunServerMetricsConfiguration> {
    return createOrUpdateServerMetricsConfig(this._client, testRunId, body, options);
  }

  /** Add an app component to a test run by providing the resource Id, name and type. */
  createOrUpdateAppComponents(
    testRunId: string,
    body: TestRunAppComponents,
    options: CreateOrUpdateAppComponentsOptionalParams = { requestOptions: {} },
  ): Promise<TestRunAppComponents> {
    return createOrUpdateAppComponents(this._client, testRunId, body, options);
  }

  /** Create and start a new test run with the given test run Id. */
  createOrUpdateTestRun(
    testRunId: string,
    body: TestRun,
    options: CreateOrUpdateTestRunOptionalParams = { requestOptions: {} },
  ): Promise<TestRun> {
    return createOrUpdateTestRun(this._client, testRunId, body, options);
  }
}
