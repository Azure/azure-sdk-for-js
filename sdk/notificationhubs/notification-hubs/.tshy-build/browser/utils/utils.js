// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export function isDefined(thing) {
    return typeof thing !== "undefined" && thing !== null;
}
/**
 * Helper TypeGuard that checks if something is a string or not.
 * @param thing - Anything
 * @internal
 */
export function isString(thing) {
    return typeof thing === "string" || thing instanceof String;
}
/**
 * @internal
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 */
export function getString(value, nameOfProperty) {
    const result = getStringOrUndefined(value);
    if (result === undefined) {
        throw new Error(`"${nameOfProperty}" received from service expected to be a string value and not undefined.`);
    }
    return result;
}
/**
 * @internal
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getStringOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    return value.toString();
}
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or throws error if undefined.
 */
export function getInteger(value, nameOfProperty) {
    const result = getIntegerOrUndefined(value);
    if (result === undefined) {
        throw new Error(`"${nameOfProperty}" received from service expected to be a number value and not undefined.`);
    }
    return result;
}
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getIntegerOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    const result = parseInt(value.toString());
    return isNaN(result) ? undefined : result;
}
/**
 * @internal
 * Helper utility to retrieve `float` value from given string,
 * or throws error if undefined.
 */
export function getFloat(value, nameOfProperty) {
    const result = getFloatOrUndefined(value);
    if (result === undefined) {
        throw new Error(`"${nameOfProperty}" received from service expected to be a number value and not undefined.`);
    }
    return result;
}
/**
 * @internal
 * Helper utility to retrieve `float` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getFloatOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    const result = parseFloat(value.toString());
    return Number.isNaN(result) ? undefined : result;
}
/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type.
 */
export function getDate(value, nameOfProperty) {
    const result = getDateOrUndefined(value);
    if (result === undefined) {
        throw new Error(`"${nameOfProperty}" received from service expected to be a Date value and not undefined.`);
    }
    return result;
}
/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getDateOrUndefined(value) {
    const stringValue = getStringOrUndefined(value);
    if (stringValue === undefined) {
        return undefined;
    }
    const result = new Date(stringValue.toString());
    return Number.isNaN(+result) ? undefined : result;
}
/**
 * @internal
 * Helper utility to parse tags from a comma separated string.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getTagsOrUndefined(value) {
    const result = getStringOrUndefined(value);
    if (result === undefined) {
        return undefined;
    }
    return result.split(",");
}
//# sourceMappingURL=utils.js.map