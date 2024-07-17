import {
  DerivedMetricInfo,
  KnownTelemetryType,
  FilterInfo,
} from "../../generated";

export interface RequestMetric {

}

export interface DependencyMetric {

}

export interface ExceptionMetric {

}

export interface TraceMetric {

}

export class TelemetryTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TelemetryTypeError";
  }
}

export class UnexpectedFilterCreateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedFilterCreateError";
  }
}

export function validateTelemetryType(derivedMetricInfo: DerivedMetricInfo): void {
  if (derivedMetricInfo.telemetryType === KnownTelemetryType.PerformanceCounter) {
    throw new TelemetryTypeError('The telemetry type PerformanceCounter was specified, but this distro does not send performance counters to quickpulse.');
  } else if (derivedMetricInfo.telemetryType === KnownTelemetryType.Event) {
    throw new TelemetryTypeError('The telemetry type Event was specified, but this telemetry type is not supported via OpenTelemetry.');
  } else if (derivedMetricInfo.telemetryType === KnownTelemetryType.Metric) {
    throw new TelemetryTypeError('The telemetry type Metric was specified, but this distro does not send custom live metrics to quickpulse.');
  } else if (!(derivedMetricInfo.telemetryType === KnownTelemetryType.Request ||
    derivedMetricInfo.telemetryType === KnownTelemetryType.Dependency ||
    derivedMetricInfo.telemetryType === KnownTelemetryType.Exception)) {
    throw new TelemetryTypeError(`'${derivedMetricInfo.telemetryType}' is not a valid telemetry type.`);
  }
}

export function checkCustomMetricProjection(derivedMetricInfo: DerivedMetricInfo): void {
  if (derivedMetricInfo.projection.startsWith("CustomMetrics.")) {
    throw new UnexpectedFilterCreateError('The Projection of a customMetric property is not supported via OpenTelemetry.');
  }
}

export function validateFilters(derivedMetricInfo: DerivedMetricInfo): void {
  derivedMetricInfo.filterGroups.forEach((filterGroup) => {
    filterGroup.filters.forEach((filter) => {
      validateFieldNames(filter);

    })
  });
}

function validateFieldNames(filter: FilterInfo): void {
  if (filter.fieldName.startsWith("CustomMetrics.")) {
    throw new UnexpectedFilterCreateError('Filtering of a customMetric property is not supported via OpenTelemetry.');
  }
  // add more cases
}
