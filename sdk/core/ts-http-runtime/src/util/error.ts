// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isObject } from "./object.js";

/**
 * Typeguard for an error object shape (has name and message)
 * @param e - Something caught by a catch clause.
 */
export function isError(e: unknown): e is Error {
  if (isObject(e)) {
    const hasName = typeof e.name === "string";
    const hasMessage = typeof e.message === "string";
    return hasName && hasMessage;
  }
  return false;
}

/**
 * Wraps a non-Error thrown value in an Error.
 * @param e - Something caught by a catch clause.
 */
export function toError(e: unknown): Error {
  return e instanceof Error ? e : new Error(String(e));
}
