import type { CosmosDiagnostics, CosmosHeaders } from "../index.js";
export interface ErrorBody {
    code: string;
    message: string;
    /**
     * @hidden
     */
    additionalErrorInfo?: PartitionedQueryExecutionInfo;
}
/**
 * @hidden
 */
export interface PartitionedQueryExecutionInfo {
    partitionedQueryExecutionInfoVersion: number;
    queryInfo?: QueryInfo;
    /**
     * Represents hybrid query information.
     */
    hybridSearchQueryInfo?: HybridSearchQueryInfo;
    queryRanges: QueryRange[];
}
/**
 * @hidden
 */
export interface QueryRange {
    min: string;
    max: string;
    isMinInclusive: boolean;
    isMaxInclusive: boolean;
}
/**
 * @hidden
 */
export interface QueryInfo {
    top?: any;
    orderBy?: any[];
    orderByExpressions?: any[];
    offset?: number;
    limit?: number;
    aggregates?: AggregateType[];
    groupByExpressions?: GroupByExpressions;
    groupByAliasToAggregateType: GroupByAliasToAggregateType;
    rewrittenQuery?: any;
    distinctType: string;
    hasSelectValue: boolean;
    /**
     * determines whether the query is of non streaming orderby type.
     */
    hasNonStreamingOrderBy: boolean;
}
/**
 * @hidden
 * Represents the hybrid search query information
 */
export interface HybridSearchQueryInfo {
    /**
     * The query to be used for fetching global statistics
     */
    globalStatisticsQuery: string;
    /**
     * Query information for the subsequent queries
     */
    componentQueryInfos: QueryInfo[];
    /**
     * The number of results in the final result set
     */
    take: number;
    /**
     * The number of results to skip in the final result set
     */
    skip: number;
    /**
     * Whether the query requires global statistics
     */
    requiresGlobalStatistics: boolean;
    /**
     * Represents the weights for each component in a hybrid search query.
     */
    componentWeights?: number[];
}
export type GroupByExpressions = string[];
export type AggregateType = "Average" | "Count" | "Max" | "Min" | "Sum" | "MakeSet" | "MakeList";
export interface GroupByAliasToAggregateType {
    [key: string]: AggregateType;
}
/**
 * Represents an error response returned in operations.
 */
export declare class ErrorResponse extends Error {
    /** status or error code returned */
    code?: number | string;
    /** substatus code returned */
    substatus?: number;
    /** body of the error response, typically including error details */
    body?: ErrorBody;
    /** HTTP headers */
    headers?: CosmosHeaders;
    /** unique identifier for the operation's activity */
    activityId?: string;
    /** delay (in milliseconds) before retrying the operation. */
    retryAfterInMs?: number;
    /** delay (in milliseconds) before retrying the operation. */
    /** Note: Use retryAfterInMs instead */
    retryAfterInMilliseconds?: number;
    /** any additional property */
    [key: string]: any;
    /** Detailed diagnostic information associated with the error.*/
    diagnostics?: CosmosDiagnostics;
    /** The request charge of the operation, representing the resource cost incurred.*/
    requestCharge?: number;
}
//# sourceMappingURL=ErrorResponse.d.ts.map