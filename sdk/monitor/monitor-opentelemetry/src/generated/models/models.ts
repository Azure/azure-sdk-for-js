// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Monitoring data point coming from the client, which includes metrics, documents and other metadata info. */
export interface MonitoringDataPoint {
  /** Application Insights SDK version. */
  version: string;
  /** Version/generation of the data contract (MonitoringDataPoint) between SDK and Live Metrics. */
  invariantVersion: number;
  /** Service instance name where Application Insights SDK lives. */
  instance: string;
  /** Service role name. */
  roleName: string;
  /** Computer name where Application Insights SDK lives. */
  machineName: string;
  /** Identifies an Application Insights SDK as a trusted agent to report metrics and documents. */
  streamId: string;
  /** Data point generation timestamp. */
  timestamp?: Date;
  /** Timestamp when the client transmits the metrics and documents to Live Metrics. */
  transmissionTime?: Date;
  /** True if the current application is an Azure Web App. */
  isWebApp: boolean;
  /** True if performance counters collection is supported. */
  performanceCollectionSupported: boolean;
  /** An array of metric data points. */
  metrics?: MetricPoint[];
  /** An array of documents of a specific type {Request}, {RemoteDependency}, {Exception}, {Event}, or {Trace} */
  documents?: DocumentIngressUnion[];
  /** An array of top cpu consumption data point. */
  topCpuProcesses?: ProcessCpuData[];
  /** An array of error while SDK parses and applies the {CollectionConfigurationInfo} provided by Live Metrics. */
  collectionConfigurationErrors?: CollectionConfigurationError[];
}

export function monitoringDataPointSerializer(item: MonitoringDataPoint): any {
  return {
    Version: item["version"],
    InvariantVersion: item["invariantVersion"],
    Instance: item["instance"],
    RoleName: item["roleName"],
    MachineName: item["machineName"],
    StreamId: item["streamId"],
    Timestamp: !item["timestamp"] ? item["timestamp"] : item["timestamp"].toISOString(),
    TransmissionTime: !item["transmissionTime"]
      ? item["transmissionTime"]
      : item["transmissionTime"].toISOString(),
    IsWebApp: item["isWebApp"],
    PerformanceCollectionSupported: item["performanceCollectionSupported"],
    Metrics: !item["metrics"] ? item["metrics"] : metricPointArraySerializer(item["metrics"]),
    Documents: !item["documents"]
      ? item["documents"]
      : documentIngressUnionArraySerializer(item["documents"]),
    TopCpuProcesses: !item["topCpuProcesses"]
      ? item["topCpuProcesses"]
      : processCpuDataArraySerializer(item["topCpuProcesses"]),
    CollectionConfigurationErrors: !item["collectionConfigurationErrors"]
      ? item["collectionConfigurationErrors"]
      : collectionConfigurationErrorArraySerializer(item["collectionConfigurationErrors"]),
  };
}

export function metricPointArraySerializer(result: Array<MetricPoint>): any[] {
  return result.map((item) => {
    return metricPointSerializer(item);
  });
}

/** Metric data point. */
export interface MetricPoint {
  /** Metric name. */
  name: string;
  /** Metric value. */
  value: number;
  /** Metric weight. */
  weight: number;
}

export function metricPointSerializer(item: MetricPoint): any {
  return { Name: item["name"], Value: item["value"], Weight: item["weight"] };
}

export function documentIngressUnionArraySerializer(result: Array<DocumentIngressUnion>): any[] {
  return result.map((item) => {
    return documentIngressUnionSerializer(item);
  });
}

/** A document of a specific type: Request, RemoteDependency, Exception, Event, or Trace. */
export interface DocumentIngress {
  /** Telemetry type. Types not defined in enum will get replaced with a 'Unknown' type. */
  /** The discriminator possible values: Request, RemoteDependency, Exception, Event, Trace */
  documentType: DocumentType;
  /** An array of document streaming ids. Each id identifies a flow of documents customized by UX customers. */
  documentStreamIds?: string[];
  /** Collection of custom properties. */
  properties?: KeyValuePairStringString[];
}

export function documentIngressSerializer(item: DocumentIngress): any {
  return {
    DocumentType: item["documentType"],
    DocumentStreamIds: !item["documentStreamIds"]
      ? item["documentStreamIds"]
      : item["documentStreamIds"].map((p: any) => {
          return p;
        }),
    Properties: !item["properties"]
      ? item["properties"]
      : keyValuePairStringStringArraySerializer(item["properties"]),
  };
}

