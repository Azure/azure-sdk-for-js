// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DerivedMetricInfo,
  FilterInfo,
  FilterConjunctionGroupInfo,
} from "../../../generated/index.js";
import { KnownPredicateType } from "../../../generated/index.js";
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

export class Filter {
  public renameExceptionFieldNamesForFiltering(
    filterConjunctionGroupInfo: FilterConjunctionGroupInfo,
  ): void {
    filterConjunctionGroupInfo.filters.forEach((filter) => {
      if (filter.fieldName.startsWith("Exception.")) {
        filter.fieldName = filter.fieldName.replace("Exception.", "");
      }
    });
  }

  public checkMetricFilters(derivedMetricInfo: DerivedMetricInfo, data: TelemetryData): boolean {
    if (derivedMetricInfo.filterGroups.length === 0) {
      // This should never happen - even when a user does not add filter pills to the derived metric,
      // the filterGroups array should have one filter group with an empty array of filters.
      return true;
    }
    // Haven't yet seen any case where there is more than one filter group in a derived metric info.
    // Just to be safe, handling the multiple filter conjunction group case as an or operation.
    let matched = false;
    derivedMetricInfo.filterGroups.forEach((filterConjunctionGroup) => {
      matched = matched || this.checkFilterConjunctionGroup(filterConjunctionGroup, data);
    });
    return matched;
  }

  public checkFilterConjunctionGroup(
    filterConjunctionGroupInfo: FilterConjunctionGroupInfo,
    data: TelemetryData,
  ): boolean {
    // All of the filters need to match for this to return true (and operation).
    for (const filter of filterConjunctionGroupInfo.filters) {
      if (!this.checkFilter(filter, data)) {
        return false;
      }
    }
    return true;
  }

  private checkFilter(filter: FilterInfo, data: TelemetryData): boolean {
    if (filter.fieldName === "*") {
      // Any field
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
      } else if (
        filter.fieldName === KnownDependencyColumns.ResultCode.toString() ||
        filter.fieldName === KnownRequestColumns.ResponseCode.toString() ||
        filter.fieldName === KnownDependencyColumns.Duration.toString()
      ) {
        const comparand: number =
          filter.fieldName === KnownDependencyColumns.Duration.toString()
            ? getMsFromFilterTimestampString(filter.comparand)
            : parseFloat(filter.comparand);
        switch (filter.predicate) {
          case KnownPredicateType.Equal.toString():
            return dataValue === comparand;
          case KnownPredicateType.NotEqual.toString():
            return dataValue !== comparand;
          case KnownPredicateType.GreaterThan.toString():
            return (dataValue as number) > comparand;
          case KnownPredicateType.GreaterThanOrEqual.toString():
            return (dataValue as number) >= comparand;
          case KnownPredicateType.LessThan.toString():
            return (dataValue as number) < comparand;
          case KnownPredicateType.LessThanOrEqual.toString():
            return (dataValue as number) <= comparand;
          default:
            return false;
        }
      } else {
        // string fields
        return this.stringCompare(dataValue as string, filter.comparand, filter.predicate);
      }
    }
    return false;
  }

  private checkAnyFieldFilter(filter: FilterInfo, data: TelemetryData): boolean {
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

  private checkCustomDimFilter(filter: FilterInfo, data: TelemetryData): boolean {
    const fieldName: string = filter.fieldName.replace("CustomDimensions.", "");
    let value: string | undefined;
    if (data.CustomDimensions.has(fieldName)) {
      value = data.CustomDimensions.get(fieldName) as string;
    } else {
      return false; // the asked for field is not present in the custom dimensions
    }
    return this.stringCompare(value, filter.comparand, filter.predicate);
  }

  private stringCompare(dataValue: string, comparand: string, predicate: string): boolean {
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
