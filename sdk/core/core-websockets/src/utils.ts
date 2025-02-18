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
 * Creates the websocket connection URL. It validates the protocol
 * and converts http/https to ws/wss respectively.
 *
 * @param url - The input URL string.
 * @param options - Options for createUrl; if allowInsecureConnection is false, insecure protocols are rejected.
 * @returns The adjusted URL string.
 */
export function createUrl(
  url: string,
  options: { allowInsecureConnection?: boolean } = {},
): string {
  const { allowInsecureConnection } = options;
  // Extract protocol from the URL using a regular expression.
  const protocolMatch = url.match(/^([a-zA-Z]+):\/\//);
  if (!protocolMatch || protocolMatch.length < 2) {
    throw createError("Invalid URL format");
  }
  const protocol = protocolMatch[1].toLowerCase() + ":";

  // If using insecure protocols and they are not permitted, throw an error.
  if ((protocol === "ws:" || protocol === "http:") && !allowInsecureConnection) {
    throw createError("Insecure connection is not allowed");
  }

  if (protocol === "http:") {
    return "ws:" + url.slice("http:".length);
  } else if (protocol === "https:") {
    return "wss:" + url.slice("https:".length);
  } else {
    // For any other protocol (like ws: or wss:), return the URL unchanged.
    return url;
  }
}
