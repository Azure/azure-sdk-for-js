// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FormDataMap } from "../interfaces";

/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 * @internal
 */
export const isNode =
  typeof process !== "undefined" && Boolean(process.version) && Boolean(process.versions?.node);

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @internal
 * @param t - The number of milliseconds to be delayed.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @returns Resolved promise
 */
export function delay<T>(t: number, value?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

/**
 * Returns a random integer value between a lower and upper bound,
 * inclusive of both bounds.
 * Note that this uses Math.random and isn't secure. If you need to use
 * this for any kind of security purpose, find a better source of random.
 * @param min - The smallest integer value allowed.
 * @param max - The largest integer value allowed.
 * @internal
 */
export function getRandomIntegerInclusive(min: number, max: number): number {
  // Make sure inputs are integers.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Pick a random offset from zero to the size of the range.
  // Since Math.random() can never return 1, we have to make the range one larger
  // in order to be inclusive of the maximum value after we take the floor.
  const offset = Math.floor(Math.random() * (max - min + 1));
  return offset + min;
}

/**
 * @internal
 */
export type UnknownObject = { [s: string]: unknown };

/**
 * @internal
 * @returns true when input is an object type that is not null, Array, RegExp, or Date.
 */
export function isObject(input: unknown): input is UnknownObject {
  return (
    typeof input === "object" &&
    input !== null &&
    !Array.isArray(input) &&
    !(input instanceof RegExp) &&
    !(input instanceof Date)
  );
}

/**
 * @internal
 * @returns result of form data encoded for application/x-www-form-urlencoded content type.
 *          See https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4 for more details.
 */
export function urlEncode(formData: FormDataMap) {
  const result: string[] = [];
  for (const formKey of Object.keys(formData)) {
    const formValue = formData[formKey];
    let value = "";
    if (Array.isArray(formValue)) {
      for (const subValue of formValue) {
        value += `${encodeURIComponent(formKey)}=${encodeURIComponent(String(subValue))}`;
      }
    } else {
      value += `${encodeURIComponent(formKey)}=${encodeURIComponent(String(formValue))}`;
    }
    result.push(value);
  }
  return result.join("&");
}
