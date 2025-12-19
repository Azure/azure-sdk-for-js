// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TelemetryTypeError, UnexpectedFilterCreateError } from "./quickpulseErrors.js";
import { KnownRequestColumns, KnownDependencyColumns } from "../types.js";
import type {
  DerivedMetricInfoOutput,
  FilterInfoOutput,
  DocumentFilterConjunctionGroupInfoOutput,
  FilterConjunctionGroupInfoOutput,
} from "../../../generated/index.js";
import { getMsFromFilterTimestampString } from "../utils.js";

const TelemetryType = {
  Request: "Request",
  Dependency: "Dependency",
  Exception: "Exception",
  Event: "Event",
  Metric: "Metric",
  PerformanceCounter: "PerformanceCounter",
  Trace: "Trace",
} as const;

const PredicateType = {
  Equal: "Equal",
  NotEqual: "NotEqual",
  LessThan: "LessThan",
  GreaterThan: "GreaterThan",
  LessThanOrEqual: "LessThanOrEqual",
  GreaterThanOrEqual: "GreaterThanOrEqual",
  Contains: "Contains",
  DoesNotContain: "DoesNotContain",
} as const;

const knownStringColumns = new Set<string>([
  KnownRequestColumns.Url,
  KnownRequestColumns.Name,
  KnownDependencyColumns.Target,
  KnownDependencyColumns.Type,
  KnownDependencyColumns.Data,
  "Message",
  "Exception.Message",
  "Exception.StackTrace",
]);

export class Validator {
  public validateTelemetryType(telemetryType: string): void {
    if (telemetryType === TelemetryType.PerformanceCounter) {
      throw new TelemetryTypeError(
        "The telemetry type PerformanceCounter was specified, but this distro does not send performance counters to quickpulse.",
      );
    } else if (telemetryType === TelemetryType.Event) {
      throw new TelemetryTypeError(
        "The telemetry type Event was specified, but this telemetry type is not supported via OpenTelemetry.",
      );
    } else if (telemetryType === TelemetryType.Metric) {
      throw new TelemetryTypeError(
        "The telemetry type Metric was specified, but this distro does not send custom live metrics to quickpulse.",
      );
    } else if (!(telemetryType in TelemetryType)) {
      throw new TelemetryTypeError(`'${telemetryType}' is not a valid telemetry type.`);
    }
  }

  public checkCustomMetricProjection(derivedMetricInfo: DerivedMetricInfoOutput): void {
    if (derivedMetricInfo.Projection.startsWith("CustomMetrics.")) {
      throw new UnexpectedFilterCreateError(
        "The Projection of a customMetric property is not supported via OpenTelemetry.",
      );
    }
  }

  public validateMetricFilters(derivedMetricInfo: DerivedMetricInfoOutput): void {
    derivedMetricInfo.FilterGroups.forEach((filterGroup) => {
      filterGroup.Filters.forEach((filter) => {
        this.validateFieldNames(filter.FieldName, derivedMetricInfo.TelemetryType);
        this.validatePredicateAndComparand(filter);
      });
    });
  }

  public validateDocumentFilters(
    documentFilterConjuctionGroupInfo: DocumentFilterConjunctionGroupInfoOutput,
  ): void {
    const filterConjunctionGroupInfo: FilterConjunctionGroupInfoOutput =
      documentFilterConjuctionGroupInfo.Filters;
    filterConjunctionGroupInfo.Filters.forEach((filter) => {
      this.validateFieldNames(filter.FieldName, documentFilterConjuctionGroupInfo.TelemetryType);
      this.validatePredicateAndComparand(filter);
    });
  }

  private isCustomDimOrAnyField(fieldName: string): boolean {
    return fieldName.startsWith("CustomDimensions.") || fieldName === "*";
  }

