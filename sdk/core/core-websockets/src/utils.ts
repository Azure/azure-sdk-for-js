// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "@azure/core-util";

/**
 * Returns a random name by appending a guid to the input string as follows:
 * `{name}-{uuid}`.
 * @internal
 */
export function getRandomName(prefix?: string): string {
  const str = randomUUID();
  return prefix ? `${prefix}-${str}` : str;
}

/**
 * Creates an error object with the given message.
 */
export function createError(errorMessage: string): Error {
  return new Error(errorMessage);
}

/**
 * A utility type that makes all properties of a type writable.
 */
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Creates the websocket connection URL
 * @param url - The input URL the user passed in
 * @param options - Options for createUrl
 *
 * @returns the websocket connection URL
 */
export function createUrl(url: string, options: { allowInsecureConnection?: boolean } = {}): URL {
  const { allowInsecureConnection } = options;
  const urlObj = new URL(url);
  if (["ws:", "http:"].includes(urlObj.protocol) && !allowInsecureConnection) {
    throw createError("Insecure connection is not allowed");
  }
  if (urlObj.protocol === "http:") {
    urlObj.protocol = "ws:";
  } else if (urlObj.protocol === "https:") {
    urlObj.protocol = "wss:";
  }
  return urlObj;
}
