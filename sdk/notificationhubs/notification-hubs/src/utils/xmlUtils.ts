// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isDefined } from "./utils.js";
import { parseXML } from "@azure/core-xml";

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
  resource: unknown,
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

/**
 * @internal
 * Parses the XML message from a Notification Hubs response
 * @param bodyText - The HTTP response body.
 * @returns The notification details if any from the XML.
 */
export async function parseXMLError(bodyText: string): Promise<string | undefined> {
  if (!bodyText) {
    return;
  }

  let result: string | undefined;
  try {
    const xmlError = await parseXML(bodyText, { includeRoot: true });
    if (
      Object.hasOwnProperty.call(xmlError, "Error") &&
      Object.hasOwnProperty.call(xmlError["Error"], "Detail")
    ) {
      return xmlError["Error"]["Detail"];
    }
  } catch (err) {
    // nothing to do
  }

  return result;
}
