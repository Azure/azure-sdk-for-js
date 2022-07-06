// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
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
      `"${nameOfProperty}" received from service expected to be a string value and not undefined.`
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
      `"${nameOfProperty}" received from service expected to be a number value and not undefined.`
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
      `"${nameOfProperty}" received from service expected to be a number value and not undefined.`
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
      `"${nameOfProperty}" received from service expected to be a Date value and not undefined.`
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

/**
 * Marker for atom metadata.
 *
 * @internal
 */
export const XML_METADATA_MARKER = "$";

/**
 * Marker for atom value.
 *
 * @internal
 */
export const XML_VALUE_MARKER = "_";

/**
 * @internal
 * Helps in differentiating JSON like objects from other kinds of objects.
 */
const EMPTY_JSON_OBJECT_CONSTRUCTOR = {}.constructor;

/**
 * @internal
 * Returns `true` if given input is a JSON like object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isJSONLikeObject(value: any): boolean {
  // `value.constructor === {}.constructor` differentiates among the "object"s,
  //    would filter the JSON objects and won't match any array or other kinds of objects

  // -------------------------------------------------------------------------------
  // Few examples       | typeof obj ==="object" |  obj.constructor==={}.constructor
  // -------------------------------------------------------------------------------
  // {abc:1}            | true                   | true
  // ["a","b"]          | true                   | false
  // [{"a":1},{"b":2}]  | true                   | false
  // new Date()         | true                   | false
  // 123                | false                  | false
  // -------------------------------------------------------------------------------
  return typeof value === "object" && value.constructor === EMPTY_JSON_OBJECT_CONSTRUCTOR;
}

/**
 * @internal
 * The key-value pairs having undefined/null as the values would lead to the empty tags in the serialized XML request.
 * Empty tags in the request body is problematic because of the following reasons.
 * - ATOM based management operations throw a "Bad Request" error if empty tags are included in the XML request body at top level.
 * - At the inner levels, Service assigns the empty strings as values to the empty tags instead of throwing an error.
 *
 * This method recursively removes the key-value pairs with undefined/null as the values from the request object that is to be serialized.
 *
 */
export function sanitizeSerializableObject(resource: { [key: string]: any }): void {
  Object.keys(resource).forEach(function (property) {
    if (!isDefined(resource[property])) {
      delete resource[property];
    } else if (isJSONLikeObject(resource[property])) {
      sanitizeSerializableObject(resource[property]);
    }
  });
}

/**
 * @internal
 * Serializes input information to construct the Atom XML request
 * @param resourceName - Name of the resource to be serialized like `QueueDescription`
 * @param resource - The entity details
 * @returns An object to be serialized into a string.
 */
export function serializeToAtomXmlRequest(
  resourceName: string,
  resource: unknown
): Record<string, unknown> {
  const content: any = {};

  content[resourceName] = Object.assign({}, resource);
  sanitizeSerializableObject(content[resourceName]);

  content[resourceName][XML_METADATA_MARKER] = {
    xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
    "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
  };

  content[XML_METADATA_MARKER] = { type: "application/xml" };
  const requestDetails: Record<string, unknown> = {
    updated: new Date().toISOString(),
    content: content,
  };
  requestDetails[XML_METADATA_MARKER] = {
    xmlns: "http://www.w3.org/2005/Atom",
  };
  return requestDetails;
}
