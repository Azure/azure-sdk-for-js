// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Monitoring data point coming from the client, which includes metrics, documents and other metadata info. */
export interface MonitoringDataPoint {
  /** Application Insights SDK version. */
  Version: string;
  /** Version/generation of the data contract (MonitoringDataPoint) between SDK and Live Metrics. */
  InvariantVersion: number;
  /** Service instance name where Application Insights SDK lives. */
  Instance: string;
  /** Service role name. */
  RoleName: string;
  /** Computer name where Application Insights SDK lives. */
  MachineName: string;
  /** Identifies an Application Insights SDK as a trusted agent to report metrics and documents. */
  StreamId: string;
  /** Data point generation timestamp. */
  Timestamp?: Date | string;
  /** Timestamp when the client transmits the metrics and documents to Live Metrics. */
  TransmissionTime?: Date | string;
  /** True if the current application is an Azure Web App. */
  IsWebApp: boolean;
  /** True if performance counters collection is supported. */
  PerformanceCollectionSupported: boolean;
  /** An array of metric data points. */
  Metrics?: Array<MetricPoint>;
  /** An array of documents of a specific type {Request}, {RemoteDependency}, {Exception}, {Event}, or {Trace} */
  Documents?: Array<DocumentIngress>;
  /** An array of top cpu consumption data point. */
  TopCpuProcesses?: Array<ProcessCpuData>;
  /** An array of error while SDK parses and applies the {CollectionConfigurationInfo} provided by Live Metrics. */
  CollectionConfigurationErrors?: Array<CollectionConfigurationError>;
}

/** Metric data point. */
export interface MetricPoint {
  /** Metric name. */
  Name: string;
  /** Metric value. */
  Value: number;
  /** Metric weight. */
  Weight: number;
}

/** Base class of the specific document types. */
export interface DocumentIngressParent {
  /** An array of document streaming ids. Each id identifies a flow of documents customized by UX customers. */
  DocumentStreamIds?: string[];
  /** Collection of custom properties. */
  Properties?: Array<KeyValuePairStringString>;
  DocumentType: DocumentType;
}

/** Key-value pair of string and string. */
export interface KeyValuePairStringString {
  /** Key of the key-value pair. */
  key: string;
  /** Value of the key-value pair. */
  value: string;
}

/** Request document type. */
export interface Request extends DocumentIngressParent {
  /** Telemetry type for Request. */
  DocumentType: "Request";
  /** Name of the request, e.g., 'GET /values/{id}'. */
  Name?: string;
  /** Request URL with all query string parameters. */
  Url?: string;
  /** Result of a request execution. For http requests, it could be some HTTP status code. */
  ResponseCode?: string;
  /** Request duration in ISO 8601 duration format, i.e., P[n]Y[n]M[n]DT[n]H[n]M[n]S or P[n]W. */
  Duration?: string;
}

/** RemoteDependency document type. */
export interface RemoteDependency extends DocumentIngressParent {
  /** Telemetry type for RemoteDependency. */
  DocumentType: "RemoteDependency";
  /** Name of the command initiated with this dependency call, e.g., GET /username. */
  Name?: string;
  /** URL of the dependency call to the target, with all query string parameters. */
  CommandName?: string;
  /** Result code of a dependency call. Examples are SQL error code and HTTP status code. */
  ResultCode?: string;
  /** Request duration in ISO 8601 duration format, i.e., P[n]Y[n]M[n]DT[n]H[n]M[n]S or P[n]W. */
  Duration?: string;
}

/** Exception document type. */
export interface Exception extends DocumentIngressParent {
  /** Telemetry type for Exception. */
  DocumentType: "Exception";
  /** Exception type name. */
  ExceptionType?: string;
  /** Exception message. */
  ExceptionMessage?: string;
}

/** Event document type. */
export interface Event extends DocumentIngressParent {
  /** Telemetry type for Event. */
  DocumentType: "Event";
  /** Event name. */
  Name?: string;
}

/** Trace document type. */
export interface Trace extends DocumentIngressParent {
  /** Telemetry type for Trace. */
  DocumentType: "Trace";
  /** Trace message. */
  Message?: string;
}

/** CPU consumption datapoint. */
export interface ProcessCpuData {
  /** Process name. */
  ProcessName: string;
  /** CPU consumption percentage. */
  CpuPercentage: number;
}

/** Represents an error while SDK parses and applies an instance of CollectionConfigurationInfo. */
export interface CollectionConfigurationError {
  /**
   * Error type.
   *
   * Possible values: "Unknown", "PerformanceCounterParsing", "PerformanceCounterUnexpected", "PerformanceCounterDuplicateIds", "DocumentStreamDuplicateIds", "DocumentStreamFailureToCreate", "DocumentStreamFailureToCreateFilterUnexpected", "MetricDuplicateIds", "MetricTelemetryTypeUnsupported", "MetricFailureToCreate", "MetricFailureToCreateFilterUnexpected", "FilterFailureToCreateUnexpected", "CollectionConfigurationFailureToCreateUnexpected"
   */
  CollectionConfigurationErrorType: CollectionConfigurationErrorType;
  /** Error message. */
  Message: string;
  /** Exception that led to the creation of the configuration error. */
  FullException: string;
  /** Custom properties to add more information to the error. */
  Data: Array<KeyValuePairStringString>;
}

/** Base class of the specific document types. */
export type DocumentIngress =
  | DocumentIngressParent
  | Request
  | RemoteDependency
  | Exception
  | Event
  | Trace;
/** Alias for DocumentType */
export type DocumentType = string;
/** Alias for CollectionConfigurationErrorType */
export type CollectionConfigurationErrorType = string;
