// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Azure service API version.
 */
export enum ServiceApiVersion {
  /**
   * V2 Version
   */
  V2 = "2020-09-15_Preview"
}

/**
 * Default Breeze endpoint.
 * @internal
 */
export const DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
/**
 * Default Breeze API version.
 * @internal
 */
export const DEFAULT_BREEZE_API_VERSION = ServiceApiVersion.V2;
/**
 * Default Live Metrics endpoint.
 * @internal
 */
export const DEFAULT_LIVEMETRICS_ENDPOINT = "https://rt.services.visualstudio.com";
/**
 * Default Live Metrics host.
 * @internal
 */
export const DEFAULT_LIVEMETRICS_HOST = "rt.services.visualstudio.com";
/**
 * Connection string environment variable name.
 * @internal
 */
export const ENV_CONNECTION_STRING = "APPLICATIONINSIGHTS_CONNECTION_STRING";
/**
 * Instrumentation key environment variable name.
 * @internal
 */
export const ENV_INSTRUMENTATION_KEY = "APPINSIGHTS_INSTRUMENTATIONKEY";

/**
 * QuickPulse metric counter names.
 * @internal
 */
export enum QuickPulseCounter {
  // Memory
  COMMITTED_BYTES = "\\Memory\\Committed Bytes",

  // CPU
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",

  // Request
  REQUEST_RATE = "\\ApplicationInsights\\Requests/Sec",
  REQUEST_FAILURE_RATE = "\\ApplicationInsights\\Requests Failed/Sec",
  REQUEST_DURATION = "\\ApplicationInsights\\Request Duration",

  // Dependency
  DEPENDENCY_RATE = "\\ApplicationInsights\\Dependency Calls/Sec",
  DEPENDENCY_FAILURE_RATE = "\\ApplicationInsights\\Dependency Calls Failed/Sec",
  DEPENDENCY_DURATION = "\\ApplicationInsights\\Dependency Call Duration",

  // Exception
  EXCEPTION_RATE = "\\ApplicationInsights\\Exceptions/Sec"
}

/**
 * Performance metric counter names.
 * @internal
 */
export enum PerformanceCounter {
  // Memory
  PRIVATE_BYTES = "\\Process(??APP_WIN32_PROC??)\\Private Bytes",
  AVAILABLE_BYTES = "\\Memory\\Available Bytes",

  // CPU
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",
  PROCESS_TIME = "\\Process(??APP_WIN32_PROC??)\\% Processor Time",

  // Requests
  REQUEST_RATE = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec",
  REQUEST_DURATION = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time"
}

/**
 * Map a PerformanceCounter/QuickPulseCounter to a QuickPulseCounter. If no mapping exists, mapping is *undefined*
 * @internal
 */
export const PerformanceToQuickPulseCounter: { [key: string]: QuickPulseCounter } = {
  [PerformanceCounter.PROCESSOR_TIME]: QuickPulseCounter.PROCESSOR_TIME,
  [PerformanceCounter.REQUEST_RATE]: QuickPulseCounter.REQUEST_RATE,
  [PerformanceCounter.REQUEST_DURATION]: QuickPulseCounter.REQUEST_DURATION,

  // Remap quick pulse only counters
  [QuickPulseCounter.COMMITTED_BYTES]: QuickPulseCounter.COMMITTED_BYTES,
  [QuickPulseCounter.REQUEST_FAILURE_RATE]: QuickPulseCounter.REQUEST_FAILURE_RATE,
  [QuickPulseCounter.DEPENDENCY_RATE]: QuickPulseCounter.DEPENDENCY_RATE,
  [QuickPulseCounter.DEPENDENCY_FAILURE_RATE]: QuickPulseCounter.DEPENDENCY_FAILURE_RATE,
  [QuickPulseCounter.DEPENDENCY_DURATION]: QuickPulseCounter.DEPENDENCY_DURATION,
  [QuickPulseCounter.EXCEPTION_RATE]: QuickPulseCounter.EXCEPTION_RATE
};

/**
 * QuickPulse document types.
 * @internal
 */
export type QuickPulseDocumentType =
  | "Event"
  | "Exception"
  | "Trace"
  | "Metric"
  | "Request"
  | "RemoteDependency"
  | "Availability";
/**
 * QuickPulse telemetry types.
 * @internal
 */
export type QuickPulseType =
  | "EventTelemetryDocument"
  | "ExceptionTelemetryDocument"
  | "TraceTelemetryDocument"
  | "MetricTelemetryDocument"
  | "RequestTelemetryDocument"
  | "DependencyTelemetryDocument"
  | "AvailabilityTelemetryDocument";

/**
 * OpenTelemetry Span Attributes.
 * @internal
 */
export const SpanAttribute = {
  // HTTP
  HttpHost: "http.host",
  HttpMethod: "http.method",
  HttpPort: "http.port",
  HttpStatusCode: "http.status_code",
  HttpUrl: "http.url",
  HttpUserAgent: "http.user_agent",

  // GRPC
  GrpcMethod: "grpc.method",
  GrpcService: "rpc.service" // rpc not grpc
};

/**
 * OpenTelemetry dependency type names.
 * @internal
 */
export const DependencyTypeName = {
  Grpc: "GRPC",
  Http: "HTTP",
  InProc: "InProc"
};
