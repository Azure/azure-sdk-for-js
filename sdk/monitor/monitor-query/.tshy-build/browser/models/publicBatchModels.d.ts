import type * as coreClient from "@azure/core-client";
/** Optional parameters. */
export interface MetricsQueryResourcesOptions extends coreClient.OperationOptions {
    /**
     * The start time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'. If you have specified the endTime parameter, then this parameter is required.
     * If only startTime is specified, then endTime defaults to the current time.
     * If no time interval is specified, the default is 1 hour.
     */
    startTime?: Date;
    /** The end time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'. */
    endTime?: Date;
    /**
     * The interval (i.e. timegrain) of the query.
     * *Examples: PT15M, PT1H, P1D*
     */
    interval?: string;
    /**
     * The list of aggregation types (comma separated) to retrieve.
     * *Examples: average, minimum, maximum*
     */
    aggregation?: string;
    /**
     * The maximum number of records to retrieve per resource ID in the request.
     * Valid only if filter is specified.
     * Defaults to 10.
     */
    top?: number;
    /**
     * The aggregation to use for sorting results and the direction of the sort.
     * Only one order can be specified.
     * *Examples: sum asc*
     */
    orderBy?: string;
    /** The filter is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
    filter?: string;
    /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
    rollUpBy?: string;
}
//# sourceMappingURL=publicBatchModels.d.ts.map