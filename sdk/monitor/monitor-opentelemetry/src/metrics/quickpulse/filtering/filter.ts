// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DerivedMetricInfoOutput,
  FilterInfoOutput,
  FilterConjunctionGroupInfoOutput,
} from "../../../generated/index.js";
import type {
  RequestData,
  TelemetryData,
  DependencyData,
  ExceptionData,
  TraceData,
} from "../types.js";
import { KnownDependencyColumns, KnownRequestColumns } from "../types.js";
import {
  isRequestData,
  isDependencyData,
  isExceptionData,
  isTraceData,
  getMsFromFilterTimestampString,
} from "../utils.js";

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

export class Filter {
  public renameExceptionFieldNamesForFiltering(
    filterConjunctionGroupInfo: FilterConjunctionGroupInfoOutput,
  ): void {
    filterConjunctionGroupInfo.Filters.forEach((filter) => {
      if (filter.FieldName.startsWith("Exception.")) {
        filter.FieldName = filter.FieldName.replace("Exception.", "");
      }
    });
  }

  public checkMetricFilters(derivedMetricInfo: DerivedMetricInfoOutput, data: TelemetryData): boolean {
    if (derivedMetricInfo.FilterGroups.length === 0) {
      // This should never happen - even when a user does not add filter pills to the derived metric,
      // the filterGroups array should have one filter group with an empty array of filters.
      return true;
    }
    // Haven't yet seen any case where there is more than one filter group in a derived metric info.
    // Just to be safe, handling the multiple filter conjunction group case as an or operation.
    let matched = false;
    derivedMetricInfo.FilterGroups.forEach((filterConjunctionGroup) => {
      matched = matched || this.checkFilterConjunctionGroup(filterConjunctionGroup, data);
    });
    return matched;
  }

  public checkFilterConjunctionGroup(
    filterConjunctionGroupInfo: FilterConjunctionGroupInfoOutput,
    data: TelemetryData,
  ): boolean {
    // All of the filters need to match for this to return true (and operation).
    for (const filter of filterConjunctionGroupInfo.Filters) {
      if (!this.checkFilter(filter, data)) {
        return false;
      }
    }
    return true;
  }

  private checkFilter(filter: FilterInfoOutput, data: TelemetryData): boolean {
    if (filter.FieldName === "*") {
      // Any field
      return this.checkAnyFieldFilter(filter, data);
    } else if (filter.FieldName.startsWith("CustomDimensions.")) {
      return this.checkCustomDimFilter(filter, data);
    } else {
      let dataValue: string | number | boolean | Map<string, string>;
      // use filter.fieldname to get the property of data to query
      if (isRequestData(data)) {
        dataValue = data[filter.FieldName as keyof RequestData];
      } else if (isDependencyData(data)) {
        dataValue = data[filter.FieldName as keyof DependencyData];
      } else if (isExceptionData(data)) {
        dataValue = data[filter.FieldName as keyof ExceptionData];
      } else if (isTraceData(data)) {
        dataValue = data[filter.FieldName as keyof TraceData];
      } else {
        return false; // should not reach here
      }

      if (filter.FieldName === KnownRequestColumns.Success.toString()) {
        if (filter.Predicate === PredicateType.Equal) {
          return dataValue === (filter.Comparand.toLowerCase() === "true");
        } else if (filter.Predicate === PredicateType.NotEqual) {
          return dataValue !== (filter.Comparand.toLowerCase() === "true");
        }
      } else if (
        filter.FieldName === KnownDependencyColumns.ResultCode.toString() ||
        filter.FieldName === KnownRequestColumns.ResponseCode.toString() ||
        filter.FieldName === KnownDependencyColumns.Duration.toString()
      ) {
        const comparand: number =
          filter.FieldName === KnownDependencyColumns.Duration.toString()
            ? getMsFromFilterTimestampString(filter.Comparand)
            : parseFloat(filter.Comparand);
        switch (filter.Predicate) {
          case PredicateType.Equal:
            return dataValue === comparand;
          case PredicateType.NotEqual:
            return dataValue !== comparand;
          case PredicateType.GreaterThan:
            return (dataValue as number) > comparand;
          case PredicateType.GreaterThanOrEqual:
            return (dataValue as number) >= comparand;
          case PredicateType.LessThan:
            return (dataValue as number) < comparand;
          case PredicateType.LessThanOrEqual:
            return (dataValue as number) <= comparand;
          default:
            return false;
        }
      } else {
        // string fields
        return this.stringCompare(dataValue as string, filter.Comparand, filter.Predicate);
      }
    }
    return false;
  }

  private checkAnyFieldFilter(filter: FilterInfoOutput, data: TelemetryData): boolean {
    const properties: string[] = Object.keys(data);
    // At this point, the only predicates possible to pass in are Contains and DoesNotContain
    // At config validation time the predicate is checked to be one of these two.
    for (const property of properties) {
      if (property === "CustomDimensions") {
        for (const value of data.CustomDimensions.values()) {
          if (this.stringCompare(value, filter.Comparand, filter.Predicate)) {
            return true;
          }
        }
      } else {
        // @ts-expect-error - data can be any type of telemetry data and we know property is a valid key
        const value: string = String(data[property]);
        if (this.stringCompare(value, filter.Comparand, filter.Predicate)) {
          return true;
        }
      }
    }
    return false;
  }

  private checkCustomDimFilter(filter: FilterInfoOutput, data: TelemetryData): boolean {
    const fieldName: string = filter.FieldName.replace("CustomDimensions.", "");
    let value: string | undefined;
    if (data.CustomDimensions.has(fieldName)) {
      value = data.CustomDimensions.get(fieldName) as string;
    } else {
      return false; // the asked for field is not present in the custom dimensions
    }
    return this.stringCompare(value, filter.Comparand, filter.Predicate);
  }

  private stringCompare(dataValue: string, comparand: string, predicate: string): boolean {
    switch (predicate) {
      case PredicateType.Equal:
        return dataValue === comparand;
      case PredicateType.NotEqual:
        return dataValue !== comparand;
      case PredicateType.Contains: {
        const lowerDataValue = dataValue.toLowerCase();
        const lowerComparand = comparand.toLowerCase();
        return lowerDataValue.includes(lowerComparand);
      }
      case PredicateType.DoesNotContain: {
        const lowerDataValue = dataValue.toLowerCase();
        const lowerComparand = comparand.toLowerCase();
        return !lowerDataValue.includes(lowerComparand);
      }
      default:
        return false;
    }
  }
}
