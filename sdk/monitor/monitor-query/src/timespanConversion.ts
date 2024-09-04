// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryTimeInterval } from "./models/timeInterval";
import { isObjectWithProperties } from "@azure/core-util";

export function convertTimespanToInterval(timespan: QueryTimeInterval): string {
  if (isObjectWithProperties(timespan, ["startTime", "endTime", "duration"])) {
    throw new TypeError("Invalid Timespan - contains startTime, endTime, and duration.");
  }

  if (isObjectWithProperties(timespan, ["startTime", "endTime"])) {
    return `${(timespan as any).startTime.toISOString()}/${(
      timespan as any
    ).endTime.toISOString()}`;
  } else if (isObjectWithProperties(timespan, ["startTime", "duration"])) {
    return `${(timespan as any).startTime.toISOString()}/${(timespan as any).duration}`;
  } else if (isObjectWithProperties(timespan, ["duration", "endTime"])) {
    return `${timespan.duration}/${(timespan as any).endTime.toISOString()}`;
  } else if (isObjectWithProperties(timespan, ["duration"])) {
    return timespan.duration;
  }

  throw new TypeError("Invalid Timespan - no valid fields assigned.");
}

export function convertIntervalToTimeIntervalObject(timespan: string): QueryTimeInterval {
  if (timespan.includes("/")) {
    const intervalUnits: string[] = timespan.split("/");
    if (Date.parse(intervalUnits[0]) && Date.parse(intervalUnits[1])) {
      return { startTime: new Date(intervalUnits[0]), endTime: new Date(intervalUnits[1]) };
    } else if (Date.parse(intervalUnits[0]) && !Date.parse(intervalUnits[1])) {
      return { startTime: new Date(intervalUnits[0]), duration: intervalUnits[1] };
    } else if (!Date.parse(intervalUnits[0]) && Date.parse(intervalUnits[1])) {
      return { duration: intervalUnits[0], endTime: new Date(intervalUnits[1]) };
    } else {
      return { duration: timespan };
    }
  } else {
    return { duration: timespan };
  }
}
/**
 * Helper TypeGuard that checks if the input is an object with the specified property.
 * Note: The property may be inherited.
 * @param thing - Any object.
 * @param property - The name of the property that should appear in the object.
 * @internal
 */
export function objectHasProperty<Thing, PropertyName extends string>(
  thing: Thing,
  property: PropertyName,
): thing is Extract<Thing, Record<PropertyName, unknown>> {
  return typeof thing === "object" && property in (thing as Record<string, unknown>);
}

/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
}