  private validateFieldNames(fieldName: string, telemetryType: string): void {
    if (fieldName === "") {
      throw new UnexpectedFilterCreateError("A filter must have a field name.");
    }
    if (fieldName.startsWith("CustomMetrics.")) {
      throw new UnexpectedFilterCreateError(
        "Filtering of a customMetric property is not supported via OpenTelemetry.",
      );
    }

    switch (telemetryType) {
      case TelemetryType.Request:
        if (!this.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownRequestColumns)) {
          throw new UnexpectedFilterCreateError(
            `'${fieldName}' is not a valid field name for the telemetry type Request.`,
          );
        }
        break;
      case TelemetryType.Dependency:
        if (!this.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownDependencyColumns)) {
          throw new UnexpectedFilterCreateError(
            `'${fieldName}' is not a valid field name for the telemetry type Dependency.`,
          );
        }
        break;
      case TelemetryType.Exception:
        if (
          !this.isCustomDimOrAnyField(fieldName) &&
          fieldName !== "Exception.Message" &&
          fieldName !== "Exception.StackTrace"
        ) {
          throw new UnexpectedFilterCreateError(
            `'${fieldName}' is not a valid field name for the telemetry type Exception.`,
          );
        }
        break;
      case TelemetryType.Trace:
        if (!this.isCustomDimOrAnyField(fieldName) && fieldName !== "Message") {
          throw new UnexpectedFilterCreateError(
            `'${fieldName}' is not a valid field name for the telemetry type Trace.`,
          );
        }
        break;
      default:
        throw new TelemetryTypeError(`'${telemetryType}' is not a supported telemetry type.`);
    }
  }

  private validatePredicateAndComparand(filter: FilterInfoOutput): void {
    if (!(filter.Predicate in PredicateType)) {
      throw new UnexpectedFilterCreateError(`'${filter.Predicate}' is not a valid predicate.`);
    } else if (filter.Comparand === "") {
      throw new UnexpectedFilterCreateError(
        `A filter must have a comparand. FilterName: '${filter.FieldName}' Predicate: '${filter.Predicate}' Comparand: '${filter.Comparand}'`,
      );
    } else if (
      filter.FieldName === "*" &&
      !(
        filter.Predicate === PredicateType.Contains || filter.Predicate === PredicateType.DoesNotContain
      )
    ) {
      throw new UnexpectedFilterCreateError(
        `The predicate '${filter.Predicate}' is not supported for the field name '*'`,
      );
    } else if (
      filter.FieldName === KnownDependencyColumns.ResultCode.toString() ||
      filter.FieldName === KnownRequestColumns.ResponseCode.toString() ||
      filter.FieldName === KnownDependencyColumns.Duration.toString()
    ) {
      if (
        filter.Predicate === PredicateType.Contains || filter.Predicate === PredicateType.DoesNotContain
      ) {
        throw new UnexpectedFilterCreateError(
          `The predicate '${filter.Predicate}' is not supported for the field name '${filter.FieldName}'`,
        );
      }
      // Duration comparand should be a timestamp; Response/ResultCode comparand should be interpreted as double.
      if (filter.FieldName === KnownDependencyColumns.Duration.toString()) {
        if (isNaN(getMsFromFilterTimestampString(filter.Comparand))) {
          throw new UnexpectedFilterCreateError(
            `The comparand '${filter.Comparand}' can't be converted to a double (ms).`,
          );
        }
      } else if (isNaN(parseFloat(filter.Comparand))) {
        throw new UnexpectedFilterCreateError(
          `The comparand '${filter.Comparand}' can't be converted to a double.`,
        );
      }
    } else if (
      knownStringColumns.has(filter.FieldName) ||
      filter.FieldName.startsWith("CustomDimensions.")
    ) {
      if (
        filter.Predicate === PredicateType.GreaterThan ||
        filter.Predicate === PredicateType.GreaterThanOrEqual ||
        filter.Predicate === PredicateType.LessThan ||
        filter.Predicate === PredicateType.LessThanOrEqual
      ) {
        throw new UnexpectedFilterCreateError(
          `The predicate '${filter.Predicate}' is not supported for the field name '${filter.FieldName}'. If this is a custom dimension, it would be treated as string.`,
        );
      }
    } else if (filter.FieldName === KnownRequestColumns.Success.toString()) {
      if (
        filter.Predicate !== PredicateType.Equal && filter.Predicate !== PredicateType.NotEqual
      ) {
        throw new UnexpectedFilterCreateError(
          `The predicate '${filter.Predicate}' is not supported for the field name '${filter.FieldName}'.`,
        );
      }
      filter.Comparand = filter.Comparand.toLowerCase();
      if (filter.Comparand !== "true" && filter.Comparand !== "false") {
        throw new UnexpectedFilterCreateError(
          `The comparand '${filter.Comparand}' is not a valid boolean value for the fieldName Success.`,
        );
      }
    }
  }
}
