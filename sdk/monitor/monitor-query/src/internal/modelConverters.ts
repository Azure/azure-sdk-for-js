// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequest as GeneratedBatchRequest,
  LogQueryRequest,
  LogQueryResponse,
  QueryBatchResponse as GeneratedQueryBatchResponse,
  QueryBody
} from "../generated/logquery/src";

import {
  Metric as GeneratedMetric,
  MetricsListOptionalParams as GeneratedMetricsListOptionalParams,
  MetricsListResponse as GeneratedMetricsListResponse,
  TimeSeriesElement as GeneratedTimeSeriesElement
} from "../generated/metrics/src";

import {
  MetricDefinitionsListOptionalParams as GeneratedMetricDefinitionsListOptionalParams,
  MetricDefinitionsListResponse as GeneratedMetricDefinitionsListResponse
} from "../generated/metricsdefinitions/src";

import { MetricNamespacesListResponse as GeneratedMetricNamespacesListResponse } from "../generated/metricsnamespaces/src";

import { formatPreferHeader } from "./util";

import {
  QueryLogsBatch,
  QueryLogsBatchResponse,
  QueryMetricsOptions,
  QueryMetricsResponse,
  GetMetricDefinitionsOptions,
  GetMetricDefinitionsResponse,
  GetMetricNamespacesResponse,
  BatchQuery
} from "../../src";
import { Metric, TimeSeriesElement } from "../models/publicMetricsModels";

/**
 * @internal
 */
export function convertRequestForQueryBatch(batch: QueryLogsBatch): GeneratedBatchRequest {
  let id = 0;

  const requests: LogQueryRequest[] = batch.queries.map((query: BatchQuery) => {
    const body: QueryBody &
      Partial<
        Pick<BatchQuery, "includeQueryStatistics" | "serverTimeoutInSeconds" | "workspace">
      > = { ...query };
    delete body["workspace"];
    delete body["serverTimeoutInSeconds"];
    delete body["includeQueryStatistics"];

    const logQueryRequest: LogQueryRequest = {
      id: id.toString(),
      workspace: query.workspace,
      headers: formatPreferHeader(query),
      body
    };

    ++id;

    return logQueryRequest;
  });

  return {
    requests
  };
}

/**
 * @internal
 */
export function convertResponseForQueryBatch(
  generatedResponse: GeneratedQueryBatchResponse
): QueryLogsBatchResponse {
  const newResponse: QueryLogsBatchResponse = {
    results: generatedResponse.responses
      ?.sort((a, b) => {
        let left = 0;
        if (a.id != null) {
          left = parseInt(a.id, 10);
        }

        let right = 0;
        if (b.id != null) {
          right = parseInt(b.id, 10);
        }

        return left - right;
      })
      ?.map((response: LogQueryResponse) => ({
        id: response.id,
        status: response.status,
        // hoist fields from the sub-object 'body' to this level
        error: response.body?.error,
        tables: response.body?.tables
      }))
  };

  return newResponse;
}

/**
 * @internal
 */
export function convertRequestForMetrics(
  queryMetricsOptions: QueryMetricsOptions | undefined
): GeneratedMetricsListOptionalParams {
  if (!queryMetricsOptions) {
    return {};
  }

  const { orderBy, metricNames, aggregations, metricNamespace, ...rest } = queryMetricsOptions;

  const obj: GeneratedMetricsListOptionalParams = {
    ...rest
  };

  if (orderBy) {
    obj.orderby = orderBy;
  }
  if (metricNames) {
    obj.metric = metricNames.join(",");
  }
  if (aggregations) {
    obj.aggregation = aggregations.join(",");
  }
  if (metricNamespace) {
    obj.metricnamespace = metricNamespace;
  }
  return obj;
}

/**
 * @internal
 */
export function convertResponseForMetrics(
  generatedResponse: GeneratedMetricsListResponse
): QueryMetricsResponse {
  const metrics: Metric[] = generatedResponse.value.map((metric: GeneratedMetric) => {
    return {
      ...metric,
      timeseries: metric.timeseries.map(
        (ts: GeneratedTimeSeriesElement) =>
          <TimeSeriesElement>{
            data: ts.data,
            metadataValues: ts.metadatavalues
          }
      )
    };
  });

  const { resourceregion, _response: _, value: _ignoredValue, ...rest } = generatedResponse;

  const obj: QueryMetricsResponse = {
    ...rest,
    metrics
  };

  if (resourceregion) {
    obj.resourceRegion = resourceregion;
  }

  return obj;
}

/**
 * @internal
 */
export function convertRequestOptionsForMetricsDefinitions(
  options: GetMetricDefinitionsOptions | undefined
): GeneratedMetricDefinitionsListOptionalParams {
  if (!options) {
    return {};
  }

  const { metricNamespace, ...rest } = options;

  const obj: GeneratedMetricDefinitionsListOptionalParams = {
    ...rest
  };

  if (metricNamespace) {
    obj.metricnamespace = metricNamespace;
  }

  return obj;
}

/**
 * @internal
 */
export function convertResponseForMetricsDefinitions(
  generatedResponse: GeneratedMetricDefinitionsListResponse
): GetMetricDefinitionsResponse {
  return {
    definitions: generatedResponse.value
  };
}

/**
 * @internal
 */
export function convertResponseForMetricNamespaces(
  generatedResponse: GeneratedMetricNamespacesListResponse
): GetMetricNamespacesResponse {
  return {
    namespaces: generatedResponse.value
  };
}
