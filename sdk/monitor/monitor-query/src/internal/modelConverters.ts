// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequest as GeneratedBatchRequest,
  BatchQueryRequest as GeneratedBatchQueryRequest,
  BatchQueryResponse as GeneratedBatchQueryResponse,
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
  MetricDefinition as GeneratedMetricDefinition
} from "../generated/metricsdefinitions/src";

import { MetricNamespace as GeneratedMetricNamespace } from "../generated/metricsnamespaces/src";
import { formatPreferHeader } from "./util";

import {
  QueryBatch,
  ListMetricDefinitionsOptions,
  LogsTable,
  LogsQueryBatchResult,
  MetricsQueryOptions,
  MetricsQueryResult
} from "../../src";
import {
  MetricNamespace,
  Metric,
  MetricDefinition,
  TimeSeriesElement
} from "../models/publicMetricsModels";
import { FullOperationResponse } from "../../../../core/core-client/types/latest/core-client";
import { convertTimespanToInterval } from "../timespanConversion";

/**
 * @internal
 */
export function convertRequestForQueryBatch(batch: QueryBatch[]): GeneratedBatchRequest {
  let id = 0;

  const requests: GeneratedBatchQueryRequest[] = batch.map((query: QueryBatch) => {
    const body: Exclude<QueryBody, "timespan"> &
      Partial<
        Pick<
          QueryBatch,
          | "query"
          | "workspaceId"
          | "includeQueryStatistics"
          | "additionalWorkspaces"
          | "includeVisualization"
          | "serverTimeoutInSeconds"
        >
      > = {
      workspaceId: query.workspaceId,
      query: query.query
    };
    if (query["additionalWorkspaces"]) {
      body["workspaces"] = query["additionalWorkspaces"].map((x) => x);
    }
    if (query["timespan"]) {
      body["timespan"] = convertTimespanToInterval(query["timespan"]);
    }
    delete body["workspaceId"];
    delete body["includeQueryStatistics"];
    delete body["includeVisualization"];
    delete body["additionalWorkspaces"];
    delete body["serverTimeoutInSeconds"];

    const generatedRequest: GeneratedBatchQueryRequest = {
      id: id.toString(),
      workspace: query.workspaceId,
      headers: formatPreferHeader(query),
      body
    };

    ++id;

    return generatedRequest;
  });

  return {
    requests
  };
}

/**
 * @internal
 */
export function convertResponseForQueryBatch(
  generatedResponse: GeneratedQueryBatchResponse,
  rawResponse: FullOperationResponse
): LogsQueryBatchResult {
  const fixApplied = fixInvalidBatchQueryResponse(generatedResponse, rawResponse);

  /* Sort the ids that are passed in with the queries, as numbers instead of strings
   * It is not guaranteed that service will return the responses for queries in the same order
   * as the queries are passed in
   */
  const newResponse: LogsQueryBatchResult = {
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
      ?.map((response: GeneratedBatchQueryResponse) => ({
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
  generatedResponse: GeneratedQueryBatchResponse,
  rawResponse: FullOperationResponse
): boolean {
  if (generatedResponse.responses == null) {
    return false;
  }

  let hadToFix = false;

  // the body here is incorrect, deserialize the correct one from the raw response itself.
  const parsedBody = JSON.parse(rawResponse.bodyAsText!);
  // fix whichever responses are in this broken state (each query has it's own
  // response, so they're not all always broken)
  for (let i = 0; i < generatedResponse.responses.length; ++i) {
    if (generatedResponse.responses[i].body?.error != null) {
      continue;
    }

    // deserialize the raw response from the service, since we'll need index into it.

    generatedResponse.responses[i].body = parsedBody.responses[i].body;

    hadToFix = true;
  }

  return hadToFix;
}

/**
 * @internal
 */
export function convertRequestForMetrics(
  metricNames: string[],
  queryMetricsOptions: MetricsQueryOptions | undefined
): GeneratedMetricsListOptionalParams {
  if (!queryMetricsOptions) {
    return {};
  }

  const {
    orderBy,
    aggregations,
    metricNamespace,
    timespan,
    granularity,
    ...rest
  } = queryMetricsOptions;

  const obj: GeneratedMetricsListOptionalParams = {
    ...rest
  };

  if (timespan) {
    obj.timespan = convertTimespanToInterval(timespan);
  }

  if (orderBy) {
    obj.orderby = orderBy;
  }
  if (metricNames) {
    obj.metricnames = metricNames.join(",");
  }
  if (aggregations) {
    obj.aggregation = aggregations.join(",");
  }
  if (metricNamespace) {
    obj.metricnamespace = metricNamespace;
  }
  if (granularity) {
    obj.interval = granularity;
  }
  return obj;
}

/**
 * @internal
 */
export function convertResponseForMetrics(
  generatedResponse: GeneratedMetricsListResponse
): MetricsQueryResult {
  const metrics: Metric[] = generatedResponse.value.map((metric: GeneratedMetric) => {
    const metricObject = {
      ...metric,
      name: metric.name.value,
      description: metric.displayDescription,
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
    delete metricObject.displayDescription;
    return metricObject;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- eslint doesn't recognize that the extracted variables are prefixed with '_' and are purposefully unused.
  const { resourceregion, value: _ignoredValue, interval, ...rest } = generatedResponse;

  const obj: MetricsQueryResult = {
    ...rest,
    metrics
  };

  if (resourceregion) {
    obj.resourceRegion = resourceregion;
  }
  if (interval) {
    obj.granularity = interval;
  }

  return obj;
}

/**
 * @internal
 */
export function convertRequestOptionsForMetricsDefinitions(
  options: ListMetricDefinitionsOptions | undefined
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
  generatedResponse: Array<GeneratedMetricDefinition>
): Array<MetricDefinition> {
  const definitions: Array<MetricDefinition> = generatedResponse?.map((genDef) => {
    const { name, dimensions, displayDescription, ...rest } = genDef;

    const response: MetricDefinition = {
      ...rest
    };

    if (displayDescription) {
      response.description = displayDescription;
    }
    if (name?.value) {
      response.name = name.value;
    }

    const mappedDimensions = dimensions?.map((dim) => dim.value);

    if (mappedDimensions) {
      response.dimensions = mappedDimensions;
    }
    return response;
  });
  return definitions;
}

/**
 * @internal
 */
export function convertResponseForMetricNamespaces(
  generatedResponse: Array<GeneratedMetricNamespace>
): Array<MetricNamespace> {
  const namespaces: Array<MetricNamespace> = generatedResponse?.map((genDef) => {
    const { properties, ...rest } = genDef;

    const response: MetricNamespace = {
      ...rest
    };

    if (properties) {
      response.metricNamespaceName = properties.metricNamespaceName;
    }

    return response;
  });
  return namespaces;
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
