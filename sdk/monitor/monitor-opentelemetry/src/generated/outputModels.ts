// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents the collection configuration - a customizable description of performance counters, metrics, and full telemetry documents to be collected by the client SDK. */
export interface CollectionConfigurationInfoOutput {
  /** An encoded string that indicates whether the collection configuration is changed. */
  ETag: string;
  /** An array of metric configuration info. */
  Metrics: Array<DerivedMetricInfoOutput>;
  /** An array of document stream configuration info. */
  DocumentStreams: Array<DocumentStreamInfoOutput>;
  /** Controls document quotas to be sent to Live Metrics. */
  QuotaInfo?: QuotaConfigurationInfoOutput;
}

/** A metric configuration set by UX to scope the metrics it's interested in. */
export interface DerivedMetricInfoOutput {
  /** metric configuration identifier. */
  Id: string;
  /** Telemetry type. */
  TelemetryType: string;
  /** A collection of filters to scope metrics that UX needs. */
  FilterGroups: Array<FilterConjunctionGroupInfoOutput>;
  /** Telemetry's metric dimension whose value is to be aggregated. Example values: Duration, Count(),... */
  Projection: string;
  /**
   * Aggregation type. This is the aggregation done from everything within a single server.
   *
   * Possible values: "Avg", "Sum", "Min", "Max"
   */
  Aggregation: AggregationTypeOutput;
  /**
   * Aggregation type. This Aggregation is done across the values for all the servers taken together.
   *
   * Possible values: "Avg", "Sum", "Min", "Max"
   */
  BackEndAggregation: AggregationTypeOutput;
}

/** An AND-connected group of FilterInfo objects. */
export interface FilterConjunctionGroupInfoOutput {
  /** An array of filters. */
  Filters: Array<FilterInfoOutput>;
}

/** A filter set on UX */
export interface FilterInfoOutput {
  /** dimension name of the filter */
  FieldName: string;
  /**
   * Operator of the filter
   *
   * Possible values: "Equal", "NotEqual", "LessThan", "GreaterThan", "LessThanOrEqual", "GreaterThanOrEqual", "Contains", "DoesNotContain"
   */
  Predicate: PredicateTypeOutput;
  /** Comparand of the filter */
  Comparand: string;
}

/** Configurations/filters set by UX to scope the document/telemetry it's interested in. */
export interface DocumentStreamInfoOutput {
  /** Identifier of the document stream initiated by a UX. */
  Id: string;
  /** Gets or sets an OR-connected collection of filter groups. */
  DocumentFilterGroups: Array<DocumentFilterConjunctionGroupInfoOutput>;
}

/** A collection of filters for a specific telemetry type. */
export interface DocumentFilterConjunctionGroupInfoOutput {
  /**
   * Telemetry type.
   *
   * Possible values: "Request", "Dependency", "Exception", "Event", "Metric", "PerformanceCounter", "Trace"
   */
  TelemetryType: TelemetryTypeOutput;
  /** An array of filter groups. */
  Filters: FilterConjunctionGroupInfoOutput;
}

/** Controls document quotas to be sent to Live Metrics. */
export interface QuotaConfigurationInfoOutput {
  /** Initial quota */
  InitialQuota?: number;
  /** Max quota */
  MaxQuota: number;
  /** Quota accrual rate per second */
  QuotaAccrualRatePerSec: number;
}

/** Optional http response body, whose existence carries additional error descriptions. */
export interface ServiceErrorOutput {
  /** A globally unique identifier to identify the diagnostic context. It defaults to the empty GUID. */
  RequestId: string;
  /** Service error response date time. */
  ResponseDateTime: string;
  /** Error code. */
  Code: string;
  /** Error message. */
  Message: string;
  /** Message of the exception that triggers the error response. */
  Exception: string;
}

/** Alias for PredicateTypeOutput */
export type PredicateTypeOutput = string;
/** Alias for AggregationTypeOutput */
export type AggregationTypeOutput = string;
/** Alias for TelemetryTypeOutput */
export type TelemetryTypeOutput = string;
