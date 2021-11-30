// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QueryTimeInterval } from "./models/timeInterval";

export function convertTimespanToInterval(timespan: QueryTimeInterval): string {
  if (isObjectWithProperties(timespan, ["startTime", "endTime", "duration"])) {
    throw new TypeError("Invalid Timespan - contains startTime, endTime, and duration.");
  }

  if (isObjectWithProperties(timespan, ["startTime", "endTime"])) {
    return `${timespan.startTime.toISOString()}/${timespan.endTime.toISOString()}`;
  } else if (isObjectWithProperties(timespan, ["startTime", "duration"])) {
    return `${timespan.startTime.toISOString()}/${timespan.duration}`;
  } else if (isObjectWithProperties(timespan, ["duration", "endTime"])) {
    return `${timespan.duration}/${timespan.endTime.toISOString()}`;
  } else if (isObjectWithProperties(timespan, ["duration"])) {
    return timespan.duration;
  }

  throw new TypeError("Invalid Timespan - no valid fields assigned.");
}

export function convertIntervalToTimeIntervalObject(timespan: string): QueryTimeInterval {
  if (timespan.includes("/")) {
    const intervalUnits: string[] = timespan.split("/");
    if (Date.parse(intervalUnits[0]) && Date.parse(intervalUnits[2])) {
      return { startTime: new Date(intervalUnits[0]), endTime: new Date(intervalUnits[2]) };
    } else if (Date.parse(intervalUnits[0]) && !Date.parse(intervalUnits[2])) {
      return { startTime: new Date(intervalUnits[0]), duration: intervalUnits[2] };
    } else if (!Date.parse(intervalUnits[0]) && Date.parse(intervalUnits[2])) {
      return { duration: intervalUnits[0], endTime: new Date(intervalUnits[2]) };
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
export function objectHasProperty<Thing extends unknown, PropertyName extends string>(
  thing: Thing,
  property: PropertyName
): thing is Thing & Record<PropertyName, unknown> {
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

/**
 * Helper TypeGuard that checks if the input is an object with the specified properties.
 * Note: The properties may be inherited.
 * @param thing - Anything.
 * @param properties - The name of the properties that should appear in the object.
 * @internal
 */
export function isObjectWithProperties<Thing extends unknown, PropertyName extends string>(
  thing: Thing,
  properties: PropertyName[]
): thing is Thing & Record<PropertyName, unknown> {
  if (!isDefined(thing) || typeof thing !== "object") {
    return false;
  }

  for (const property of properties) {
    if (!objectHasProperty(thing, property)) {
      return false;
    }
  }

  return true;
}
