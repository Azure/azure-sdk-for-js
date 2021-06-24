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
  GetMetricDefinitionsResult,
  GetMetricNamespacesResult,
  LogsTable,
  MetricDefinition,
  QueryLogsBatch,
  QueryLogsBatchResult,
  QueryMetricsOptions,
  QueryMetricsResult
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
): QueryLogsBatchResult {
  const fixApplied = fixInvalidBatchQueryResponse(generatedResponse);

  const newResponse: QueryLogsBatchResult = {
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

  (newResponse as any)["__fixApplied"] = fixApplied;
  return newResponse;
}

/**
 * This is a workaround for a service bug that we're investigating. The 'body' column will occasionally come
 * back as a JSON string, instead of being a JSON object.
 *
 * (examples, with excess stuff trimmed)
 * Correct: `{"responses":[{"body":{"tables":[{"name":"PrimaryResult","columns":[{"name":"stringcolumn","type":"string"}],"rows":[["hello"]}`
 * Broken: `{"responses":[{"body":"{\"tables\":[{\"name\":\"PrimaryResult\",\"columns\":[{\"name\":\"stringcolumn\",\"type\":\"string\"}],\"rows\":[[\"hello\"]}`
 *
 * Issue here: https://github.com/Azure/azure-sdk-for-js/issues/15688
 *
 * @internal
 */
export function fixInvalidBatchQueryResponse(
  generatedResponse: GeneratedQueryBatchResponse
): boolean {
  if (generatedResponse.responses == null) {
    return false;
  }

  let wholeResponse: GeneratedQueryBatchResponse | undefined;
  let hadToFix = false;

  // fix whichever responses are in this broken state (each query has it's own
  // response, so they're not all always broken)
  for (let i = 0; i < generatedResponse.responses.length; ++i) {
    if (
      generatedResponse.responses[i].body?.tables != null ||
      generatedResponse.responses[i].body?.error != null
    ) {
      continue;
    }

    // the body here is incorrect, deserialize the correct one from the raw response itself.

    // deserialize the raw response from the service, since we'll need index into it.
    if (!wholeResponse) {
      wholeResponse = JSON.parse(
        generatedResponse["_response"].bodyAsText
      ) as GeneratedQueryBatchResponse;
    }

    // now grab the individual batch query response and deserialize that
    // incorrectly typed string...
    generatedResponse.responses[i].body = JSON.parse(
      (wholeResponse.responses![i].body as any) as string
    );

    hadToFix = true;
  }

  return hadToFix;
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
): QueryMetricsResult {
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

  const obj: QueryMetricsResult = {
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
): GetMetricDefinitionsResult {
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
): GetMetricNamespacesResult {
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
