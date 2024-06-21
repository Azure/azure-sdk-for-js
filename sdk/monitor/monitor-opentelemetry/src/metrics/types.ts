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
  operationSynthetic?: string;
}

export interface MetricDependencyDimensions extends StandardMetricBaseDimensions {
  dependencyType?: string;
  dependencyTarget?: string;
  dependencySuccess?: string;
  dependencyResultCode?: string;
  operationSynthetic?: string;
}

export enum PerformanceCounterMetricNames {
  PRIVATE_BYTES = "Private_Bytes",
  AVAILABLE_BYTES = "Available_Bytes",
  PROCESSOR_TIME = "Processor_Time",
  PROCESS_TIME = "Process_Time",
  REQUEST_RATE = "Request_Rate",
  REQUEST_DURATION = "Request_Execution_Time",
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

export const StandardMetricPropertyNames: { [key in MetricDimensionTypeKeys]: string } = {
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

export enum StandardMetricIds {
  REQUEST_DURATION = "requests/duration",
  DEPENDENCIES_DURATION = "dependencies/duration",
  EXCEPTIONS_COUNT = "exceptions/count",
  TRACES_COUNT = "traces/count",
}
