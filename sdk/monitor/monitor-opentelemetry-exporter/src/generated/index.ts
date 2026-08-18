// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { ApplicationInsightsClient } from "./applicationInsightsClient.js";
export type {
  TelemetryItem,
  MonitorBase,
  MonitorDomain,
  MonitorDomainUnion,
  MonitorDomainKind,
  AvailabilityData,
  TelemetryEventData,
  TelemetryExceptionData,
  TelemetryExceptionDetails,
  StackFrame,
  SeverityLevel,
  MessageData,
  MetricsData,
  MetricDataPoint,
  DataPointType,
  PageViewData,
  PageViewPerfData,
  RemoteDependencyData,
  RequestData,
  TrackResponse,
  TelemetryErrorDetails,
  Versions,
  ContextTagKeys,
} from "./models/index.js";
export {
  KnownMonitorDomainKind,
  KnownSeverityLevel,
  KnownDataPointType,
  KnownContextTagKeys,
} from "./models/index.js";
export type { ApplicationInsightsClientOptionalParams, TrackOptionalParams } from "./api/index.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
