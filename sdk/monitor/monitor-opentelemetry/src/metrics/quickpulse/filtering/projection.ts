// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DerivedMetricInfo } from "../../../generated/index.js";
import type { TelemetryData } from "../types.js";
import { isRequestData, isDependencyData } from "../utils.js";
import { MetricFailureToCreateError } from "./quickpulseErrors.js";

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
  public initDerivedMetricProjection(derivedMetricInfo: DerivedMetricInfo): void {
    if (derivedMetricInfo.aggregation === "Min") {
      // set to max value so that the value from the first telemetry item will always be less than it
      this.projectionMap.set(derivedMetricInfo.id, [Number.MAX_VALUE, "Min"]);
    } else if (derivedMetricInfo.aggregation === "Max") {
      // set to min value so that the value from the first telemetry item will always be more than it
      this.projectionMap.set(derivedMetricInfo.id, [Number.MIN_VALUE, "Max"]);
    } else if (derivedMetricInfo.aggregation === "Sum") {
      this.projectionMap.set(derivedMetricInfo.id, [0, "Sum"]);
    } else {
      this.projectionMap.set(derivedMetricInfo.id, [0, "Avg"]);
      this.avgMap.set(derivedMetricInfo.id, [0, 0]);
    }
  }

  public calculateProjection(derivedMetricInfo: DerivedMetricInfo, data: TelemetryData): void {
    let incrementBy: number;
    if (derivedMetricInfo.projection === "Count()") {
      incrementBy = 1;
    } else if (derivedMetricInfo.projection === "Duration") {
      if (isRequestData(data) || isDependencyData(data)) {
        incrementBy = data.Duration;
      } else {
        throw new MetricFailureToCreateError(
          "The projection Duration is not supported for the telemetry type Exception or Trace.",
        );
      }
    } else if (derivedMetricInfo.projection.startsWith("CustomDimensions.")) {
      const customDimKey: string = derivedMetricInfo.projection.replace("CustomDimensions.", "");
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
        `The projection '${derivedMetricInfo.projection}' is not supported in this SDK.`,
      );
    }

    const projection: number = this.calculateAggregation(
      derivedMetricInfo.aggregation,
      derivedMetricInfo.id,
      incrementBy,
    );
    this.projectionMap.set(derivedMetricInfo.id, [projection, derivedMetricInfo.aggregation]);
  }

  // This method is intended to be called every second when export() is called.
  public getMetricValues(): Map<string, number> {
    const result: Map<string, number> = new Map();
    for (const [key, value] of this.projectionMap.entries()) {
      let projection: number;
      if (value[1] === "Min") {
        projection = value[0] === Number.MAX_VALUE ? 0 : value[0];
        value[0] = Number.MAX_VALUE; // reset for next 1s interval
      } else if (value[1] === "Max") {
        projection = value[0] === Number.MIN_VALUE ? 0 : value[0];
        value[0] = Number.MIN_VALUE; // reset for next 1s interval
      } else {
        projection = value[0];
        value[0] = 0; // reset for next 1s interval
        if (value[1] === "Avg") {
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
      case "Sum":
        return prevValue + incrementBy;
      case "Min":
        return Math.min(prevValue, incrementBy);
      case "Max":
        return Math.max(prevValue, incrementBy);
      case "Avg": {
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
