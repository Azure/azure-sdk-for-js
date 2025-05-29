import * as coreClient from "@azure/core-client";
/** Represents collection of metric namespaces. */
export interface MetricNamespaceCollection {
    /** The values for the metric namespaces. */
    value: MetricNamespace[];
}
/** Metric namespace class specifies the metadata for a metric namespace. */
export interface MetricNamespace {
    /** The ID of the metric namespace. */
    id?: string;
    /** The type of the namespace. */
    type?: string;
    /** The escaped name of the namespace. */
    name?: string;
    /** Kind of namespace */
    classification?: NamespaceClassification;
    /** Properties which include the fully qualified namespace name. */
    properties?: MetricNamespaceName;
}
/** The fully qualified metric namespace name. */
export interface MetricNamespaceName {
    /** The metric namespace name. */
    metricNamespaceName?: string;
}
/** Describes the format of Error response. */
export interface ErrorResponse {
    /** Error code */
    code?: string;
    /** Error message indicating why the operation failed. */
    message?: string;
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
/** Known values of {@link NamespaceClassification} that the service accepts. */
export declare enum KnownNamespaceClassification {
    Platform = "Platform",
    Custom = "Custom",
    Qos = "Qos"
}
/**
 * Defines values for NamespaceClassification. \
 * {@link KnownNamespaceClassification} can be used interchangeably with NamespaceClassification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Platform** \
 * **Custom** \
 * **Qos**
 */
export type NamespaceClassification = string;
/** Optional parameters. */
export interface MetricNamespacesListOptionalParams extends coreClient.OperationOptions {
    /** The ISO 8601 conform Date start time from which to query for metric namespaces. */
    startTime?: string;
}
/** Contains response data for the list operation. */
export type MetricNamespacesListResponse = MetricNamespaceCollection;
/** Optional parameters. */
export interface MonitorManagementClientOptionalParams extends coreClient.ServiceClientOptions {
    /** server parameter */
    $host?: string;
    /** Overrides client endpoint. */
    endpoint?: string;
}
//# sourceMappingURL=index.d.ts.map