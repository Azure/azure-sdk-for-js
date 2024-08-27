// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
}

/**
 * Helper TypeGuard that checks if something is a string or not.
 * @param thing - Anything
 * @internal
 */
export function isString(thing: unknown): thing is string {
  return typeof thing === "string" || thing instanceof String;
}

/**
 * @internal
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 */
export function getString(value: unknown, nameOfProperty: string): string {
  const result = getStringOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a string value and not undefined.`,
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getStringOrUndefined(value: any): string | undefined {
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
export function getInteger(value: unknown, nameOfProperty: string): number {
  const result = getIntegerOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a number value and not undefined.`,
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getIntegerOrUndefined(value: any): number | undefined {
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
export function getFloat(value: unknown, nameOfProperty: string): number {
  const result = getFloatOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a number value and not undefined.`,
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to retrieve `float` value from given string,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getFloatOrUndefined(value: any): number | undefined {
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
export function getDate(value: string, nameOfProperty: string): Date {
  const result = getDateOrUndefined(value);
  if (result === undefined) {
    throw new Error(
      `"${nameOfProperty}" received from service expected to be a Date value and not undefined.`,
    );
  }
  return result;
}

/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type,
 * or undefined if not passed in.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getDateOrUndefined(value: any): Date | undefined {
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
export function getTagsOrUndefined(value?: any): string[] | undefined {
  const result = getStringOrUndefined(value);
  if (result === undefined) {
    return undefined;
  }
  return result.split(",");
}

export type NullableRecord = Record<string, string | undefined>;
export type NonNullableRecord = Record<string, NonNullable<NullableRecord[string]>>;
