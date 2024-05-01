// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Disable Standard Metrics environment variable name.
 */
export const APPLICATION_INSIGHTS_NO_STANDARD_METRICS = "APPLICATION_INSIGHTS_NO_STANDARD_METRICS";

export interface StandardMetricBaseDimensions {
  metricId?: string;
  cloudRoleInstance?: string;
  cloudRoleName?: string;
  IsAutocollected?: string;
}

export interface MetricRequestDimensions extends StandardMetricBaseDimensions {
  requestSuccess?: string;
  requestResultCode?: string;
}

export interface MetricDependencyDimensions extends StandardMetricBaseDimensions {
  dependencyType?: string;
  dependencyTarget?: string;
  dependencySuccess?: string;
  dependencyResultCode?: string;
}

export enum StandardMetricNames {
  HTTP_REQUEST_DURATION = "azureMonitor.http.requestDuration",
  HTTP_DEPENDENCY_DURATION = "azureMonitor.http.dependencyDuration",
  EXCEPTION_COUNT = "azureMonitor.exceptionCount",
  TRACE_COUNT = "azureMonitor.traceCount",
}

export enum PerformanceCounterMetricNames {
  PRIVATE_BYTES = "\\Process(??APP_WIN32_PROC??)\\Private Bytes",
  AVAILABLE_BYTES = "\\Memory\\Available Bytes",
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",
  PROCESS_TIME = "\\Process(??APP_WIN32_PROC??)\\% Processor Time",
  REQUEST_RATE = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec",
  REQUEST_DURATION = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time",
}