/** Alias for DocumentIngressUnion */
export type DocumentIngressUnion =
  | Request
  | RemoteDependency
  | Exception
  | Event
  | Trace
  | DocumentIngress;

export function documentIngressUnionSerializer(item: DocumentIngressUnion): any {
  switch (item.documentType) {
    case "Request":
      return requestSerializer(item as Request);

    case "RemoteDependency":
      return remoteDependencySerializer(item as RemoteDependency);

    case "Exception":
      return exceptionSerializer(item as Exception);

    case "Event":
      return eventSerializer(item as Event);

    case "Trace":
      return traceSerializer(item as Trace);

    default:
      return documentIngressSerializer(item);
  }
}

/** Document type */
export type DocumentType =
  | "Request"
  | "RemoteDependency"
  | "Exception"
  | "Event"
  | "Trace"
  | "Unknown";

export function keyValuePairStringStringArraySerializer(
  result: Array<KeyValuePairStringString>,
): any[] {
  return result.map((item) => {
    return keyValuePairStringStringSerializer(item);
  });
}

/** Key-value pair of string and string. */
export interface KeyValuePairStringString {
  /** Key of the key-value pair. */
  key: string;
  /** Value of the key-value pair. */
  value: string;
}

export function keyValuePairStringStringSerializer(item: KeyValuePairStringString): any {
  return { key: item["key"], value: item["value"] };
}

/** Request document type. */
export interface Request extends DocumentIngress {
  /** Telemetry type for Request. */
  documentType: "Request";
  /** Name of the request, e.g., 'GET /values/{id}'. */
  name?: string;
  /** Request URL with all query string parameters. */
  url?: string;
  /** Result of a request execution. For http requests, it could be some HTTP status code. */
  responseCode?: string;
  /** Request duration in ISO 8601 duration format, i.e., P[n]Y[n]M[n]DT[n]H[n]M[n]S or P[n]W. */
  duration?: string;
}

export function requestSerializer(item: Request): any {
  return {
    DocumentType: item["documentType"],
    DocumentStreamIds: !item["documentStreamIds"]
      ? item["documentStreamIds"]
      : item["documentStreamIds"].map((p: any) => {
          return p;
        }),
    Properties: !item["properties"]
      ? item["properties"]
      : keyValuePairStringStringArraySerializer(item["properties"]),
    Name: item["name"],
    Url: item["url"],
    ResponseCode: item["responseCode"],
    Duration: item["duration"],
  };
}

/** RemoteDependency document type. */
export interface RemoteDependency extends DocumentIngress {
  /** Telemetry type for RemoteDependency. */
  documentType: "RemoteDependency";
  /** Name of the command initiated with this dependency call, e.g., GET /username. */
  name?: string;
  /** URL of the dependency call to the target, with all query string parameters. */
  commandName?: string;
  /** Result code of a dependency call. Examples are SQL error code and HTTP status code. */
  resultCode?: string;
  /** Request duration in ISO 8601 duration format, i.e., P[n]Y[n]M[n]DT[n]H[n]M[n]S or P[n]W. */
  duration?: string;
}

export function remoteDependencySerializer(item: RemoteDependency): any {
  return {
    DocumentType: item["documentType"],
    DocumentStreamIds: !item["documentStreamIds"]
      ? item["documentStreamIds"]
      : item["documentStreamIds"].map((p: any) => {
          return p;
        }),
    Properties: !item["properties"]
      ? item["properties"]
      : keyValuePairStringStringArraySerializer(item["properties"]),
    Name: item["name"],
    CommandName: item["commandName"],
    ResultCode: item["resultCode"],
    Duration: item["duration"],
  };
}

/** Exception document type. */
export interface Exception extends DocumentIngress {
  /** Telemetry type for Exception. */
  documentType: "Exception";
  /** Exception type name. */
  exceptionType?: string;
  /** Exception message. */
  exceptionMessage?: string;
}

export function exceptionSerializer(item: Exception): any {
  return {
    DocumentType: item["documentType"],
    DocumentStreamIds: !item["documentStreamIds"]
      ? item["documentStreamIds"]
      : item["documentStreamIds"].map((p: any) => {
          return p;
        }),
    Properties: !item["properties"]
      ? item["properties"]
      : keyValuePairStringStringArraySerializer(item["properties"]),
    ExceptionType: item["exceptionType"],
    ExceptionMessage: item["exceptionMessage"],
  };
}

/** Event document type. */
export interface Event extends DocumentIngress {
  /** Telemetry type for Event. */
  documentType: "Event";
  /** Event name. */
  name?: string;
}

