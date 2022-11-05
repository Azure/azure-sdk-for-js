// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * AI MS Links.
 * @internal
 */
export const MS_LINKS = "_MS.links";
/**
 * AI enqueued time attribute.
 * @internal
 */
export const ENQUEUED_TIME = "enqueuedTime";
/**
 * AI time since enqueued attribute.
 * @internal
 */
export const TIME_SINCE_ENQUEUED = "timeSinceEnqueued";
/**
 * AzureMonitorTraceExporter version.
 * @internal
 */
export const packageVersion = "1.0.0-beta.9";

export enum DependencyTypes {
  InProc = "InProc",
  QueueMessage = "Queue Message",
  Sql = "SQL",
  Http = "Http",
  Grpc = "GRPC",
}

export const AzureMonitorSampleRate = "_MS.sampleRate";

export enum StandardMetrics {
  HTTP_REQUEST_DURATION = "azureMonitor.http.requestDuration",
  HTTP_DEPENDENCY_DURATION = "azureMonitor.http.dependencyDuration",
  EXCEPTION_COUNT = "azureMonitor.exceptionCount",
  TRACE_COUNT = "azureMonitor.traceCount",
}

export enum StandardMetricIds {
  REQUEST_DURATION = "requests/duration",
  DEPENDENCY_DURATION = "dependencies/duration",
  EXCEPTION_COUNT = "exceptions/count",
  TRACE_COUNT = "traces/count",
}

export type MetricDimensionTypeKeys =
  | "cloudRoleInstance"
  | "cloudRoleName"
  | "requestSuccess"
  | "requestResultCode"
  | "dependencyType"
  | "dependencyTarget"
  | "dependencySuccess"
  | "dependencyResultCode"
  | "traceSeverityLevel"
  | "operationSynthetic"
  | "metricId"
  | "IsAutocollected";

// Names expected in Breeze side for dimensions
export const PreAggregatedMetricPropertyNames: { [key in MetricDimensionTypeKeys]: string } = {
  cloudRoleInstance: "cloud/roleInstance",
  cloudRoleName: "cloud/roleName",
  operationSynthetic: "operation/synthetic",
  requestSuccess: "Request.Success",
  requestResultCode: "request/resultCode",
  dependencyType: "Dependency.Type",
  dependencyTarget: "dependency/target",
  dependencySuccess: "Dependency.Success",
  dependencyResultCode: "dependency/resultCode",
  traceSeverityLevel: "trace/severityLevel",
  metricId: "_MS.MetricId",
  IsAutocollected: "_MS.IsAutocollected",
};
