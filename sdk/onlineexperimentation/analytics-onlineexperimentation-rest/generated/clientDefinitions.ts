// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetMetricParameters,
  CreateOrUpdateMetricParameters,
  DeleteMetricParameters,
  ValidateMetricParameters,
  ListMetricsParameters,
} from "./parameters.js";
import type {
  GetMetric200Response,
  GetMetricDefaultResponse,
  CreateOrUpdateMetric200Response,
  CreateOrUpdateMetric201Response,
  CreateOrUpdateMetricDefaultResponse,
  DeleteMetric204Response,
  DeleteMetricDefaultResponse,
  ValidateMetric200Response,
  ValidateMetricDefaultResponse,
  ListMetrics200Response,
  ListMetricsDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetMetric {
  /** Fetches an experiment metric by ID. */
  get(
    options?: GetMetricParameters,
  ): StreamableMethod<GetMetric200Response | GetMetricDefaultResponse>;
  /** Creates or updates an experiment metric. */
  patch(
    options: CreateOrUpdateMetricParameters,
  ): StreamableMethod<
    | CreateOrUpdateMetric200Response
    | CreateOrUpdateMetric201Response
    | CreateOrUpdateMetricDefaultResponse
  >;
  /** Deletes an experiment metric. */
  delete(
    options?: DeleteMetricParameters,
  ): StreamableMethod<DeleteMetric204Response | DeleteMetricDefaultResponse>;
}

export interface ValidateMetric {
  /** Validates an experiment metric definition. */
  post(
    options: ValidateMetricParameters,
  ): StreamableMethod<
    ValidateMetric200Response | ValidateMetricDefaultResponse
  >;
}

export interface ListMetrics {
  /** Lists experiment metrics. */
  get(
    options?: ListMetricsParameters,
  ): StreamableMethod<ListMetrics200Response | ListMetricsDefaultResponse>;
}

export interface Routes {
  /** Resource for '/experiment-metrics/\{experimentMetricId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/experiment-metrics/{experimentMetricId}",
    experimentMetricId: string,
  ): GetMetric;
  /** Resource for '/experiment-metrics:validate' has methods for the following verbs: post */
  (path: "/experiment-metrics:validate"): ValidateMetric;
  /** Resource for '/experiment-metrics' has methods for the following verbs: get */
  (path: "/experiment-metrics"): ListMetrics;
}

export type OnlineExperimentationClient = Client & {
  path: Routes;
};
