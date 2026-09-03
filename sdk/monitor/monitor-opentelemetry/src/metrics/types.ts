// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AggregationOption } from "@opentelemetry/sdk-metrics";
import { AggregationType } from "@opentelemetry/sdk-metrics";

/**
 * Disable Standard Metrics environment variable name.
 */
export const APPLICATION_INSIGHTS_NO_STANDARD_METRICS = "APPLICATION_INSIGHTS_NO_STANDARD_METRICS";

/**
 * Mapping of OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION values to aggregation options.
 */
export const HISTOGRAM_AGGREGATION_MAP: Record<string, AggregationOption> = {
  explicit_bucket_histogram: { type: AggregationType.EXPLICIT_BUCKET_HISTOGRAM },
  base2_exponential_bucket_histogram: { type: AggregationType.EXPONENTIAL_HISTOGRAM },
};

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
  PROCESS_TIME_STANDARD = "Process_Time_Standard",
  REQUEST_RATE = "Request_Rate",
  REQUEST_DURATION = "Request_Execution_Time",
  PROCESS_TIME_NORMALIZED = "Process_Time_Normalized",
  EXCEPTION_RATE = "Exception_Rate",
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
