// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** System variables for a telemetry item. */
export interface TelemetryItem {
  /**
   * Envelope version. For internal use only. By assigning this the default, it will
   * not be serialized within the payload unless changed to a value other than #1.
   */
  version?: number;
  /** Type name of telemetry data item. */
  name: string;
  /**
   * Event date time when telemetry item was created. This is the wall clock time on
   * the client when the event was generated. There is no guarantee that the
   * client's time is accurate. This field must be formatted in UTC ISO 8601 format,
   * with a trailing 'Z' character, as described publicly on
   * https://en.wikipedia.org/wiki/ISO_8601#UTC. Note: the number of decimal seconds
   * digits provided are variable (and unspecified). Consumers should handle this,
   * i.e. managed code consumers should not use format 'O' for parsing as it
   * specifies a fixed length. Example: 2009-06-15T13:45:30.0000000Z.
   */
  time: Date;
  /**
   * Sampling rate used in application. This telemetry item represents 100 /
   * sampleRate actual telemetry items.
   */
  sampleRate?: number;
  /** Sequence field used to track absolute order of uploaded events. */
  sequence?: string;
  /** The instrumentation key of the Application Insights resource. */
  instrumentationKey?: string;
  /**
   * Key/value collection of context properties. See ContextTagKeys for information
   * on available properties.
   */
  tags?: Record<string, string>;
  /** Telemetry data item. */
  data?: MonitorBase;
}

export function telemetryItemSerializer(item: TelemetryItem): any {
  return {
    ver: item["version"],
    name: item["name"],
    time: item["time"].toISOString(),
    sampleRate: item["sampleRate"],
    seq: item["sequence"],
    iKey: item["instrumentationKey"],
    tags: item["tags"],
    data: !item["data"] ? item["data"] : monitorBaseSerializer(item["data"]),
  };
}

/** Data struct to contain only C section with custom fields. */
export interface MonitorBase {
  /**
   * Name of item (B section) if any. If telemetry data is derived straight from
   * this, this should be null.
   */
  baseType?: string;
  /** The data payload for the telemetry request */
  baseData?: MonitorDomain;
}

export function monitorBaseSerializer(item: MonitorBase): any {
  return {
    baseType: item["baseType"],
    baseData: !item["baseData"] ? item["baseData"] : monitorDomainSerializer(item["baseData"]),
  };
}

/** The abstract common base of all domains. */
export interface MonitorDomain {
  /** Schema version */
  version: number;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function monitorDomainSerializer(item: MonitorDomain): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), ver: item["version"] };
}

export function monitorDomainDeserializer(item: any): MonitorDomain {
  return {
    additionalProperties: serializeRecord(item, ["version"]),
    version: item["ver"],
  };
}

/** Response containing the status of each telemetry item. */
export interface TrackResponse {
  /** The number of items received. */
  itemsReceived?: number;
  /** The number of items accepted. */
  itemsAccepted?: number;
  /** An array of error detail objects. */
  errors?: TelemetryErrorDetails[];
}

export function trackResponseDeserializer(item: any): TrackResponse {
  return {
    itemsReceived: item["itemsReceived"],
    itemsAccepted: item["itemsAccepted"],
    errors: !item["errors"]
      ? item["errors"]
      : telemetryErrorDetailsArrayDeserializer(item["errors"]),
  };
}

export function telemetryErrorDetailsArrayDeserializer(
  result: Array<TelemetryErrorDetails>,
): any[] {
  return result.map((item) => {
    return telemetryErrorDetailsDeserializer(item);
  });
}

/** The error details */
export interface TelemetryErrorDetails {
  /** The index in the original payload of the item. */
  index?: number;
  /** The item specific [HTTP Response status code](#Response Status Codes). */
  statusCode?: number;
  /** The error message. */
  message?: string;
}

export function telemetryErrorDetailsDeserializer(item: any): TelemetryErrorDetails {
  return {
    index: item["index"],
    statusCode: item["statusCode"],
    message: item["message"],
  };
}

/** Metric data single measurement. */
export interface MetricDataPoint {
  /** Namespace of the metric. */
  namespace?: string;
  /** Name of the metric. */
  name: string;
  /** Metric type. Single measurement or the aggregated value. */
  dataPointType?: DataPointType;
  /**
   * Single value for measurement. Sum of individual measurements for the
   * aggregation.
   */
  value: number;
  /** Metric weight of the aggregated metric. Should not be set for a measurement. */
  count?: number;
  /** Minimum value of the aggregated metric. Should not be set for a measurement. */
  min?: number;
  /** Maximum value of the aggregated metric. Should not be set for a measurement. */
  max?: number;
  /**
   * Standard deviation of the aggregated metric. Should not be set for a
   * measurement.
   */
  stdDev?: number;
}