export function eventSerializer(item: Event): any {
  return {
    DocumentType: item["documentType"],
    DocumentStreamIds: !item["documentStreamIds"]
      ? item["documentStreamIds"]
      : item["documentStreamIds"].map((p: any) => {
          return p;
        }),
    Properties: !item["properties"]
      ? item["properties"]
      : keyValuePairStringStringArraySerializer(item["properties"]),
    Name: item["name"],
  };
}

/** Trace document type. */
export interface Trace extends DocumentIngress {
  /** Telemetry type for Trace. */
  documentType: "Trace";
  /** Trace message. */
  message?: string;
}

export function traceSerializer(item: Trace): any {
  return {
    DocumentType: item["documentType"],
    DocumentStreamIds: !item["documentStreamIds"]
      ? item["documentStreamIds"]
      : item["documentStreamIds"].map((p: any) => {
          return p;
        }),
    Properties: !item["properties"]
      ? item["properties"]
      : keyValuePairStringStringArraySerializer(item["properties"]),
    Message: item["message"],
  };
}

export function processCpuDataArraySerializer(result: Array<ProcessCpuData>): any[] {
  return result.map((item) => {
    return processCpuDataSerializer(item);
  });
}

/** CPU consumption datapoint. */
export interface ProcessCpuData {
  /** Process name. */
  processName: string;
  /** CPU consumption percentage. */
  cpuPercentage: number;
}

export function processCpuDataSerializer(item: ProcessCpuData): any {
  return { ProcessName: item["processName"], CpuPercentage: item["cpuPercentage"] };
}

export function collectionConfigurationErrorArraySerializer(
  result: Array<CollectionConfigurationError>,
): any[] {
  return result.map((item) => {
    return collectionConfigurationErrorSerializer(item);
  });
}

/** Represents an error while SDK parses and applies an instance of CollectionConfigurationInfo. */
export interface CollectionConfigurationError {
  /** Error type. */
  collectionConfigurationErrorType: CollectionConfigurationErrorType;
  /** Error message. */
  message: string;
  /** Exception that led to the creation of the configuration error. */
  fullException: string;
  /** Custom properties to add more information to the error. */
  data: KeyValuePairStringString[];
}

export function collectionConfigurationErrorSerializer(item: CollectionConfigurationError): any {
  return {
    CollectionConfigurationErrorType: item["collectionConfigurationErrorType"],
    Message: item["message"],
    FullException: item["fullException"],
    Data: keyValuePairStringStringArraySerializer(item["data"]),
  };
}

/** Collection configuration error type reported by the client SDK. */
export type CollectionConfigurationErrorType =
  | "Unknown"
  | "PerformanceCounterParsing"
  | "PerformanceCounterUnexpected"
  | "PerformanceCounterDuplicateIds"
  | "DocumentStreamDuplicateIds"
  | "DocumentStreamFailureToCreate"
  | "DocumentStreamFailureToCreateFilterUnexpected"
  | "MetricDuplicateIds"
  | "MetricTelemetryTypeUnsupported"
  | "MetricFailureToCreate"
  | "MetricFailureToCreateFilterUnexpected"
  | "FilterFailureToCreateUnexpected"
  | "CollectionConfigurationFailureToCreateUnexpected";

/** Represents the collection configuration - a customizable description of performance counters, metrics, and full telemetry documents to be collected by the client SDK. */
export interface CollectionConfigurationInfo {
  /** An encoded string that indicates whether the collection configuration is changed. */
  eTag: string;
  /** An array of metric configuration info. */
  metrics: DerivedMetricInfo[];
  /** An array of document stream configuration info. */
  documentStreams: DocumentStreamInfo[];
  /** Controls document quotas to be sent to Live Metrics. */
  quotaInfo?: QuotaConfigurationInfo;
}

export function collectionConfigurationInfoSerializer(item: CollectionConfigurationInfo): any {
  return {
    ETag: item["eTag"],
    Metrics: derivedMetricInfoArraySerializer(item["metrics"]),
    DocumentStreams: documentStreamInfoArraySerializer(item["documentStreams"]),
    QuotaInfo: !item["quotaInfo"]
      ? item["quotaInfo"]
      : quotaConfigurationInfoSerializer(item["quotaInfo"]),
  };
}

export function collectionConfigurationInfoDeserializer(item: any): CollectionConfigurationInfo {
  return {
    eTag: item["ETag"],
    metrics: derivedMetricInfoArrayDeserializer(item["Metrics"]),
    documentStreams: documentStreamInfoArrayDeserializer(item["DocumentStreams"]),
    quotaInfo: !item["QuotaInfo"]
      ? item["QuotaInfo"]
      : quotaConfigurationInfoDeserializer(item["QuotaInfo"]),
  };
}

