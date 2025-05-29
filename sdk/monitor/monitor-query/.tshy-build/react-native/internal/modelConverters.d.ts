import type { BatchQueryResponse as GeneratedBatchQueryResponse, BatchQueryResults as GeneratedBatchQueryResults, BatchRequest as GeneratedBatchRequest, ErrorInfo as GeneratedErrorInfo, QueryBatchResponse as GeneratedQueryBatchResponse, Table as GeneratedTable } from "../generated/logquery/src/index.js";
import type { MetricsListOptionalParams as GeneratedMetricsListOptionalParams, MetricsListResponse as GeneratedMetricsListResponse } from "../generated/metrics/src/index.js";
import type { MetricDefinition as GeneratedMetricDefinition, MetricDefinitionsListOptionalParams as GeneratedMetricDefinitionsListOptionalParams } from "../generated/metricsdefinitions/src/index.js";
import type { MetricNamespace as GeneratedMetricNamespace } from "../generated/metricsnamespaces/src/index.js";
import type { ListMetricDefinitionsOptions, MetricDefinition, MetricNamespace, MetricsQueryOptions, MetricsQueryResult } from "../models/publicMetricsModels.js";
import type { FullOperationResponse } from "@azure/core-client";
import type { LogsErrorInfo, LogsQueryBatchResult, LogsQueryError, LogsQueryPartialResult, LogsQuerySuccessfulResult, LogsTable, QueryBatch } from "../models/publicLogsModels.js";
import type { MetricsBatchBatchResponse as GeneratedMetricsBatchResponse, MetricsBatchBatchOptionalParams as GeneratedMetricsBatchOptionalParams } from "../generated/metricBatch/src/index.js";
import type { MetricsQueryResourcesOptions } from "../models/publicBatchModels.js";
/**
 * @internal
 */
export declare function convertRequestForQueryBatch(batch: QueryBatch[]): GeneratedBatchRequest;
/**
 * @internal
 */
export declare function convertResponseForQueryBatch(generatedResponse: GeneratedQueryBatchResponse, rawResponse: FullOperationResponse): LogsQueryBatchResult;
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
export declare function fixInvalidBatchQueryResponse(generatedResponse: GeneratedQueryBatchResponse, rawResponse: FullOperationResponse): boolean;
/**
 * @internal
 */
export declare function convertRequestForMetricsBatchQuery(metricsQueryResourcesOptions: MetricsQueryResourcesOptions | undefined): GeneratedMetricsBatchOptionalParams;
/**
 * @internal
 */
export declare function convertRequestForMetrics(metricNames: string[], queryMetricsOptions: MetricsQueryOptions | undefined): GeneratedMetricsListOptionalParams;
/**
 * @internal
 */
export declare function convertResponseForMetrics(generatedResponse: GeneratedMetricsListResponse): MetricsQueryResult;
/**
 * @internal
 */
export declare function convertRequestOptionsForMetricsDefinitions(options: ListMetricDefinitionsOptions | undefined): GeneratedMetricDefinitionsListOptionalParams;
export declare function convertResponseForMetricBatch(generatedResponse: GeneratedMetricsBatchResponse): MetricsQueryResult[];
/**
 * @internal
 */
export declare function convertResponseForMetricsDefinitions(generatedResponse: Array<GeneratedMetricDefinition>): Array<MetricDefinition>;
/**
 * @internal
 */
export declare function convertResponseForMetricNamespaces(generatedResponse: Array<GeneratedMetricNamespace>): Array<MetricNamespace>;
/**
 * @internal
 */
export declare function convertGeneratedTable(table: GeneratedTable): LogsTable;
/**
 * @internal
 */
export declare function convertBatchQueryResponseHelper(response: GeneratedBatchQueryResponse): LogsQueryPartialResult | LogsQuerySuccessfulResult | LogsQueryError;
export declare function computeResultType(generatedResponse: GeneratedBatchQueryResults): LogsQueryPartialResult | LogsQuerySuccessfulResult | LogsQueryError;
export declare function mapError(error: GeneratedErrorInfo): LogsErrorInfo;
//# sourceMappingURL=modelConverters.d.ts.map