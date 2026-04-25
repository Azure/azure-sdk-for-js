// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestBodyType } from "@azure/core-rest-pipeline";

function isRequestBody(obj: unknown): obj is RequestBodyType {
  return (
    typeof obj === "function" ||
    (typeof obj === "object" &&
      obj != null &&
      (obj.constructor.name === "ArrayBuffer" ||
        obj.constructor.name === "Blob" ||
        ArrayBuffer.isView(obj)))
  );
}

export interface TextPlainPayload {
  contentType: "text/plain";
  payload: string;
}

export interface JsonPayload {
  contentType: "application/json";
  payload: string;
}

export interface BinaryPayload {
  contentType: "application/octet-stream";
  payload: RequestBodyType;
}

export type Payload = TextPlainPayload | JsonPayload | BinaryPayload;

export function toByteArrayPayload(payload: string | RequestBodyType): Uint8Array {
  if (typeof payload === "string") {
    return new TextEncoder().encode(payload);
  }

  if (payload instanceof ArrayBuffer) {
    return new Uint8Array(payload);
  }

  if (ArrayBuffer.isView(payload)) {
    if (payload instanceof Uint8Array) {
      return payload;
    }
    return new Uint8Array(payload.buffer, payload.byteOffset, payload.byteLength);
  }

  throw new TypeError(
    `toByteArrayPayload expects a string, ArrayBuffer, or ArrayBufferView, but received ${
      payload instanceof Blob ? "Blob" : typeof payload
    }. The REST layer requires Uint8Array bodies.`,
  );
}

export function getPayloadForMessage(message: unknown, options: Record<string, any>): Payload {
  if (options?.contentType === "text/plain") {
    if (typeof message !== "string") {
      throw new TypeError("Message must be a string.");
    }
    return { contentType: "text/plain", payload: message };
  } else if (isRequestBody(message)) {
    return { contentType: "application/octet-stream", payload: message };
  } else {
    return { contentType: "application/json", payload: JSON.stringify(message) };
  }
}

function formatNullAndUndefined(input: unknown): string | unknown {
  if (input === null || input === undefined) {
    return "null";
  }

  return input;
}

function escapeQuotesIfString(input: unknown, previous: string): string | unknown {
  let result = input;

  if (typeof input === "string") {
    result = input.replace(/'/g, "''");
    // check if we need to escape this literal
    if (!previous.trim().endsWith("'")) {
      result = `'${result}'`;
    }
  }

  return result;
}

/**
 * Escapes an odata filter expression to avoid errors with quoting string literals.
 * Example usage:
 * ```ts snippet:ReadmeSampleOdata
 * import { odata } from "@azure/web-pubsub";
 *
 * const userId = "vic's";
 * const anonymous = null;
 * const length = 3;
 * const filter = odata`userId eq ${anonymous} or userId eq ${userId} or length(userId) > ${length}`;
 * ```
 * @param strings - Array of strings for the expression
 * @param values - Array of values for the expression
 */
export function odata(strings: TemplateStringsArray, ...values: unknown[]): string {
  const results = [];
  for (let i = 0; i < strings.length; i++) {
    results.push(strings[i]);
    if (i < values.length) {
      if (values[i] === null || values[i] === undefined) {
        results.push(formatNullAndUndefined(values[i]));
      } else {
        results.push(escapeQuotesIfString(values[i], strings[i]));
      }
    }
  }
  return results.join("");
}
