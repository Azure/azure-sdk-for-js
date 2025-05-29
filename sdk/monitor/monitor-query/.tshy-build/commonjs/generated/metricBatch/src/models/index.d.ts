import * as coreClient from "@azure/core-client";
/** The comma separated list of resource IDs to query metrics for. */
export interface ResourceIdList {
    /** The list of resource IDs to query metrics for. */
    resourceids?: string[];
}
/** The metrics result for a resource. */
export interface MetricResultsResponse {
    /** The collection of metric data responses per resource, per metric. */
    values?: MetricResultsResponseValuesItem[];
}
export interface MetricResultsResponseValuesItem {
    /** The start time, in datetime format, for which the data was retrieved. */
    starttime: string;
    /** The end time, in datetime format, for which the data was retrieved. */
    endtime: string;
    /**
     * The interval (window size) for which the metric data was returned in ISO 8601 duration format with a special case for 'FULL' value that returns single datapoint for entire time span requested (*Examples: PT15M, PT1H, P1D, FULL*).
     * This may be adjusted and different from what was originally requested if AutoAdjustTimegrain=true is specified.
     */
    interval?: string;
    /** The namespace of the metrics been queried */
    namespace?: string;
    /** The region of the resource been queried for metrics. */
    resourceregion?: string;
    /** The resource that has been queried for metrics. */
    resourceid?: string;
    /** The value of the collection. */
    value: Metric[];
}
/** The result data of a query. */
export interface Metric {
    /** The metric Id. */
    id: string;
    /** The resource type of the metric resource. */
    type: string;
    /** The name and the display name of the metric, i.e. it is localizable string. */
    name: LocalizableString;
    /** Detailed description of this metric. */
    displayDescription?: string;
    /** 'Success' or the error details on query failures for this metric. */
    errorCode?: string;
    /** Error message encountered querying this specific metric. */
    errorMessage?: string;
    /** The unit of the metric. */
    unit: MetricUnit;
    /** The time series returned when a data query is performed. */
    timeseries: TimeSeriesElement[];
}
/** The localizable string class. */
export interface LocalizableString {
    /** The invariant value. */
    value: string;
    /** The display name. */
    localizedValue?: string;
}
/** A time series result type. The discriminator value is always TimeSeries in this case. */
export interface TimeSeriesElement {
    /** The metadata values returned if $filter was specified in the call. */
    metadatavalues?: MetadataValue[];
    /** An array of data points representing the metric values.  This is only returned if a result type of data is specified. */
    data?: MetricValue[];
}
/** Represents a metric metadata value. */
export interface MetadataValue {
    /** The name of the metadata. */
    name?: LocalizableString;
    /** The value of the metadata. */
    value?: string;
}
/** Represents a metric value. */
export interface MetricValue {
    /** The timestamp for the metric value in ISO 8601 format. */
    timeStamp: Date;
    /** The average value in the time range. */
    average?: number;
    /** The least value in the time range. */
    minimum?: number;
    /** The greatest value in the time range. */
    maximum?: number;
    /** The sum of all of the values in the time range. */
    total?: number;
    /** The number of samples in the time range. Can be used to determine the number of values that contributed to the average value. */
    count?: number;
}
/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponse {
    /** The error object. */
    error?: ErrorDetail;
}
/** The error detail. */
export interface ErrorDetail {
    /**
     * The error code.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly code?: string;
    /**
     * The error message.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly message?: string;
    /**
     * The error target.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly target?: string;
    /**
     * The error details.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly details?: ErrorDetail[];
    /**
     * The error additional info.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly additionalInfo?: ErrorAdditionalInfo[];
}
/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
    /**
     * The additional info type.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly type?: string;
    /**
     * The additional info.
     * NOTE: This property will not be serialized. It can only be populated by the server.
     */
    readonly info?: Record<string, unknown>;
}
/** Defines headers for MetricsBatch_batch operation. */
export interface MetricsBatchBatchExceptionHeaders {
    /** Error code for specific error that occurred. */
    xMsErrorCode?: string;
}
/** Known values of {@link ApiVersion20240201} that the service accepts. */
export declare enum KnownApiVersion20240201 {
    /** Api Version '2024-02-01' */
    TwoThousandTwentyFour0201 = "2024-02-01"
}
/**
 * Defines values for ApiVersion20240201. \
 * {@link KnownApiVersion20240201} can be used interchangeably with ApiVersion20240201,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2024-02-01**: Api Version '2024-02-01'
 */
