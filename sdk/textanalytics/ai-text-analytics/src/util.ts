// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalyticsError } from "./generated/models";

import { logger } from "./logger";
import { RestError } from "@azure/core-http";

export interface IdObject {
  id: string;
}

function isGenericError(o: IdObject): o is IdObject & { error: TextAnalyticsError } {
  return o.id === "";
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 *
 * If a generic error (id = "") occurred in the response, this function will throw it
 * as an exception.
 *
 * @ignore
 * @param sortedArray An array of entries sorted by `id`
 * @param unsortedArray An array of entries that contain `id` but are not sorted
 */
export function sortResponseIdObjects<T extends IdObject, U extends IdObject>(
  sortedArray: T[],
  unsortedArray: U[]
): U[] {
  const unsortedMap = new Map<string, U>();
  for (const item of unsortedArray) {
    if (isGenericError(item)) {
      throw new RestError(item.error.message, item.error.code, 400);
    }
    unsortedMap.set(item.id, item);
  }

  if (unsortedArray.length !== sortedArray.length) {
    const ordinal = unsortedArray.length > sortedArray.length ? "more" : "fewer";
    logger.warning(
      `The service returned ${ordinal} responses than inputs. Some errors may be treated as fatal.`
    );
  }

  return sortedArray.map((item) => unsortedMap.get(item.id)!);
}

/**
 * Performs escape-sequence decoding of JSON-pointer text
 */
function decodeFragment(encoded: string): string {
  let decoded: string = "";

  let escaped: boolean = false;

  for (const c of encoded) {
    if (escaped) {
      switch (c) {
        case "0":
          decoded += "~";
          break;
        case "1":
          decoded += "/";
          break;
        default:
          throw new Error(
            `Invalid pointer syntax: unknown escape sequence '~${c}' in "${encoded}"`
          );
      }
      escaped = false;
    } else {
      if (c === "~") {
        escaped = true;
      } else {
        decoded += c;
      }
    }
  }

  return decoded;
}

/**

 * Generates the decoded key values

 */

function* pathFragments(rawPath: string): Generator<string> {
  const path = rawPath.startsWith("#") ? decodeURIComponent(rawPath.slice(1)) : rawPath;

  if (path && !path.startsWith("/")) {
    throw new Error(`Invalid pointer syntax: "${path}" does not start with /`);
  }

  for (const component of path.split("/").slice(1)) {
    yield decodeFragment(component);
  }
}

/**
 * JSON pointer dereferencing algorithm in JavaScript value space.
 *
 * Resolves the object referenced by `path` relative to the `root`
 * object.
 *
 * Implemented according to the specification in IETF RFC 6901.
 *
 * If the path begins with #, then it is treated as possibly URL-encded
 * and is decoded first before usage. Otherwise, URL-encoded characters
 * are _not_ decoded and are processed literally.
 *
 * @param root an object representing the root object of the resolution
 *             chain, created by parsing an RFC 7159 JSON document.
 * @param path the JavaScript value of a parsed RFC 6901 compliant
 *             JSON pointer
 */

export function dereferenceJsonPointer(root: any, path: string): unknown {
  let cursor: any = root;

  for (const fragment of pathFragments(path)) {
    // RFC specifies we have to validate this

    if (
      typeof cursor !== "object" ||
      cursor === null ||
      (Array.isArray(cursor) && !/(0|[1-9][0-9]+)/.test(fragment)) ||
      !Object.prototype.hasOwnProperty.call(cursor, fragment)
    ) {
      throw new Error(`Pointer "${path}" references non-existent value: ${fragment}`);
    }

    cursor = cursor[fragment];
  }

  return cursor;
}
