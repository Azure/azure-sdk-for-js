// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryTimeInterval } from "./../models/index.js";
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
