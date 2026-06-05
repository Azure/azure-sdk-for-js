// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TelemetryTypeError, UnexpectedFilterCreateError } from "./quickpulseErrors.js";
import { KnownRequestColumns, KnownDependencyColumns } from "../types.js";
import type {
  DerivedMetricInfo,
  FilterInfo,
  DocumentFilterConjunctionGroupInfo,
  FilterConjunctionGroupInfo,
} from "../../../generated/index.js";
import { getMsFromFilterTimestampString } from "../utils.js";

/** Valid telemetry types for validation */
const validTelemetryTypes = new Set([
  "Request",
  "Dependency",
  "Exception",
  "Event",
  "Metric",
  "PerformanceCounter",
  "Trace",
]);

/** Valid predicate types for validation */
const validPredicateTypes = new Set([
  "Equal",
  "NotEqual",
  "LessThan",
  "GreaterThan",
  "LessThanOrEqual",
  "GreaterThanOrEqual",
  "Contains",
  "DoesNotContain",
]);

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
    if (telemetryType === "PerformanceCounter") {
      throw new TelemetryTypeError(
        "The telemetry type PerformanceCounter was specified, but this distro does not send performance counters to quickpulse.",
      );
    } else if (telemetryType === "Event") {
      throw new TelemetryTypeError(
        "The telemetry type Event was specified, but this telemetry type is not supported via OpenTelemetry.",
      );
    } else if (telemetryType === "Metric") {
      throw new TelemetryTypeError(
        "The telemetry type Metric was specified, but this distro does not send custom live metrics to quickpulse.",
      );
    } else if (!validTelemetryTypes.has(telemetryType)) {
      throw new TelemetryTypeError(`'${telemetryType}' is not a valid telemetry type.`);
    }
  }

  public checkCustomMetricProjection(derivedMetricInfo: DerivedMetricInfo): void {
    if (derivedMetricInfo.projection.startsWith("CustomMetrics.")) {
      throw new UnexpectedFilterCreateError(
        "The Projection of a customMetric property is not supported via OpenTelemetry.",
      );
    }
  }

  public validateMetricFilters(derivedMetricInfo: DerivedMetricInfo): void {
    derivedMetricInfo.filterGroups.forEach((filterGroup) => {
      filterGroup.filters.forEach((filter) => {
        this.validateFieldNames(filter.fieldName, derivedMetricInfo.telemetryType);
        this.validatePredicateAndComparand(filter);
      });
    });
  }

  public validateDocumentFilters(
    documentFilterConjuctionGroupInfo: DocumentFilterConjunctionGroupInfo,
  ): void {
    const filterConjunctionGroupInfo: FilterConjunctionGroupInfo =
      documentFilterConjuctionGroupInfo.filters;
    filterConjunctionGroupInfo.filters.forEach((filter) => {
      this.validateFieldNames(filter.fieldName, documentFilterConjuctionGroupInfo.telemetryType);
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
      case "Request":
        if (!this.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownRequestColumns)) {
          throw new UnexpectedFilterCreateError(
            `'${fieldName}' is not a valid field name for the telemetry type Request.`,
          );
        }
        break;
      case "Dependency":
        if (!this.isCustomDimOrAnyField(fieldName) && !(fieldName in KnownDependencyColumns)) {
          throw new UnexpectedFilterCreateError(
            `'${fieldName}' is not a valid field name for the telemetry type Dependency.`,
          );
        }
        break;
      case "Exception":
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
      case "Trace":
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

  private validatePredicateAndComparand(filter: FilterInfo): void {
    if (!validPredicateTypes.has(filter.predicate)) {
      throw new UnexpectedFilterCreateError(`'${filter.predicate}' is not a valid predicate.`);
    } else if (filter.comparand === "") {
      throw new UnexpectedFilterCreateError(
        `A filter must have a comparand. FilterName: '${filter.fieldName}' Predicate: '${filter.predicate}' Comparand: '${filter.comparand}'`,
      );
    } else if (
      filter.fieldName === "*" &&
      !(filter.predicate === "Contains" || filter.predicate === "DoesNotContain")
    ) {
      throw new UnexpectedFilterCreateError(
        `The predicate '${filter.predicate}' is not supported for the field name '*'`,
      );
    } else if (
      filter.fieldName === KnownDependencyColumns.ResultCode.toString() ||
      filter.fieldName === KnownRequestColumns.ResponseCode.toString() ||
      filter.fieldName === KnownDependencyColumns.Duration.toString()
    ) {
      if (filter.predicate === "Contains" || filter.predicate === "DoesNotContain") {
        throw new UnexpectedFilterCreateError(
          `The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'`,
        );
      }
      // Duration comparand should be a timestamp; Response/ResultCode comparand should be interpreted as double.
      if (filter.fieldName === KnownDependencyColumns.Duration.toString()) {
        if (isNaN(getMsFromFilterTimestampString(filter.comparand))) {
          throw new UnexpectedFilterCreateError(
            `The comparand '${filter.comparand}' can't be converted to a double (ms).`,
          );
        }
      } else if (isNaN(parseFloat(filter.comparand))) {
        throw new UnexpectedFilterCreateError(
          `The comparand '${filter.comparand}' can't be converted to a double.`,
        );
      }
    } else if (
      knownStringColumns.has(filter.fieldName) ||
      filter.fieldName.startsWith("CustomDimensions.")
    ) {
      if (
        filter.predicate === "GreaterThan" ||
        filter.predicate === "GreaterThanOrEqual" ||
        filter.predicate === "LessThan" ||
        filter.predicate === "LessThanOrEqual"
      ) {
        throw new UnexpectedFilterCreateError(
          `The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'. If this is a custom dimension, it would be treated as string.`,
        );
      }
    } else if (filter.fieldName === KnownRequestColumns.Success.toString()) {
      if (filter.predicate !== "Equal" && filter.predicate !== "NotEqual") {
        throw new UnexpectedFilterCreateError(
          `The predicate '${filter.predicate}' is not supported for the field name '${filter.fieldName}'.`,
        );
      }
      filter.comparand = filter.comparand.toLowerCase();
      if (filter.comparand !== "true" && filter.comparand !== "false") {
        throw new UnexpectedFilterCreateError(
          `The comparand '${filter.comparand}' is not a valid boolean value for the fieldName Success.`,
        );
      }
    }
  }
}
