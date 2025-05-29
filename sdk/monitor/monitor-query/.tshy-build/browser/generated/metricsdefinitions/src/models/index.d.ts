import * as coreClient from "@azure/core-client";
/** Represents collection of metric definitions. */
export interface SubscriptionScopeMetricDefinitionCollection {
    /** The values for the metric definitions. */
    value: SubscriptionScopeMetricDefinition[];
}
/** Metric definition class specifies the metadata for a metric. */
export interface SubscriptionScopeMetricDefinition {
    /** Flag to indicate whether the dimension is required. */
    isDimensionRequired?: boolean;
    /** The resource identifier of the resource that emitted the metric. */
    resourceId?: string;
    /** The namespace the metric belongs to. */
    namespace?: string;
    /** The name and the display name of the metric, i.e. it is a localizable string. */
    name?: LocalizableString;
    /** Detailed description of this metric. */
    displayDescription?: string;
    /** Custom category name for this metric. */
    category?: string;
    /** The class of the metric. */
    metricClass?: MetricClass;
    /** The unit of the metric. */
    unit?: MetricUnit;
    /** The primary aggregation type value defining how to use the values for display. */
    primaryAggregationType?: MetricAggregationType;
    /** The collection of what aggregation types are supported. */
    supportedAggregationTypes?: MetricAggregationType[];
    /** The collection of what aggregation intervals are available to be queried. */
    metricAvailabilities?: MetricAvailability[];
    /** The resource identifier of the metric definition. */
    id?: string;
    /** The name and the display name of the dimension, i.e. it is a localizable string. */
    dimensions?: LocalizableString[];
}
/** The localizable string class. */
export interface LocalizableString {
    /** The invariant value. */
    value: string;
    /** The display name. */
    localizedValue?: string;
}
/** Metric availability specifies the time grain (aggregation interval or frequency) and the retention period for that time grain. */
export interface MetricAvailability {
    /** The time grain specifies a supported aggregation interval for the metric. Expressed as a duration 'PT1M', 'P1D', etc. */
    timeGrain?: string;
    /** The retention period for the metric at the specified timegrain.  Expressed as a duration 'PT1M', 'P1D', etc. */
    retention?: string;
}
/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface ErrorContract {
    /** The error object. */
    error?: ErrorResponse;
}
/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface ErrorResponse {
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
    readonly details?: ErrorResponse[];
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
/** Represents collection of metric definitions. */
export interface MetricDefinitionCollection {
    /** The values for the metric definitions. */
    value: MetricDefinition[];
}
/** Metric definition class specifies the metadata for a metric. */
export interface MetricDefinition {
    /** Flag to indicate whether the dimension is required. */
    isDimensionRequired?: boolean;
    /** The resource identifier of the resource that emitted the metric. */
    resourceId?: string;
    /** The namespace the metric belongs to. */
    namespace?: string;
    /** The name and the display name of the metric, i.e. it is a localizable string. */
    name?: LocalizableString;
    /** Detailed description of this metric. */
    displayDescription?: string;
    /** Custom category name for this metric. */
    category?: string;
    /** The class of the metric. */
    metricClass?: MetricClass;
    /** The unit of the metric. */
    unit?: MetricUnit;
    /** The primary aggregation type value defining how to use the values for display. */
    primaryAggregationType?: AggregationType;
    /** The collection of what aggregation types are supported. */
    supportedAggregationTypes?: AggregationType[];
    /** The collection of what aggregation intervals are available to be queried. */
    metricAvailabilities?: MetricAvailability[];
    /** The resource identifier of the metric definition. */
    id?: string;
    /** The name and the display name of the dimension, i.e. it is a localizable string. */
    dimensions?: LocalizableString[];
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
/** Known values of {@link MetricClass} that the service accepts. */
export declare enum KnownMetricClass {
    Availability = "Availability",
    Transactions = "Transactions",
    Errors = "Errors",
    Latency = "Latency",
    Saturation = "Saturation"
}
/**
 * Defines values for MetricClass. \
 * {@link KnownMetricClass} can be used interchangeably with MetricClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Availability** \
 * **Transactions** \
 * **Errors** \
 * **Latency** \
 * **Saturation**
 */
export type MetricClass = string;
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
/** Known values of {@link MetricAggregationType} that the service accepts. */
export declare enum KnownMetricAggregationType {
    None = "None",
    Average = "Average",
    Count = "Count",
    Minimum = "Minimum",
    Maximum = "Maximum",
    Total = "Total"
}
/**
 * Defines values for MetricAggregationType. \
 * {@link KnownMetricAggregationType} can be used interchangeably with MetricAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Average** \
 * **Count** \
 * **Minimum** \
 * **Maximum** \
 * **Total**
 */
export type MetricAggregationType = string;
/** Defines values for AggregationType. */
export type AggregationType = "None" | "Average" | "Count" | "Minimum" | "Maximum" | "Total";
/** Optional parameters. */
export interface MetricDefinitionsListAtSubscriptionScopeOptionalParams extends coreClient.OperationOptions {
    /** Metric namespace where the metrics you want reside. */
    metricnamespace?: string;
}
/** Contains response data for the listAtSubscriptionScope operation. */
export type MetricDefinitionsListAtSubscriptionScopeResponse = SubscriptionScopeMetricDefinitionCollection;
/** Optional parameters. */
export interface MetricDefinitionsListOptionalParams extends coreClient.OperationOptions {
    /** Metric namespace where the metrics you want reside. */
    metricnamespace?: string;
}
/** Contains response data for the list operation. */
export type MetricDefinitionsListResponse = MetricDefinitionCollection;
/** Optional parameters. */
export interface MonitorManagementClientOptionalParams extends coreClient.ServiceClientOptions {
    /** server parameter */
    $host?: string;
    /** Overrides client endpoint. */
    endpoint?: string;
}
//# sourceMappingURL=index.d.ts.map