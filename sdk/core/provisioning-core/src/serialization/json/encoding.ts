// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Wire-encoding helpers driven by `PropertyEncoding` metadata on
 * descriptor entries.
 *
 * `@encode` in TypeSpec is a wire-only annotation: the user-facing TS
 * type stays as the source scalar (`Date`, `Uint8Array`, ISO8601 string
 * for `duration`, ...). The serializer (`lowerState`) calls
 * {@link encodeWireValue} just before writing each leaf into the wire
 * tree; the deserializer (`raiseState`) calls {@link decodeWireValue}
 * to convert wire primitives back to their source representation.
 *
 * The helpers are deliberately permissive: when a value isn't of the
 * expected source type (e.g. user already passed a pre-encoded
 * primitive), it is returned unchanged. This preserves backwards-
 * compatible behavior for callers that already format encoded values
 * themselves.
 */

import type { PropertyEncoding } from "../../shape/shape.js";

/**
 * Encode a leaf value to its wire form. Recurses into arrays and plain
 * objects so `Array<utcDateTime>` / `Record<string, bytes>` properties
 * work without callers reasoning about element-vs-collection encoding.
 */
export function encodeWireValue(value: unknown, encoding: PropertyEncoding): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) {
    return value.map((v) => encodeWireValue(v, encoding));
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = encodeWireValue(v, encoding);
    }
    return out;
  }
  return encodeLeaf(value, encoding);
}

/**
 * Inverse of {@link encodeWireValue}: decode a wire-form leaf back to
 * its source representation.
 */
export function decodeWireValue(value: unknown, encoding: PropertyEncoding): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) {
    return value.map((v) => decodeWireValue(v, encoding));
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = decodeWireValue(v, encoding);
    }
    return out;
  }
  return decodeLeaf(value, encoding);
}

function encodeLeaf(value: unknown, enc: PropertyEncoding): unknown {
  switch (enc.sourceKind) {
    case "utcDateTime":
    case "offsetDateTime":
      if (value instanceof Date) {
        switch (enc.encoding) {
          case "rfc7231":
            return value.toUTCString();
          case "unixTimestamp":
            return Math.floor(value.getTime() / 1000);
          case "rfc3339":
          default:
            return value.toISOString();
        }
      }
      return value;
    case "bytes":
      if (value instanceof Uint8Array) {
        const b64 = uint8ArrayToBase64(value);
        return enc.encoding === "base64url" ? base64ToBase64Url(b64) : b64;
      }
      return value;
    default:
      // duration / unknown sources: passthrough. Numeric values for
      // seconds/milliseconds are already wire-correct; ISO8601 strings
      // for the default encoding are already wire-correct.
      return value;
  }
}

function decodeLeaf(value: unknown, enc: PropertyEncoding): unknown {
  switch (enc.sourceKind) {
    case "utcDateTime":
    case "offsetDateTime":
      if (typeof value === "string") return new Date(value);
      if (typeof value === "number" && enc.encoding === "unixTimestamp") {
        return new Date(value * 1000);
      }
      return value;
    case "bytes":
      if (typeof value === "string") {
        const b64 = enc.encoding === "base64url" ? base64UrlToBase64(value) : value;
        return base64ToUint8Array(b64);
      }
      return value;
    default:
      return value;
  }
}

function uint8ArrayToBase64(value: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < value.length; offset += chunkSize) {
    binary += String.fromCharCode(...value.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function base64ToUint8Array(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function base64ToBase64Url(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBase64(b64url: string): string {
  const padded = b64url + "=".repeat((4 - (b64url.length % 4)) % 4);
  return padded.replace(/-/g, "+").replace(/_/g, "/");
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
