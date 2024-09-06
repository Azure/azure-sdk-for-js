// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  DerivedMetricInfo,
  KnownTelemetryType,
  FilterInfo,
  KnownPredicateType,
  CollectionConfigurationError,
  FilterConjunctionGroupInfo,
  KnownAggregationType,
} from "../../generated";
import {
  RequestData,
  TelemetryData,
  DependencyData,
  ExceptionData,
  TraceData
} from "./types";
import {
  isRequestData,
  isDependencyData,
  isExceptionData,
  isTraceData,
  getMsFromFilterTimestampString,
} from "./utils";

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
export class MetricFailureToCreateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MetricFailureToCreateError";
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

const knownStringColumns = new Set<string>([KnownRequestColumns.Url, KnownRequestColumns.Name, KnownDependencyColumns.Target,
KnownDependencyColumns.Type, KnownDependencyColumns.Data, "Message", "Exception.Message", "Exception.StackTrace"]);

export class Validator {

  public static validateTelemetryType(derivedMetricInfo: DerivedMetricInfo): void {
    if (derivedMetricInfo.telemetryType === KnownTelemetryType.PerformanceCounter.toString()) {
      throw new TelemetryTypeError('The telemetry type PerformanceCounter was specified, but this distro does not send performance counters to quickpulse.');
    } else if (derivedMetricInfo.telemetryType === KnownTelemetryType.Event.toString()) {
      throw new TelemetryTypeError('The telemetry type Event was specified, but this telemetry type is not supported via OpenTelemetry.');
    } else if (derivedMetricInfo.telemetryType === KnownTelemetryType.Metric.toString()) {
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
      case KnownTelemetryType.Request.toString():
        if (!Validator.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownRequestColumns)) {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Request.`);
        }
        break;
      case KnownTelemetryType.Dependency.toString():
        if (!Validator.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownDependencyColumns)) {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Dependency.`);
        }
        break;
      case KnownTelemetryType.Exception.toString():
        if (!Validator.isCustomDimOrAnyField(fieldName) && fieldName !== "Exception.Message" && fieldName !== "Exception.StackTrace") {
          throw new UnexpectedFilterCreateError(`'${fieldName}' is not a valid field name for the telemetry type Exception.`);
        }
        break;
      case KnownTelemetryType.Trace.toString():
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
      throw new UnexpectedFilterCreateError(`A filter must have a comparand. FilterName: '${filter.fieldName}' Predicate: '${filter.predicate}' Comparand: '${filter.comparand}'`);
    } else if (filter.fieldName === "*" && !(filter.predicate === KnownPredicateType.Contains.toString() || filter.predicate === KnownPredicateType.DoesNotContain.toString())) {
      throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '*'`);
    } else if (filter.fieldName === KnownDependencyColumns.ResultCode.toString() || filter.fieldName === KnownRequestColumns.ResponseCode.toString() || filter.fieldName === KnownDependencyColumns.Duration.toString()) {
      if (filter.predicate === KnownPredicateType.Contains.toString() || filter.predicate === KnownPredicateType.DoesNotContain.toString()) {
        throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'`);
      }
      // Duration comparand should be a timestamp; Response/ResultCode comparand should be interpreted as double.
      if (filter.fieldName === KnownDependencyColumns.Duration.toString()) {
        if (isNaN(getMsFromFilterTimestampString(filter.comparand))) {
          throw new UnexpectedFilterCreateError(`The comparand '${filter.comparand}' can't be converted to a double (ms).`);
        }
      } else if (isNaN(parseFloat(filter.comparand))) {
        throw new UnexpectedFilterCreateError(`The comparand '${filter.comparand}' can't be converted to a double.`);
      }
    } else if (knownStringColumns.has(filter.fieldName) || filter.fieldName.startsWith("CustomDimensions.")) {
      if (filter.predicate === KnownPredicateType.GreaterThan.toString() ||
        filter.predicate === KnownPredicateType.GreaterThanOrEqual.toString() ||
        filter.predicate === KnownPredicateType.LessThan.toString() ||
        filter.predicate === KnownPredicateType.LessThanOrEqual.toString()) {
        throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'. If this is a custom dimension, it would be treated as string.`);
      }
    } else if (filter.fieldName === KnownRequestColumns.Success.toString()) {
      if (filter.predicate !== KnownPredicateType.Equal.toString() && filter.predicate !== KnownPredicateType.NotEqual.toString()) {
        throw new UnexpectedFilterCreateError(`The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'.`);
      }
      filter.comparand = filter.comparand.toLowerCase();
      if (filter.comparand !== "true" && filter.comparand !== "false") {
        throw new UnexpectedFilterCreateError(`The comparand '${filter.comparand}' is not a valid boolean value for the fieldName Success.`);
      }

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

export class Filter {

  public static renameExceptionFieldNamesForFiltering(filterConjunctionGroupInfo: FilterConjunctionGroupInfo): void {
    filterConjunctionGroupInfo.filters.forEach((filter) => {
      if (filter.fieldName.startsWith("Exception.")) {
        filter.fieldName = filter.fieldName.replace("Exception.", "");
      }
    });
  }

  public static checkMetricFilters(derivedMetricInfo: DerivedMetricInfo, data: TelemetryData): boolean {
    if (derivedMetricInfo.filterGroups.length === 0) {
      // This should never happen - even when a user does not add filter pills to the derived metric, 
      // the filterGroups array should have one filter group with an empty array of filters.
      return true;
    }
    // Haven't yet seen any case where there is more than one filter group in a derived metric info.
    // Just to be safe, handling the multiple filter conjunction group case as an or operation.
    let matched = false;
    derivedMetricInfo.filterGroups.forEach((filterConjunctionGroup) => {
      matched = matched || this.checkFilterConjunctionGroup(filterConjunctionGroup.filters, data);
    });
    return matched;
  }

  /* public static checkDocumentFilters(documentStreamInfo: DocumentStreamInfo, data: TelemetryData): boolean {
    return true; // to be implemented
  }*/

  private static checkFilterConjunctionGroup(filters: FilterInfo[], data: TelemetryData): boolean {
    // All of the filters need to match for this to return true (and operation).
    for (const filter of filters) {
      if (!this.checkFilter(filter, data)) {
        return false;
      }
    }
    return true;
  }

  private static checkFilter(filter: FilterInfo, data: TelemetryData): boolean {

    if (filter.fieldName === "*") { // Any field
      return this.checkAnyFieldFilter(filter, data);
    } else if (filter.fieldName.startsWith("CustomDimensions.")) {
      return this.checkCustomDimFilter(filter, data);
    } else {
      let dataValue: string | number | boolean | Map<string, string>;
      // use filter.fieldname to get the property of data to query
      if (isRequestData(data)) {
        dataValue = data[filter.fieldName as keyof RequestData];
      } else if (isDependencyData(data)) {
        dataValue = data[filter.fieldName as keyof DependencyData];
      } else if (isExceptionData(data)) {
        dataValue = data[filter.fieldName as keyof ExceptionData];
      } else if (isTraceData(data)) {
        dataValue = data[filter.fieldName as keyof TraceData];
      } else {
        return false; // should not reach here
      }

      if (filter.fieldName === KnownRequestColumns.Success.toString()) {
        if (filter.predicate === KnownPredicateType.Equal.toString()) {
          return dataValue === (filter.comparand.toLowerCase() === "true");
        } else if (filter.predicate === KnownPredicateType.NotEqual.toString()) {
          return dataValue !== (filter.comparand.toLowerCase() === "true");
        }
      } else if (filter.fieldName === KnownDependencyColumns.ResultCode.toString() ||
        filter.fieldName === KnownRequestColumns.ResponseCode.toString() ||
        filter.fieldName === KnownDependencyColumns.Duration.toString()) {
        const comparand: number = filter.fieldName === KnownDependencyColumns.Duration.toString() ?
          getMsFromFilterTimestampString(filter.comparand) : parseFloat(filter.comparand);
        switch (filter.predicate) {
          case KnownPredicateType.Equal.toString():
            return dataValue === comparand;
          case KnownPredicateType.NotEqual.toString():
            return dataValue !== comparand;
          case KnownPredicateType.GreaterThan.toString():
            return dataValue as number > comparand;
          case KnownPredicateType.GreaterThanOrEqual.toString():
            return dataValue as number >= comparand;
          case KnownPredicateType.LessThan.toString():
            return dataValue as number < comparand;
          case KnownPredicateType.LessThanOrEqual.toString():
            return dataValue as number <= comparand;
          default:
            return false;
        }
      } else { // string fields
        return this.stringCompare(dataValue as string, filter.comparand, filter.predicate);
      }
    }
    return false;
  }

  private static checkAnyFieldFilter(filter: FilterInfo, data: TelemetryData): boolean {
    const properties: string[] = Object.keys(data);
    // At this point, the only predicates possible to pass in are Contains and DoesNotContain
    // At config validation time the predicate is checked to be one of these two.
    for (const property of properties) {
      if (property === "CustomDimensions") {
        for (const value of data.CustomDimensions.values()) {
          if (this.stringCompare(value, filter.comparand, filter.predicate)) {
            return true;
          }
        }
      } else {
        // @ts-expect-error - data can be any type of telemetry data and we know property is a valid key
        const value: string = String(data[property]);
        if (this.stringCompare(value, filter.comparand, filter.predicate)) {
          return true;
        }
      }
    }
    return false;
  }

  private static checkCustomDimFilter(filter: FilterInfo, data: TelemetryData): boolean {
    const fieldName: string = filter.fieldName.replace("CustomDimensions.", "");
    let value: string | undefined;
    if (data.CustomDimensions.has(fieldName)) {
      value = data.CustomDimensions.get(fieldName) as string;
    } else {
      return false; // the asked for field is not present in the custom dimensions
    }
    return this.stringCompare(value, filter.comparand, filter.predicate);
  }

  private static stringCompare(dataValue: string, comparand: string, predicate: string): boolean {
    switch (predicate) {
      case KnownPredicateType.Equal.toString():
        return dataValue === comparand;
      case KnownPredicateType.NotEqual.toString():
        return dataValue !== comparand;
      case KnownPredicateType.Contains.toString(): {
        const lowerDataValue = dataValue.toLowerCase();
        const lowerComparand = comparand.toLowerCase();
        return lowerDataValue.includes(lowerComparand);
      }
      case KnownPredicateType.DoesNotContain.toString(): {
        const lowerDataValue = dataValue.toLowerCase();
        const lowerComparand = comparand.toLowerCase();
        return !lowerDataValue.includes(lowerComparand);
      }
      default:
        return false;
    }
  }
}

export class Projection {
  // contains the projections for all the derived metrics
  private projectionMap: Map<string, number>;
  // for calculation of avgs - key id, value [sum, count]
  private avgMap: Map<string, [number, number]>;

  // Whether the projection maps have been cleared/reset.
  // This is used when calculating min/max aggregations.
  // If maps were reset, then the min/max for the first telemetry item 
  // in a given 1s interval should be the value of the first telemetry item.
  private reset: boolean;

  constructor() {
    this.projectionMap = new Map<string, number>();
    this.avgMap = new Map<string, [number, number]>();
    this.reset = true;
  }

  // This method is intended to be called upon configuration change for every valid derivedMetricInfo.
  // This is so even when there are no telemetry items flowing in from the processor after the config has changed, we still
  // emit a value of 0 to quickpulse for the derived metric.
  public initDerivedMetricProjection(derivedMetricInfo: DerivedMetricInfo): void {
    this.projectionMap.set(derivedMetricInfo.id, 0);
    if (derivedMetricInfo.aggregation === KnownAggregationType.Avg.toString()) {
      this.avgMap.set(derivedMetricInfo.id, [0, 0]);
    }
    this.reset = true;
  }

  public calculateProjection(derivedMetricInfo: DerivedMetricInfo, data: TelemetryData): void {
    let incrementBy: number;
    if (derivedMetricInfo.projection === "Count()") {
      incrementBy = 1;
    } else if (derivedMetricInfo.projection === "Duration") {
      if (isRequestData(data) || isDependencyData(data)) {
        incrementBy = data.Duration;
      } else {
        throw new MetricFailureToCreateError('The projection Duration is not supported for the telemetry type Exception or Trace.');
      }
    } else if (derivedMetricInfo.projection.startsWith("CustomDimensions.")) {
      const customDimKey: string = derivedMetricInfo.projection.replace("CustomDimensions.", "");
      let customDimValue: number;
      if (data.CustomDimensions.has(customDimKey)) {
        const parsedValue = parseFloat(data.CustomDimensions.get(customDimKey) as string);
        if (isNaN(parsedValue)) {
          throw new MetricFailureToCreateError(`Could not calculate the projection because the custom dimension value '${data.CustomDimensions.get(customDimKey)}' for the dimension '${customDimKey}' is not a valid number.`);
        } else {
          customDimValue = parsedValue;
        }
      } else {
        throw new MetricFailureToCreateError(`Could not calculate the projection because the custom dimension '${customDimKey}' was not found in the telemetry data.`);
      }
      incrementBy = customDimValue;
    } else {
      throw new MetricFailureToCreateError(`The projection '${derivedMetricInfo.projection}' is not supported in this SDK.`);
    }

    const projection: number = this.calculateAggregation(derivedMetricInfo.aggregation, derivedMetricInfo.id, incrementBy);
    this.projectionMap.set(derivedMetricInfo.id, projection);
  }

  // This method is intended to be called every second when export() is called.
  public getMetricValues(): Map<string, number> {
    const result: Map<string, number> = new Map(this.projectionMap);
    this.resetProjectionValues();
    return result;
  }

  private resetProjectionValues(): void {
    for (const key of this.projectionMap.keys()) {
      this.projectionMap.set(key, 0);
    }

    for (const key of this.avgMap.keys()) {
      this.avgMap.set(key, [0, 0]);
    }
    this.reset = true;
  }

  // This method is intended to be called after upon config change or when we return to ping.
  public clearProjectionMaps(): void {
    this.projectionMap.clear();
    this.avgMap.clear();
    this.reset = true;
  }

  private calculateAggregation(aggregation: string, id: string, incrementBy: number): number {
    let prevValue: number;
    switch (aggregation) {
      case KnownAggregationType.Sum.toString():
        prevValue = this.projectionMap.get(id) as number;
        return prevValue + incrementBy;
      case KnownAggregationType.Min.toString():
        prevValue = this.reset ? Number.MAX_VALUE : this.projectionMap.get(id) as number;
        this.reset = false;
        return Math.min(prevValue, incrementBy);
      case KnownAggregationType.Max.toString():
        prevValue = this.reset ? Number.MIN_VALUE : this.projectionMap.get(id) as number;
        this.reset = false;
        return Math.max(prevValue, incrementBy);
      case KnownAggregationType.Avg.toString(): {
        const [prevSum, prevCount] = this.avgMap.get(id) as [number, number];
        this.avgMap.set(id, [prevSum + incrementBy, prevCount + 1]);
        return (prevSum + incrementBy) / (prevCount + 1);
      }
      default:
        throw new MetricFailureToCreateError(`The aggregation '${aggregation}' is not supported in this SDK.`);
    }
  }
}