export type ApiVersion20240201 = string;
/** Known values of {@link MetricUnit} that the service accepts. */
export declare enum KnownMetricUnit {
    /** Unit of raw quantity. */
    Count = "Count",
    /** Unit of memory in bytes. */
    Bytes = "Bytes",
    /** Unit of time in seconds. */
    Seconds = "Seconds",
    /** Rate unit of raw quantity per second. */
    CountPerSecond = "CountPerSecond",
    /** Rate unit of memory in bytes per second. */
    BytesPerSecond = "BytesPerSecond",
    /** Percentage unit. */
    Percent = "Percent",
    /** Unit of time in 1/1000th of a second. */
    MilliSeconds = "MilliSeconds",
    /** Unit of data transfer or storage. It is the size of the data in bytes multiplied by the time it takes to transfer or store the data in seconds. */
    ByteSeconds = "ByteSeconds",
    /** No specified unit. */
    Unspecified = "Unspecified",
    /** Unit of processing power. */
    Cores = "Cores",
    /** Unit of processing power in 1/1000th of a CPU core. */
    MilliCores = "MilliCores",
    /** Unit of processing power in one billionth of a CPU core. */
    NanoCores = "NanoCores",
    /** Rate unit of binary digits per second. */
    BitsPerSecond = "BitsPerSecond"
}
/**
 * Defines values for MetricUnit. \
 * {@link KnownMetricUnit} can be used interchangeably with MetricUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**: Unit of raw quantity. \
 * **Bytes**: Unit of memory in bytes. \
 * **Seconds**: Unit of time in seconds. \
 * **CountPerSecond**: Rate unit of raw quantity per second. \
 * **BytesPerSecond**: Rate unit of memory in bytes per second. \
 * **Percent**: Percentage unit. \
 * **MilliSeconds**: Unit of time in 1\/1000th of a second. \
 * **ByteSeconds**: Unit of data transfer or storage. It is the size of the data in bytes multiplied by the time it takes to transfer or store the data in seconds. \
 * **Unspecified**: No specified unit. \
 * **Cores**: Unit of processing power. \
 * **MilliCores**: Unit of processing power in 1\/1000th of a CPU core. \
 * **NanoCores**: Unit of processing power in one billionth of a CPU core. \
 * **BitsPerSecond**: Rate unit of binary digits per second.
 */
export type MetricUnit = string;
/** Optional parameters. */
export interface MetricsBatchBatchOptionalParams extends coreClient.OperationOptions {
    /**
     * The start time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'. If you have specified the endtime parameter, then this parameter is required.
     * If only starttime is specified, then endtime defaults to the current time.
     * If no time interval is specified, the default is 1 hour.
     */
    starttime?: string;
    /** The end time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'. */
    endtime?: string;
    /**
     * The interval (i.e. timegrain) of the query in ISO 8601 duration format. Defaults to PT1M. Special case for 'FULL' value that returns single datapoint for entire time span requested.
     * *Examples: PT15M, PT1H, P1D, FULL*
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
    orderby?: string;
    /** The filter is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
    filter?: string;
    /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
    rollupby?: string;
}
/** Contains response data for the batch operation. */
export type MetricsBatchBatchResponse = MetricResultsResponse;
/** Optional parameters. */
export interface AzureMonitorMetricBatchOptionalParams extends coreClient.ServiceClientOptions {
    /** Overrides client endpoint. */
    endpoint?: string;
}
//# sourceMappingURL=index.d.ts.map