export function metricDataPointDeserializer(item: any): MetricDataPoint {
  return {
    namespace: item["ns"],
    name: item["name"],
    dataPointType: item["kind"],
    value: item["value"],
    count: item["count"],
    min: item["min"],
    max: item["max"],
    stdDev: item["stdDev"],
  };
}

/** Type of the metric data. */
export type DataPointType = "Measurement" | "Aggregation";

/**
 * Instances of Event represent structured event records that can be grouped and
 * searched by their properties. Event data item also creates a metric of event
 * count by name.
 */
export interface TelemetryEventData extends MonitorDomain {
  /** Event name. Keep it low cardinality to allow proper grouping and useful metrics. */
  name: string;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function telemetryEventDataDeserializer(item: any): TelemetryEventData {
  return {
    additionalProperties: serializeRecord(item, ["version", "name", "properties", "measurements"]),
    version: item["ver"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/**
 * An instance of Exception represents a handled or unhandled exception that
 * occurred during execution of the monitored application.
 */
export interface TelemetryExceptionData extends MonitorDomain {
  /** Exception chain - list of inner exceptions. */
  exceptions: TelemetryExceptionDetails[];
  /**
   * Severity level. Mostly used to indicate exception severity level when it is
   * reported by logging library.
   */
  severityLevel?: SeverityLevel;
  /**
   * Identifier of where the exception was thrown in code. Used for exceptions
   * grouping. Typically a combination of exception type and a function from the
   * call stack.
   */
  problemId?: string;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function telemetryExceptionDataDeserializer(item: any): TelemetryExceptionData {
  return {
    additionalProperties: serializeRecord(item, [
      "version",
      "exceptions",
      "severityLevel",
      "problemId",
      "properties",
      "measurements",
    ]),
    version: item["ver"],
    exceptions: telemetryExceptionDetailsArrayDeserializer(item["exceptions"]),
    severityLevel: item["severityLevel"],
    problemId: item["problemId"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function telemetryExceptionDetailsArrayDeserializer(
  result: Array<TelemetryExceptionDetails>,
): any[] {
  return result.map((item) => {
    return telemetryExceptionDetailsDeserializer(item);
  });
}

/** Exception details of the exception in a chain. */
export interface TelemetryExceptionDetails {
  /**
   * In case exception is nested (outer exception contains inner one), the id and
   * outerId properties are used to represent the nesting.
   */
  id?: number;
  /**
   * The value of outerId is a reference to an element in ExceptionDetails that
   * represents the outer exception
   */
  outerId?: number;
  /** Exception type name. */
  typeName?: string;
  /** Exception message. */
  message: string;
  /**
   * Indicates if full exception stack is provided in the exception. The stack may
   * be trimmed, such as in the case of a StackOverflow exception.
   */
  hasFullStack?: boolean;
  /** Text describing the stack. Either stack or parsedStack should have a value. */
  stack?: string;
  /** List of stack frames. Either stack or parsedStack should have a value. */
  parsedStack?: StackFrame[];
}

export function telemetryExceptionDetailsDeserializer(item: any): TelemetryExceptionDetails {
  return {
    id: item["id"],
    outerId: item["outerId"],
    typeName: item["typeName"],
    message: item["message"],
    hasFullStack: item["hasFullStack"],
    stack: item["stack"],
    parsedStack: !item["parsedStack"]
      ? item["parsedStack"]
      : stackFrameArrayDeserializer(item["parsedStack"]),
  };
}

export function stackFrameArrayDeserializer(result: Array<StackFrame>): any[] {
  return result.map((item) => {
    return stackFrameDeserializer(item);
  });
}

/** Stack frame information. */
export interface StackFrame {
  /** Level in the stack. */
  level: number;
  /** Method name. */
  method: string;
  /** Name of the assembly (dll, jar, etc.) containing this function. */
  assembly?: string;
  /** File name or URL of the method implementation. */
  fileName?: string;
  /** Line number of the code implementation. */
  line?: number;
}

export function stackFrameDeserializer(item: any): StackFrame {
  return {
    level: item["level"],
    method: item["method"],
    assembly: item["assembly"],
    fileName: item["fileName"],
    line: item["line"],
  };
}

/** Defines the level of severity for the event. */
export type SeverityLevel = "Verbose" | "Information" | "Warning" | "Error" | "Critical";

/**
 * Instances of Message represent printf-like trace statements that are
 * text-searched. Log4Net, NLog and other text-based log file entries are
 * translated into instances of this type. The message does not have measurements.
 */
export interface MessageData extends MonitorDomain {
  /** Trace message */
  message: string;
  /** Trace severity level. */
  severityLevel?: SeverityLevel;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function messageDataDeserializer(item: any): MessageData {
  return {
    additionalProperties: serializeRecord(item, [
      "version",
      "message",
      "severityLevel",
      "properties",
      "measurements",
    ]),
    version: item["ver"],
    message: item["message"],
    severityLevel: item["severityLevel"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/**
 * An instance of the Metric item is a list of measurements (single data points)
 * and/or aggregations.
 */
export interface MetricsData extends MonitorDomain {
  /**
   * List of metrics. Only one metric in the list is currently supported by
   * Application Insights storage. If multiple data points were sent only the first
   * one will be used.
   */
  metrics: MetricDataPoint[];
  /** Collection of custom properties. */
  properties?: Record<string, string>;
}

export function metricsDataDeserializer(item: any): MetricsData {
  return {
    additionalProperties: serializeRecord(item, ["version", "metrics", "properties"]),
    version: item["ver"],
    metrics: metricDataPointArrayDeserializer(item["metrics"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function metricDataPointArrayDeserializer(result: Array<MetricDataPoint>): any[] {
  return result.map((item) => {
    return metricDataPointDeserializer(item);
  });
}

/**
 * An instance of PageView represents a generic action on a page like a button
 * click. It is also the base type for PageView.
 */
export interface PageViewData extends MonitorDomain {
  /**
   * Identifier of a page view instance. Used for correlation between page view and
   * other telemetry items.
   */
  id: string;
  /** Event name. Keep it low cardinality to allow proper grouping and useful metrics. */
  name: string;
  /** Request URL with all query string parameters */
  url?: string;
  /**
   * Request duration in format: DD.HH:MM:SS.MMMMMM. For a page view (PageViewData),
   * this is the duration. For a page view with performance information
   * (PageViewPerfData), this is the page load time. Must be less than 1000 days.
   */
  duration?: string;
  /** Fully qualified page URI or URL of the referring page; if unknown, leave blank */
  referredUri?: string;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function pageViewDataDeserializer(item: any): PageViewData {
  return {
    additionalProperties: serializeRecord(item, [
      "version",
      "id",
      "name",
      "url",
      "duration",
      "referredUri",
      "properties",
      "measurements",
    ]),
    version: item["ver"],
    id: item["id"],
    name: item["name"],
    url: item["url"],
    duration: item["duration"],
    referredUri: item["referredUri"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/**
 * An instance of PageViewPerf represents: a page view with no performance data, a
 * page view with performance data, or just the performance data of an earlier
 * page request.
 */
export interface PageViewPerfData extends MonitorDomain {
  /**
   * Identifier of a page view instance. Used for correlation between page view and
   * other telemetry items.
   */
  id: string;
  /** Event name. Keep it low cardinality to allow proper grouping and useful metrics. */
  name: string;
  /** Request URL with all query string parameters */
  url?: string;
  /**
   * Request duration in format: DD.HH:MM:SS.MMMMMM. For a page view (PageViewData),
   * this is the duration. For a page view with performance information
   * (PageViewPerfData), this is the page load time. Must be less than 1000 days.
   */
  duration?: string;
  /** Performance total in TimeSpan 'G' (general long) format: d:hh:mm:ss.fffffff */
  perfTotal?: string;
  /**
   * Network connection time in TimeSpan 'G' (general long) format:
   * d:hh:mm:ss.fffffff
   */
  networkConnect?: string;
  /** Sent request time in TimeSpan 'G' (general long) format: d:hh:mm:ss.fffffff */
  sentRequest?: string;
  /** Received response time in TimeSpan 'G' (general long) format: d:hh:mm:ss.fffffff */
  receivedResponse?: string;
  /** DOM processing time in TimeSpan 'G' (general long) format: d:hh:mm:ss.fffffff */
  domProcessing?: string;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function pageViewPerfDataDeserializer(item: any): PageViewPerfData {
  return {
    additionalProperties: serializeRecord(item, [
      "version",
      "id",
      "name",
      "url",
      "duration",
      "perfTotal",
      "networkConnect",
      "sentRequest",
      "receivedResponse",
      "domProcessing",
      "properties",
      "measurements",
    ]),
    version: item["ver"],
    id: item["id"],
    name: item["name"],
    url: item["url"],
    duration: item["duration"],
    perfTotal: item["perfTotal"],
    networkConnect: item["networkConnect"],
    sentRequest: item["sentRequest"],
    receivedResponse: item["receivedResponse"],
    domProcessing: item["domProcessing"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/**
 * An instance of Remote Dependency represents an interaction of the monitored
 * component with a remote component/service like SQL or an HTTP endpoint.
 */
export interface RemoteDependencyData extends MonitorDomain {
  /**
   * Identifier of a dependency call instance. Used for correlation with the request
   * telemetry item corresponding to this dependency call.
   */
  id?: string;
  /**
   * Name of the command initiated with this dependency call. Low cardinality value.
   * Examples are stored procedure name and URL path template.
   */
  name: string;
  /**
   * Result code of a dependency call. Examples are SQL error code and HTTP status
   * code.
   */
  resultCode?: string;
  /**
   * Command initiated by this dependency call. Examples are SQL statement and HTTP
   * URL with all query parameters.
   */
  data?: string;
  /**
   * Dependency type name. Very low cardinality value for logical grouping of
   * dependencies and interpretation of other fields like commandName and
   * resultCode. Examples are SQL, Azure table, and HTTP.
   */
  type?: string;
  /** Target site of a dependency call. Examples are server name, host address. */
  target?: string;
  /** Request duration in format: DD.HH:MM:SS.MMMMMM. Must be less than 1000 days. */
  duration: string;
  /** Indication of successful or unsuccessful call. */
  success?: boolean;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function remoteDependencyDataDeserializer(item: any): RemoteDependencyData {
  return {
    additionalProperties: serializeRecord(item, [
      "version",
      "id",
      "name",
      "resultCode",
      "data",
      "type",
      "target",
      "duration",
      "success",
      "properties",
      "measurements",
    ]),
    version: item["ver"],
    id: item["id"],
    name: item["name"],
    resultCode: item["resultCode"],
    data: item["data"],
    type: item["type"],
    target: item["target"],
    duration: item["duration"],
    success: item["success"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/**
 * An instance of Request represents completion of an external request to the
 * application to do work and contains a summary of that request execution and the
 * results.
 */
export interface RequestData extends MonitorDomain {
  /**
   * Identifier of a request call instance. Used for correlation between request and
   * other telemetry items.
   */
  id: string;
  /**
   * Name of the request. Represents code path taken to process request. Low
   * cardinality value to allow better grouping of requests. For HTTP requests it
   * represents the HTTP method and URL path template like 'GET /values/{id}'.
   */
  name?: string;
  /** Request duration in format: DD.HH:MM:SS.MMMMMM. Must be less than 1000 days. */
  duration: string;
  /** Indication of successful or unsuccessful call. */
  success: boolean;
  /** Result of a request execution. HTTP status code for HTTP requests. */
  responseCode: string;
  /**
   * Source of the request. Examples are the instrumentation key of the caller or
   * the ip address of the caller.
   */
  source?: string;
  /** Request URL with all query string parameters. */
  url?: string;
  /** Collection of custom properties. */
  properties?: Record<string, string>;
  /** Collection of custom measurements. */
  measurements?: Record<string, number>;
}

export function requestDataDeserializer(item: any): RequestData {
  return {
    additionalProperties: serializeRecord(item, [
      "version",
      "id",
      "name",
      "duration",
      "success",
      "responseCode",
      "source",
      "url",
      "properties",
      "measurements",
    ]),
    version: item["ver"],
    id: item["id"],
    name: item["name"],
    duration: item["duration"],
    success: item["success"],
    responseCode: item["responseCode"],
    source: item["source"],
    url: item["url"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    measurements: !item["measurements"]
      ? item["measurements"]
      : Object.fromEntries(
          Object.entries(item["measurements"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Type of Versions */
export type Versions = "v2.1";
/** The context tag keys. */
export type ContextTagKeys =
  | "ai.application.ver"
  | "ai.device.id"
  | "ai.device.locale"
  | "ai.device.model"
  | "ai.device.oemName"
  | "ai.device.osVersion"
  | "ai.device.type"
  | "ai.location.ip"
  | "ai.location.country"
  | "ai.location.province"
  | "ai.location.city"
  | "ai.operation.id"
  | "ai.operation.name"
  | "ai.operation.parentId"
  | "ai.operation.syntheticSource"
  | "ai.operation.correlationVector"
  | "ai.session.id"
  | "ai.session.isFirst"
  | "ai.user.accountId"
  | "ai.user.id"
  | "ai.user.authUserId"
  | "ai.cloud.role"
  | "ai.cloud.roleVer"
  | "ai.cloud.roleInstance"
  | "ai.cloud.location"
  | "ai.internal.sdkVersion"
  | "ai.internal.agentVersion"
  | "ai.internal.nodeName";

export function telemetryItemArraySerializer(result: Array<TelemetryItem>): any[] {
  return result.map((item) => {
    return telemetryItemSerializer(item);
  });
}