export function derivedMetricInfoArraySerializer(result: Array<DerivedMetricInfo>): any[] {
  return result.map((item) => {
    return derivedMetricInfoSerializer(item);
  });
}

export function derivedMetricInfoArrayDeserializer(result: Array<DerivedMetricInfo>): any[] {
  return result.map((item) => {
    return derivedMetricInfoDeserializer(item);
  });
}

/** A metric configuration set by UX to scope the metrics it's interested in. */
export interface DerivedMetricInfo {
  /** metric configuration identifier. */
  id: string;
  /** Telemetry type. */
  telemetryType: string;
  /** A collection of filters to scope metrics that UX needs. */
  filterGroups: FilterConjunctionGroupInfo[];
  /** Telemetry's metric dimension whose value is to be aggregated. Example values: Duration, Count(),... */
  projection: string;
  /** Aggregation type. This is the aggregation done from everything within a single server. */
  aggregation: AggregationType;
  /** Aggregation type. This Aggregation is done across the values for all the servers taken together. */
  backEndAggregation: AggregationType;
}

export function derivedMetricInfoSerializer(item: DerivedMetricInfo): any {
  return {
    Id: item["id"],
    TelemetryType: item["telemetryType"],
    FilterGroups: filterConjunctionGroupInfoArraySerializer(item["filterGroups"]),
    Projection: item["projection"],
    Aggregation: item["aggregation"],
    BackEndAggregation: item["backEndAggregation"],
  };
}

export function derivedMetricInfoDeserializer(item: any): DerivedMetricInfo {
  return {
    id: item["Id"],
    telemetryType: item["TelemetryType"],
    filterGroups: filterConjunctionGroupInfoArrayDeserializer(item["FilterGroups"]),
    projection: item["Projection"],
    aggregation: item["Aggregation"],
    backEndAggregation: item["BackEndAggregation"],
  };
}

export function filterConjunctionGroupInfoArraySerializer(
  result: Array<FilterConjunctionGroupInfo>,
): any[] {
  return result.map((item) => {
    return filterConjunctionGroupInfoSerializer(item);
  });
}

export function filterConjunctionGroupInfoArrayDeserializer(
  result: Array<FilterConjunctionGroupInfo>,
): any[] {
  return result.map((item) => {
    return filterConjunctionGroupInfoDeserializer(item);
  });
}

/** An AND-connected group of FilterInfo objects. */
export interface FilterConjunctionGroupInfo {
  /** An array of filters. */
  filters: FilterInfo[];
}

export function filterConjunctionGroupInfoSerializer(item: FilterConjunctionGroupInfo): any {
  return { Filters: filterInfoArraySerializer(item["filters"]) };
}

export function filterConjunctionGroupInfoDeserializer(item: any): FilterConjunctionGroupInfo {
  return {
    filters: filterInfoArrayDeserializer(item["Filters"]),
  };
}

export function filterInfoArraySerializer(result: Array<FilterInfo>): any[] {
  return result.map((item) => {
    return filterInfoSerializer(item);
  });
}

export function filterInfoArrayDeserializer(result: Array<FilterInfo>): any[] {
  return result.map((item) => {
    return filterInfoDeserializer(item);
  });
}

/** A filter set on UX */
export interface FilterInfo {
  /** dimension name of the filter */
  fieldName: string;
  /** Operator of the filter */
  predicate: PredicateType;
  /** Comparand of the filter */
  comparand: string;
}

export function filterInfoSerializer(item: FilterInfo): any {
  return {
    FieldName: item["fieldName"],
    Predicate: item["predicate"],
    Comparand: item["comparand"],
  };
}

export function filterInfoDeserializer(item: any): FilterInfo {
  return {
    fieldName: item["FieldName"],
    predicate: item["Predicate"],
    comparand: item["Comparand"],
  };
}

/** Enum representing the different types of predicates. */
export type PredicateType =
  | "Equal"
  | "NotEqual"
  | "LessThan"
  | "GreaterThan"
  | "LessThanOrEqual"
  | "GreaterThanOrEqual"
  | "Contains"
  | "DoesNotContain";
/** Aggregation type. */
export type AggregationType = "Avg" | "Sum" | "Min" | "Max";

export function documentStreamInfoArraySerializer(result: Array<DocumentStreamInfo>): any[] {
  return result.map((item) => {
    return documentStreamInfoSerializer(item);
  });
}

