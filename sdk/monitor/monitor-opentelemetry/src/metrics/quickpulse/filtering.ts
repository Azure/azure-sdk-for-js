import {
  DerivedMetricInfo,
  KnownTelemetryType,
  FilterInfo,
  KnownPredicateType,
  CollectionConfigurationError,
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

export class DuplicateMetricIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateMetricIdError";
  }
}

export enum KnownRequestColumns {
  Url = "Url",
  Duration = "Duration",
  ResponseCode = "ResponseCode",
  Success = "Success",
  Name = "Name",
}

export enum KnownDependencyColumns {
  Target = "Target",
  Duration = "Duration",
  Success = "Success",
  Name = "Name",
  ResultCode = "ResultCode",
  Type = "Type",
  Data = "Data",
}

export class Validator {

  public static validateTelemetryType(derivedMetricInfo: DerivedMetricInfo): void {
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

  public static checkCustomMetricProjection(derivedMetricInfo: DerivedMetricInfo): void {
    if (derivedMetricInfo.projection.startsWith("CustomMetrics.")) {
      throw new UnexpectedFilterCreateError('The Projection of a customMetric property is not supported via OpenTelemetry.');
    }
  }

  public static validateFilters(derivedMetricInfo: DerivedMetricInfo): void {
    derivedMetricInfo.filterGroups.forEach((filterGroup) => {
      filterGroup.filters.forEach((filter) => {
        Validator.validateFieldNames(filter.fieldName, derivedMetricInfo.telemetryType);
        Validator.validatePredicateAndComparand(filter);
      })
    });
  }

  private static isCustomDimOrAnyField(fieldName: string): boolean {
    return fieldName.startsWith("CustomDimensions.") || fieldName === "*";
  }

  private static validateFieldNames(fieldName: string, telemetryType: string): void {
    if (fieldName === "") {
      throw new UnexpectedFilterCreateError('A filter must have a field name.');
    }
    if (fieldName.startsWith("CustomMetrics.")) {
      throw new UnexpectedFilterCreateError('Filtering of a customMetric property is not supported via OpenTelemetry.');
    }

    switch (telemetryType) {
      case KnownTelemetryType.Request:
        if (!Validator.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownRequestColumns)) {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Request.`);
        }
        break;
      case KnownTelemetryType.Dependency:
        if (!Validator.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownDependencyColumns)) {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Dependency.`);
        }
        break;
      case KnownTelemetryType.Exception:
        if (!Validator.isCustomDimOrAnyField(fieldName) && fieldName !== "Exception.Message" && fieldName !== "Exception.StackTrace") {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Exception.`);
        }
        break;
      case KnownTelemetryType.Trace:
        if (!Validator.isCustomDimOrAnyField(fieldName) && fieldName !== "Message") {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Trace.`);
        }
        break;
      default:
        throw new TelemetryTypeError(`'${telemetryType}' is not a supported telemetry type.`);
    }
  }

  private static validatePredicateAndComparand(filter: FilterInfo): void {
    if (!(filter.predicate in KnownPredicateType)) {
      throw new UnexpectedFilterCreateError(`'${filter.predicate}' is not a valid predicate.`);
    } else if (filter.comparand === "") {
      throw new UnexpectedFilterCreateError('A filter must have a comparand.');
    } else if (filter.fieldName === "*" && !(filter.predicate === KnownPredicateType.Contains || filter.predicate === KnownPredicateType.DoesNotContain)) {
      throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '*'`);
    } else if (filter.fieldName === KnownDependencyColumns.ResultCode || filter.fieldName === KnownRequestColumns.ResponseCode || filter.fieldName === KnownDependencyColumns.Duration) {
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

}




export class CollectionConfigurationErrorTracker {


  /**
   * This list represents the errors that are found when the response from a ping or post is initially parsed.
   * The errors in this list are expected to stay the same across multiple post requests of the same configuration
   * id, and so will only be changed when a new configuration gets parsed.
   */
  private validationTimeErrors: CollectionConfigurationError[] = [];
  /**
   * This list represents errors that can't be caught while parsing the response - such as validation errors that would occur when 
   * analyzing customDimensions present in incoming spans/logs, or when creating a projection. These errors aren't expected to be the
   * same across post requests of the same configuration id and so is expected to be regenerated for every post request.
   */
  private runTimeErrors: CollectionConfigurationError[] = [];

  constructor() {
    this.validationTimeErrors = [];
    this.runTimeErrors = [];
  }

  public addValidationError(error: CollectionConfigurationError): void {
    this.validationTimeErrors.push(error);
  }

  public addRunTimeError(error: CollectionConfigurationError): void {
    this.runTimeErrors.push(error);
  }

  public getErrors(): CollectionConfigurationError[] {
    return this.validationTimeErrors.concat(this.runTimeErrors);
  }

  public clearRunTimeErrors(): void {
    this.runTimeErrors = [];
  }

  public clearValidationTimeErrors(): void {
    this.validationTimeErrors = [];
  }
}
