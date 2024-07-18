import {
  DerivedMetricInfo,
  KnownTelemetryType,
  FilterInfo,
  KnownPredicateType,
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

enum KnownRequestColumns {
  Url = "Url",
  Duration = "Duration",
  ResponseCode = "ResponseCode",
  Success = "Success",
  Name = "Name",
}

enum KnownDependencyColumns {
  Target = "Target",
  Duration = "Duration",
  Success = "Success",
  Name = "Name",
  ResultCode = "ResultCode",
  Type = "Type",
  Data = "Data",
}

export function validateTelemetryType(derivedMetricInfo: DerivedMetricInfo): void {
  if (derivedMetricInfo.telemetryType === KnownTelemetryType.PerformanceCounter) {
    throw new TelemetryTypeError('The telemetry type PerformanceCounter was specified, but this distro does not send performance counters to quickpulse.');
  } else if (derivedMetricInfo.telemetryType === KnownTelemetryType.Event) {
    throw new TelemetryTypeError('The telemetry type Event was specified, but this telemetry type is not supported via OpenTelemetry.');
  } else if (derivedMetricInfo.telemetryType === KnownTelemetryType.Metric) {
    throw new TelemetryTypeError('The telemetry type Metric was specified, but this distro does not send custom live metrics to quickpulse.');
  } else if (!(derivedMetricInfo.telemetryType in KnownTelemetryType)) {
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
      validateFieldNames(filter.fieldName, derivedMetricInfo.telemetryType);
      validatePredicateAndComparand(filter);
    })
  });
}

function isCustomDimOrAnyField(fieldName: string): boolean {
  return fieldName.startsWith("CustomDimensions.") || fieldName === "*";
}

function validateFieldNames(fieldName: string, telemetryType: string): void {
  if (fieldName === "") {
    throw new UnexpectedFilterCreateError('A filter must have a field name.');
  }
  if (fieldName.startsWith("CustomMetrics.")) {
    throw new UnexpectedFilterCreateError('Filtering of a customMetric property is not supported via OpenTelemetry.');
  }

  switch (telemetryType) {
    case KnownTelemetryType.Request:
      if (!isCustomDimOrAnyField(fieldName) && !(fieldName in KnownRequestColumns)) {
        throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Request.`);
      }
      break;
    case KnownTelemetryType.Dependency:
      if (!isCustomDimOrAnyField(fieldName) && !(fieldName in KnownDependencyColumns)) {
        throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Dependency.`);
      }
      break;
    case KnownTelemetryType.Exception:
      if (!isCustomDimOrAnyField(fieldName) && fieldName !== "Exception.Message" && fieldName !== "Exception.StackTrace") {
        throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Exception.`);
      }
      break;
    case KnownTelemetryType.Trace:
      if (!isCustomDimOrAnyField(fieldName) && fieldName !== "Message") {
        throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Trace.`);
      }
      break;
    default:
      throw new TelemetryTypeError(`'${telemetryType}' is not a supported telemetry type.`);
  }
}

function validatePredicateAndComparand(filter: FilterInfo): void {
  if (!(filter.predicate in KnownPredicateType)) {
    throw new UnexpectedFilterCreateError(`'${filter.predicate}' is not a valid predicate.`);
  } else if (filter.comparand === "") {
    throw new UnexpectedFilterCreateError('A filter must have a comparand.');
  } else if (filter.fieldName === "*" && !(filter.predicate === KnownPredicateType.Contains || filter.predicate === KnownPredicateType.DoesNotContain)) {
    throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '*'`);
  } else if (filter.fieldName === KnownDependencyColumns.ResultCode || filter.fieldName === KnownRequestColumns.ResponseCode || KnownDependencyColumns.Duration) {
    if (filter.predicate === KnownPredicateType.Contains || filter.predicate === KnownPredicateType.DoesNotContain) {
      throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'`);
    }
    // Duration comparand should be a timestamp; Response/ResultCode comparand should be interpreted as double.
    if (filter.fieldName === KnownDependencyColumns.Duration) {
      const date = new Date(filter.comparand);
      if (isNaN(date.getTime())) {
        throw new UnexpectedFilterCreateError(`The comparand '${filter.comparand}' can't be converted to a double.`);
      }
    } else if (isNaN(parseFloat(filter.comparand))) {
      throw new UnexpectedFilterCreateError(`The comparand '${filter.comparand}' can't be converted to a double.`);
    }
  } else if (!(filter.predicate === KnownPredicateType.Contains ||
    filter.predicate === KnownPredicateType.DoesNotContain ||
    filter.comparand === KnownPredicateType.Equal ||
    filter.comparand === KnownPredicateType.NotEqual)) {
    // if we are at this point, we are looking at a fieldName whose comparand should be interpreted as a string.
    // custom dimension comparands also fall into this category.
    throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'. If this is a custom dimension, it would be treated as string.`);
  }
}
