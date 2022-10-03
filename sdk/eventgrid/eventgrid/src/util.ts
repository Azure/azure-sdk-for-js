// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";

/**
 * Stringifies a Date object in the format expected by the Event Grid service, for use in a Shared Access Signiture.
 *
 * The service expects this time string to be in the same format as what is returned by the .NET DateTime.ToString
 * method, using the "en-US" culture.
 *
 * This corresponds to the .NET format string: "M/d/yyyy h:mm:ss tt".  For example, the date "June 5th, 2020, 12:09:03 PM"
 * is represented as the string "6/5/2020 12:09:03 PM"
 *
 * The service expects a UTC time, so this method returns a string based on the UTC time of the provided Date.
 *
 * @param d - The Date object to convert to a string.
 */
export function dateToServiceTimeString(d: Date): string {
  const month = d.getUTCMonth() + 1; // getUTCMonth returns 0-11 not 1-12.
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();

  const hour = d.getUTCHours() === 0 || d.getUTCHours() === 12 ? 12 : d.getUTCHours() % 12; // getUTCHours returns 0-23, and we want this in 12 hour format.
  const minute = d.getUTCMinutes().toString().padStart(2, "0");
  const second = d.getUTCSeconds().toString().padStart(2, "0");
  const am = d.getUTCHours() >= 12 ? "PM" : "AM";

  return `${month}/${day}/${year} ${hour}:${minute}:${second} ${am}`;
}

/**
 * Returns `true` if the credential object is like the KeyCredential interface (i.e. it has a
 * key property).
 *
 * @param credential - The object to test
 */
export function isKeyCredentialLike(o: unknown): o is KeyCredential {
  const castO = o as {
    key: unknown;
  };
  return castO.key !== undefined;
}

export function parseAndWrap(jsonStringOrObject: string | Record<string, unknown>): any[] {
  if (typeof jsonStringOrObject === "string") {
    const o = JSON.parse(jsonStringOrObject);
    if (Array.isArray(o)) {
      return o;
    } else {
      return [o];
    }
  }

  if (Array.isArray(jsonStringOrObject)) {
    return jsonStringOrObject;
  } else {
    return [jsonStringOrObject];
  }
}

const EVENT_GRID_SCHEMA_METADATA_VERSION = "1";

export function validateEventGridEvent(o: unknown): void {
  if (typeof o !== "object") {
    throw new TypeError("event is not an object");
  }

  const castO = o as {
    metadataVersion: unknown;
  };
  validateRequiredStringProperties(o, [
    "eventType",
    "eventTime",
    "id",
    "subject",
    "topic",
    "dataVersion",
    "metadataVersion",
  ]);

  validateRequiredAnyProperties(o, ["data"]);

  if (castO.metadataVersion !== EVENT_GRID_SCHEMA_METADATA_VERSION) {
    throw new TypeError("event is not in the Event Grid schema");
  }
}

const CLOUD_EVENT_1_0_SPEC_VERSION = "1.0";

export function validateCloudEventEvent(o: unknown): void {
  validateRequiredStringProperties(o, ["type", "source", "id", "specversion"]);
  validateOptionalStringProperties(o, ["time", "dataschema", "datacontenttype", "subject"]);

  if (typeof o !== "object") {
    throw new TypeError("event is not an object");
  }

  const castO = o as {
    specversion: unknown;
  };

  if (castO.specversion !== CLOUD_EVENT_1_0_SPEC_VERSION) {
    throw new Error("event is not in the Cloud Event 1.0 schema");
  }
}

function validateRequiredStringProperties(o: any, propertyNames: string[]): void {
  for (const propertyName of propertyNames) {
    if (typeof o[propertyName] === "undefined") {
      throw new Error(`event is missing required property '${propertyName}'`);
    }

    if (typeof o[propertyName] !== "string") {
      throw new TypeError(
        `event property '${propertyName} should be a 'string', but is '${typeof o[propertyName]}'`
      );
    }
  }
}

function validateRequiredAnyProperties(o: any, propertyNames: string[]): void {
  for (const propertyName of propertyNames) {
    if (typeof o[propertyName] === "undefined") {
      throw new Error(`event is missing required property '${propertyName}'`);
    }
  }
}

function validateOptionalStringProperties(o: any, propertyNames: string[]): void {
  for (const propertyName of propertyNames) {
    if (typeof o[propertyName] !== "undefined" && typeof o[propertyName] !== "string") {
      throw new TypeError(
        `event property '${propertyName}' should be a 'string' but it is a '${typeof o[
          propertyName
        ]}'`
      );
    }
  }
}
