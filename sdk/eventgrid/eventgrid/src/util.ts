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
 * @param d The Date object to convert to a string.
 */
export function dateToServiceTimeString(d: Date): string {
  const month = d.getUTCMonth() + 1; // getUTCMonth returns 0-11 not 1-12.
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();

  const hour = d.getUTCHours() === 0 ? 12 : d.getUTCHours() % 12; // getUTCHours returns 0-23, and we want this in 12 hour format.
  const minute = d
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const second = d
    .getUTCSeconds()
    .toString()
    .padStart(2, "0");
  const am = d.getUTCHours() >= 13 ? "PM" : "AM";

  return `${month}/${day}/${year} ${hour}:${minute}:${second} ${am}`;
}

/**
 * Returns `true` if the credential object is like the KeyCredential interface (i.e. it has a
 * key property).
 *
 * @param credential the object to test
 */
export function isKeyCredentialLike(o: any): o is KeyCredential {
  return o.key !== undefined;
}

export function parseAndWrap(jsonStringOrObject: string | object): any[] {
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
