// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureMonitorOpenTelemetryClient } from "./client";
export { AzureMonitorOpenTelemetryConfig } from "./shared";
export { IConfig, IInstrumentationsConfig } from "./shared/types";
export { TraceHandler } from "./traces";
export { MetricHandler } from "./metrics";
export { _StandardMetrics } from "./metrics/standardMetrics";
export { _PerformanceCounterMetrics } from "./metrics/performanceCounters";
