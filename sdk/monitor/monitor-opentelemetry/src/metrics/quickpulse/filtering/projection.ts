// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DerivedMetricInfoOutput } from "../../../generated/index.js";
import type { TelemetryData } from "../types.js";
import { isRequestData, isDependencyData } from "../utils.js";
import { MetricFailureToCreateError } from "./quickpulseErrors.js";

const AggregationType = {
  Avg: "Avg",
  Sum: "Sum",
  Min: "Min",
  Max: "Max",
} as const;

export class Projection {
  // contains the projections for all the derived metrics. key id, value [metric value, aggregation type]
  private projectionMap: Map<string, [number, string]>;
  // for calculation of avgs - key id, value [sum, count]
  private avgMap: Map<string, [number, number]>;

  constructor() {
    this.projectionMap = new Map<string, [number, string]>();
    this.avgMap = new Map<string, [number, number]>();
  }

  // This method is intended to be called upon configuration change for every valid derivedMetricInfo.
  public initDerivedMetricProjection(derivedMetricInfo: DerivedMetricInfoOutput): void {
    if (derivedMetricInfo.Aggregation === AggregationType.Min) {
      // set to max value so that the value from the first telemetry item will always be less than it
      this.projectionMap.set(derivedMetricInfo.Id, [Number.MAX_VALUE, AggregationType.Min]);
    } else if (derivedMetricInfo.Aggregation === AggregationType.Max) {
      // set to min value so that the value from the first telemetry item will always be more than it
      this.projectionMap.set(derivedMetricInfo.Id, [Number.MIN_VALUE, AggregationType.Max]);
    } else if (derivedMetricInfo.Aggregation === AggregationType.Sum) {
      this.projectionMap.set(derivedMetricInfo.Id, [0, AggregationType.Sum]);
    } else {
      this.projectionMap.set(derivedMetricInfo.Id, [0, AggregationType.Avg]);
      this.avgMap.set(derivedMetricInfo.Id, [0, 0]);
    }
  }

  public calculateProjection(derivedMetricInfo: DerivedMetricInfoOutput, data: TelemetryData): void {
    let incrementBy: number;
    if (derivedMetricInfo.Projection === "Count()") {
      incrementBy = 1;
    } else if (derivedMetricInfo.Projection === "Duration") {
      if (isRequestData(data) || isDependencyData(data)) {
        incrementBy = data.Duration;
      } else {
        throw new MetricFailureToCreateError(
          "The projection Duration is not supported for the telemetry type Exception or Trace.",
        );
      }
    } else if (derivedMetricInfo.Projection.startsWith("CustomDimensions.")) {
      const customDimKey: string = derivedMetricInfo.Projection.replace("CustomDimensions.", "");
      let customDimValue: number;
      if (data.CustomDimensions.has(customDimKey)) {
        const parsedValue = parseFloat(data.CustomDimensions.get(customDimKey) as string);
        if (isNaN(parsedValue)) {
          throw new MetricFailureToCreateError(
            `Could not calculate the projection because the custom dimension value '${data.CustomDimensions.get(customDimKey)}' for the dimension '${customDimKey}' is not a valid number.`,
          );
        } else {
          customDimValue = parsedValue;
        }
      } else {
        throw new MetricFailureToCreateError(
          `Could not calculate the projection because the custom dimension '${customDimKey}' was not found in the telemetry data.`,
        );
      }
      incrementBy = customDimValue;
    } else {
      throw new MetricFailureToCreateError(
        `The projection '${derivedMetricInfo.Projection}' is not supported in this SDK.`,
      );
    }

    const projection: number = this.calculateAggregation(
      derivedMetricInfo.Aggregation,
      derivedMetricInfo.Id,
      incrementBy,
    );
    this.projectionMap.set(derivedMetricInfo.Id, [projection, derivedMetricInfo.Aggregation]);
  }

  // This method is intended to be called every second when export() is called.
  public getMetricValues(): Map<string, number> {
    const result: Map<string, number> = new Map();
    for (const [key, value] of this.projectionMap.entries()) {
      let projection: number;
      if (value[1] === AggregationType.Min) {
        projection = value[0] === Number.MAX_VALUE ? 0 : value[0];
        value[0] = Number.MAX_VALUE; // reset for next 1s interval
      } else if (value[1] === AggregationType.Max) {
        projection = value[0] === Number.MIN_VALUE ? 0 : value[0];
        value[0] = Number.MIN_VALUE; // reset for next 1s interval
      } else {
        projection = value[0];
        value[0] = 0; // reset for next 1s interval
        if (value[1] === AggregationType.Avg) {
          this.avgMap.set(key, [0, 0]); // reset for next 1s interval
        }
      }
      result.set(key, projection);
    }
    return result;
  }

  // This method is intended to be called after upon config change or when we return to ping.
  public clearProjectionMaps(): void {
    this.projectionMap.clear();
    this.avgMap.clear();
  }

  private calculateAggregation(aggregation: string, id: string, incrementBy: number): number {
    const prevValue: number = (this.projectionMap.get(id) as [number, string])[0];
    switch (aggregation) {
      case AggregationType.Sum:
        return prevValue + incrementBy;
      case AggregationType.Min:
        return Math.min(prevValue, incrementBy);
      case AggregationType.Max:
        return Math.max(prevValue, incrementBy);
      case AggregationType.Avg: {
        const [prevSum, prevCount] = this.avgMap.get(id) as [number, number];
        this.avgMap.set(id, [prevSum + incrementBy, prevCount + 1]);
        return (prevSum + incrementBy) / (prevCount + 1);
      }
      default:
        throw new MetricFailureToCreateError(
          `The aggregation '${aggregation}' is not supported in this SDK.`,
        );
    }
  }
}