export function documentStreamInfoArrayDeserializer(result: Array<DocumentStreamInfo>): any[] {
  return result.map((item) => {
    return documentStreamInfoDeserializer(item);
  });
}

/** Configurations/filters set by UX to scope the document/telemetry it's interested in. */
export interface DocumentStreamInfo {
  /** Identifier of the document stream initiated by a UX. */
  id: string;
  /** Gets or sets an OR-connected collection of filter groups. */
  documentFilterGroups: DocumentFilterConjunctionGroupInfo[];
}

export function documentStreamInfoSerializer(item: DocumentStreamInfo): any {
  return {
    Id: item["id"],
    DocumentFilterGroups: documentFilterConjunctionGroupInfoArraySerializer(
      item["documentFilterGroups"],
    ),
  };
}

export function documentStreamInfoDeserializer(item: any): DocumentStreamInfo {
  return {
    id: item["Id"],
    documentFilterGroups: documentFilterConjunctionGroupInfoArrayDeserializer(
      item["DocumentFilterGroups"],
    ),
  };
}

export function documentFilterConjunctionGroupInfoArraySerializer(
  result: Array<DocumentFilterConjunctionGroupInfo>,
): any[] {
  return result.map((item) => {
    return documentFilterConjunctionGroupInfoSerializer(item);
  });
}

export function documentFilterConjunctionGroupInfoArrayDeserializer(
  result: Array<DocumentFilterConjunctionGroupInfo>,
): any[] {
  return result.map((item) => {
    return documentFilterConjunctionGroupInfoDeserializer(item);
  });
}

/** A collection of filters for a specific telemetry type. */
export interface DocumentFilterConjunctionGroupInfo {
  /** Telemetry type. */
  telemetryType: TelemetryType;
  /** An array of filter groups. */
  filters: FilterConjunctionGroupInfo;
}

export function documentFilterConjunctionGroupInfoSerializer(
  item: DocumentFilterConjunctionGroupInfo,
): any {
  return {
    TelemetryType: item["telemetryType"],
    Filters: filterConjunctionGroupInfoSerializer(item["filters"]),
  };
}

export function documentFilterConjunctionGroupInfoDeserializer(
  item: any,
): DocumentFilterConjunctionGroupInfo {
  return {
    telemetryType: item["TelemetryType"],
    filters: filterConjunctionGroupInfoDeserializer(item["Filters"]),
  };
}

/** Telemetry type. */
export type TelemetryType =
  | "Request"
  | "Dependency"
  | "Exception"
  | "Event"
  | "Metric"
  | "PerformanceCounter"
  | "Trace";

/** Controls document quotas to be sent to Live Metrics. */
export interface QuotaConfigurationInfo {
  /** Initial quota */
  initialQuota?: number;
  /** Max quota */
  maxQuota: number;
  /** Quota accrual rate per second */
  quotaAccrualRatePerSec: number;
}

export function quotaConfigurationInfoSerializer(item: QuotaConfigurationInfo): any {
  return {
    InitialQuota: item["initialQuota"],
    MaxQuota: item["maxQuota"],
    QuotaAccrualRatePerSec: item["quotaAccrualRatePerSec"],
  };
}

export function quotaConfigurationInfoDeserializer(item: any): QuotaConfigurationInfo {
  return {
    initialQuota: item["InitialQuota"],
    maxQuota: item["MaxQuota"],
    quotaAccrualRatePerSec: item["QuotaAccrualRatePerSec"],
  };
}

/** Optional http response body, whose existence carries additional error descriptions. */
export interface ServiceError {
  /** A globally unique identifier to identify the diagnostic context. It defaults to the empty GUID. */
  requestId: string;
  /** Service error response date time. */
  responseDateTime: string;
  /** Error code. */
  code: string;
  /** Error message. */
  message: string;
  /** Message of the exception that triggers the error response. */
  exception: string;
}

export function serviceErrorDeserializer(item: any): ServiceError {
  return {
    requestId: item["RequestId"],
    responseDateTime: item["ResponseDateTime"],
    code: item["Code"],
    message: item["Message"],
    exception: item["Exception"],
  };
}

/** Live Metrics service versions. */
export enum KnownVersions {
  /** The 2024-04-01-preview version of the Live Metrics service. */
  V20240401Preview = "2024-04-01-preview",
}

export function monitoringDataPointArraySerializer(result: Array<MonitoringDataPoint>): any[] {
  return result.map((item) => {
    return monitoringDataPointSerializer(item);
  });
}
