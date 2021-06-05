// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequest as GeneratedBatchRequest,
  LogQueryRequest,
  LogQueryResponse,
  QueryBatchResponse as GeneratedQueryBatchResponse,
  QueryBody,
  Table as GeneratedTable
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
  BatchQuery,
  GetMetricDefinitionsOptions,
  GetMetricDefinitionsResponse,
  GetMetricNamespacesResponse,
  LogsTable,
  MetricDefinition,
  QueryLogsBatch,
  QueryLogsBatchResponse,
  QueryMetricsOptions,
  QueryMetricsResponse
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
        tables: response.body?.tables?.map(convertGeneratedTable)
      }))
  };

  return newResponse;
}

/**
 * @internal
 */
export function convertRequestForMetrics(
  timespan: string,
  queryMetricsOptions: QueryMetricsOptions | undefined
): GeneratedMetricsListOptionalParams {
  if (!queryMetricsOptions) {
    return {
      timespan
    };
  }

  const { orderBy, metricNames, aggregations, metricNamespace, ...rest } = queryMetricsOptions;

  const obj: GeneratedMetricsListOptionalParams = {
    ...rest,
    timespan
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
      name: metric.name.value,
      timeseries: metric.timeseries.map(
        (ts: GeneratedTimeSeriesElement) =>
          <TimeSeriesElement>{
            data: ts.data,
            metadataValues: ts.metadatavalues?.map((mv) => ({
              ...mv,
              name: mv.name?.value
            }))
          }
      )
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- eslint doesn't recognize that the extracted variables are prefixed with '_' and are purposefully unused.
  const { resourceregion, _response: _response, value: _ignoredValue, ...rest } = generatedResponse;

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
    definitions: generatedResponse.value.map((defn) => {
      const { name, dimensions, ...rest } = defn;
      const newDefn: MetricDefinition = rest;

      if (name) {
        newDefn.name = name.value;
      }

      if (dimensions) {
        newDefn.dimensions = dimensions.map((dimension) => dimension.value);
      }

      return newDefn;
    })
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

/**
 * @internal
 */
export function convertGeneratedTable(table: GeneratedTable): LogsTable {
  const dynamicsIndices: number[] = [];
  const datesIndices: number[] = [];

  // most columns convert on deserialization except for `dynamic` columns (basically JSON objects)
  // and 'datetime' (strings that are ISO8601 formatted dates)
  for (let i = 0; i < table.columns.length; ++i) {
    if (table.columns[i].type === "datetime") {
      datesIndices.push(i);
    } else if (table.columns[i].type === "dynamic") {
      dynamicsIndices.push(i);
    }
  }

  return {
    ...table,
    rows: (table.rows as LogsTable["rows"]).map((row) => {
      for (const dynamicIndex of dynamicsIndices) {
        try {
          row[dynamicIndex] = JSON.parse(row[dynamicIndex] as string) as Record<string, unknown>;
        } catch (_err) {
          /* leave as is. */
        }
      }

      for (const dateIndex of datesIndices) {
        row[dateIndex] = new Date(row[dateIndex] as string);
      }

      return row;
    })
  };
}
