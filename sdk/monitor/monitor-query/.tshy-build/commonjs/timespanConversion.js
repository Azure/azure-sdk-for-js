"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimespanToInterval = convertTimespanToInterval;
exports.convertIntervalToTimeIntervalObject = convertIntervalToTimeIntervalObject;
exports.objectHasProperty = objectHasProperty;
exports.isDefined = isDefined;
const core_util_1 = require("@azure/core-util");
function convertTimespanToInterval(timespan) {
    if ((0, core_util_1.isObjectWithProperties)(timespan, ["startTime", "endTime", "duration"])) {
        throw new TypeError("Invalid Timespan - contains startTime, endTime, and duration.");
    }
    if ((0, core_util_1.isObjectWithProperties)(timespan, ["startTime", "endTime"])) {
        return `${timespan.startTime.toISOString()}/${timespan.endTime.toISOString()}`;
    }
    else if ((0, core_util_1.isObjectWithProperties)(timespan, ["startTime", "duration"])) {
        return `${timespan.startTime.toISOString()}/${timespan.duration}`;
    }
    else if ((0, core_util_1.isObjectWithProperties)(timespan, ["duration", "endTime"])) {
        return `${timespan.duration}/${timespan.endTime.toISOString()}`;
    }
    else if ((0, core_util_1.isObjectWithProperties)(timespan, ["duration"])) {
        return timespan.duration;
    }
    throw new TypeError("Invalid Timespan - no valid fields assigned.");
}
function convertIntervalToTimeIntervalObject(timespan) {
    if (timespan.includes("/")) {
        const intervalUnits = timespan.split("/");
        if (Date.parse(intervalUnits[0]) && Date.parse(intervalUnits[1])) {
            return { startTime: new Date(intervalUnits[0]), endTime: new Date(intervalUnits[1]) };
        }
        else if (Date.parse(intervalUnits[0]) && !Date.parse(intervalUnits[1])) {
            return { startTime: new Date(intervalUnits[0]), duration: intervalUnits[1] };
        }
        else if (!Date.parse(intervalUnits[0]) && Date.parse(intervalUnits[1])) {
            return { duration: intervalUnits[0], endTime: new Date(intervalUnits[1]) };
        }
        else {
            return { duration: timespan };
        }
    }
    else {
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
function objectHasProperty(thing, property) {
    return typeof thing === "object" && property in thing;
}
/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
function isDefined(thing) {
    return typeof thing !== "undefined" && thing !== null;
}
//# sourceMappingURL=timespanConversion.js.map