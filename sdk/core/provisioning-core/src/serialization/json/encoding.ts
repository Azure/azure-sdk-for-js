// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isExpressionNode } from "../../expression/ast-nodes.js";
import { isExpression } from "../../expression/expressions.js";
import type {
  BytesEncodingDescriptor,
  DateTimeTextEncodingDescriptor,
  IntegerScalarName,
  NumericScalarName,
  NumericStringEncodingDescriptor,
  UnixTimestampEncodingDescriptor,
  ValueEncodingDescriptor,
} from "../../shape/value-encoding.js";

export function encodeWireValue(
  value: unknown,
  encoding: ValueEncodingDescriptor,
  path: readonly string[] = [],
): unknown {
  if (value === null || value === undefined) return value;
  if (isExpression(value) || isExpressionNode(value)) return value;

  switch (encoding.kind) {
    case "date-time-text":
      return encodeDateTimeText(value, encoding, path);
    case "unix-timestamp":
      return encodeUnixTimestamp(value, encoding, path);
    case "duration-iso8601":
      return requireIsoDuration(value, path);
    case "duration-numeric":
      return requireInteger(value, encoding.wire.scalar, path);
    case "bytes":
      return encodeBytes(value, encoding, path);
    case "plain-date":
      return encoding.clientMode === "wire"
        ? requirePlainDate(value, path)
        : encodePlainDate(value, path);
    case "numeric-string":
      return requireNumericString(value, encoding, path);
    case "boolean-string":
      if (encoding.clientMode === "wire") {
        return requireBooleanString(value, path);
      }
      if (typeof value !== "boolean") {
        fail(path, `Expected a boolean, got ${describe(value)}.`);
      }
      return String(value);
  }
}

export function decodeWireValue(
  value: unknown,
  encoding: ValueEncodingDescriptor,
  path: readonly string[] = [],
): unknown {
  if (value === null || value === undefined) return value;
  if (isExpression(value) || isExpressionNode(value)) return value;

  switch (encoding.kind) {
    case "date-time-text":
      return decodeDateTimeText(value, encoding, path);
    case "unix-timestamp": {
      const seconds = requireInteger(value, encoding.wire.scalar, path);
      if (encoding.clientMode === "wire") return seconds;
      const date = new Date(seconds * 1000);
      if (Number.isNaN(date.getTime())) {
        fail(path, "Unix timestamp is outside the JavaScript Date range.");
      }
      return date;
    }
    case "duration-iso8601":
      return requireIsoDuration(value, path);
    case "duration-numeric":
      return requireInteger(value, encoding.wire.scalar, path);
    case "bytes":
      return decodeBytes(value, encoding, path);
    case "plain-date": {
      const date = requirePlainDate(value, path);
      return encoding.clientMode === "wire" ? date : new Date(`${date}T00:00:00.000Z`);
    }
    case "numeric-string":
      return requireNumericString(value, encoding, path);
    case "boolean-string": {
      const booleanText = requireBooleanString(value, path);
      return encoding.clientMode === "wire" ? booleanText : booleanText.toLowerCase() === "true";
    }
  }
}

function encodeDateTimeText(
  value: unknown,
  encoding: DateTimeTextEncodingDescriptor,
  path: readonly string[],
): string {
  if (encoding.clientMode === "wire") {
    if (encoding.source === "offsetDateTime") {
      const clientText = requireDateString(value, "rfc3339", path);
      if (encoding.format === "rfc7231") {
        requireWholeSecondDateTime(clientText, path);
        return new Date(clientText).toUTCString();
      }
      return clientText;
    }
    return requireDateString(value, encoding.format, path);
  }
  const date = requireDate(value, path);
  if (encoding.format === "rfc7231") {
    if (date.getUTCMilliseconds() !== 0) {
      fail(path, "RFC7231 conversion would lose millisecond precision.");
    }
    return date.toUTCString();
  }
  return date.toISOString();
}

function decodeDateTimeText(
  value: unknown,
  encoding: DateTimeTextEncodingDescriptor,
  path: readonly string[],
): unknown {
  const text = requireDateString(value, encoding.format, path);
  if (encoding.source === "offsetDateTime") {
    return encoding.format === "rfc7231" ? new Date(text).toISOString() : text;
  }
  if (encoding.clientMode === "wire") return text;
  return new Date(text);
}

function encodeUnixTimestamp(
  value: unknown,
  encoding: UnixTimestampEncodingDescriptor,
  path: readonly string[],
): number {
  if (encoding.clientMode === "wire") {
    return requireInteger(value, encoding.wire.scalar, path);
  }
  const date = requireDate(value, path);
  if (date.getTime() % 1000 !== 0) {
    fail(path, "Unix timestamp conversion would lose millisecond precision.");
  }
  return requireInteger(date.getTime() / 1000, encoding.wire.scalar, path);
}

function encodeBytes(
  value: unknown,
  encoding: BytesEncodingDescriptor,
  path: readonly string[],
): string {
  if (encoding.clientMode === "wire") {
    return requireBase64(value, encoding.format, path);
  }
  if (!(value instanceof Uint8Array)) {
    fail(path, `Expected Uint8Array, got ${describe(value)}.`);
  }
  const base64 = uint8ArrayToBase64(value);
  return encoding.format === "base64url" ? base64ToBase64Url(base64) : base64;
}

function decodeBytes(
  value: unknown,
  encoding: BytesEncodingDescriptor,
  path: readonly string[],
): unknown {
  const text = requireBase64(value, encoding.format, path);
  if (encoding.clientMode === "wire") return text;
  const base64 = encoding.format === "base64url" ? base64UrlToBase64(text) : text;
  return base64ToUint8Array(base64);
}

function requireDate(value: unknown, path: readonly string[]): Date {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    fail(path, `Expected a valid Date, got ${describe(value)}.`);
  }
  return value;
}

function encodePlainDate(value: unknown, path: readonly string[]): string {
  const date = requireDate(value, path);
  if (
    date.getUTCHours() !== 0 ||
    date.getUTCMinutes() !== 0 ||
    date.getUTCSeconds() !== 0 ||
    date.getUTCMilliseconds() !== 0
  ) {
    fail(path, "Plain-date conversion requires UTC midnight.");
  }
  return date.toISOString().slice(0, 10);
}

function requireWholeSecondDateTime(value: string, path: readonly string[]): void {
  const fraction = /\.(\d+)(?:Z|[+-]\d{2}:\d{2})$/.exec(value)?.[1];
  if (fraction !== undefined && /[1-9]/.test(fraction)) {
    fail(path, "RFC7231 conversion would lose subsecond precision.");
  }
}

function requireDateString(
  value: unknown,
  format: "rfc3339" | "rfc7231",
  path: readonly string[],
): string {
  const isValid =
    format === "rfc3339"
      ? isValidRfc3339(String(value))
      : /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(
          String(value),
        ) &&
        !Number.isNaN(Date.parse(String(value))) &&
        new Date(String(value)).toUTCString() === value;
  if (typeof value !== "string" || !isValid) {
    fail(path, `Expected a valid ${format} date string, got ${describe(value)}.`);
  }
  return value;
}

const ISO_DURATION =
  /^-?P(?=\d|T\d)(?:(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?W)?(?:\d+(?:\.\d+)?D)?)(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$/;

function requireIsoDuration(value: unknown, path: readonly string[]): string {
  if (typeof value !== "string" || !ISO_DURATION.test(value)) {
    fail(path, `Expected an ISO8601 day/time duration, got ${describe(value)}.`);
  }

  return value;
}

function requirePlainDate(value: unknown, path: readonly string[]): string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) ||
    new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) !== value
  ) {
    fail(path, `Expected a YYYY-MM-DD date, got ${describe(value)}.`);
  }
  return value;
}

function requireInteger(
  value: unknown,
  scalar: IntegerScalarName,
  path: readonly string[],
): number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    !inIntegerRange(BigInt(value), scalar)
  ) {
    fail(path, `Expected a safe ${scalar} value, got ${describe(value)}.`);
  }
  return value;
}

const CANONICAL_NUMBER = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

function requireNumericString(
  value: unknown,
  encoding: NumericStringEncodingDescriptor,
  path: readonly string[],
): string {
  const pattern = encoding.source === "integer" ? /^-?(?:0|[1-9]\d*)$/ : CANONICAL_NUMBER;
  if (typeof value !== "string" || !pattern.test(value)) {
    fail(path, `Expected a canonical numeric string, got ${describe(value)}.`);
  }
  if (
    encoding.source === "integer"
      ? !inIntegerRange(BigInt(value), encoding.sourceScalar)
      : !inNumericRange(value, encoding.sourceScalar)
  ) {
    fail(path, `Numeric string is outside '${encoding.sourceScalar}' range.`);
  }
  return value;
}

function inNumericRange(value: string, scalar: NumericScalarName): boolean {
  if (scalar === "numeric" || scalar === "decimal") return true;
  if (scalar === "decimal128") {
    const match = /^(-?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(value);
    if (!match) return false;
    const integer = match[2]!;
    const fraction = match[3] ?? "";
    const significant = `${integer}${fraction}`.replace(/^0+/u, "");
    if (significant.length === 0) return true;
    if (significant.length > 34) return false;
    const exponent = Number(match[4] ?? 0);
    const adjustedExponent = exponent + integer.length - 1;
    return adjustedExponent >= -6176 && adjustedExponent <= 6144;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) return false;
  if (scalar === "float32") {
    return Math.abs(number) <= 3.4028234663852886e38;
  }
  return true;
}

const INTEGER_RANGES: Partial<Record<NumericScalarName, readonly [bigint, bigint]>> = {
  safeint: [BigInt(Number.MIN_SAFE_INTEGER), BigInt(Number.MAX_SAFE_INTEGER)],
  int8: [-128n, 127n],
  uint8: [0n, 255n],
  int16: [-32768n, 32767n],
  uint16: [0n, 65535n],
  int32: [-2147483648n, 2147483647n],
  uint32: [0n, 4294967295n],
  int64: [-9223372036854775808n, 9223372036854775807n],
  uint64: [0n, 18446744073709551615n],
};

function inIntegerRange(value: bigint, scalar: NumericScalarName): boolean {
  const range = INTEGER_RANGES[scalar];
  return range ? value >= range[0] && value <= range[1] : true;
}

function requireBooleanString(value: unknown, path: readonly string[]): string {
  if (value !== "true" && value !== "false") {
    fail(path, `Expected 'true' or 'false', got ${describe(value)}.`);
  }
  return value;
}

function isValidRfc3339(value: string): boolean {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-](\d{2}):(\d{2}))$/.exec(
      value,
    );
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > new Date(Date.UTC(year, month, 0)).getUTCDate() ||
    Number(match[4]) > 23 ||
    Number(match[5]) > 59 ||
    Number(match[6]) > 59 ||
    Number(match[7] ?? 0) > 23 ||
    Number(match[8] ?? 0) > 59
  ) {
    return false;
  }
  return !Number.isNaN(Date.parse(value));
}

function requireBase64(
  value: unknown,
  format: "base64" | "base64url",
  path: readonly string[],
): string {
  if (typeof value !== "string") {
    fail(path, `Expected a ${format} string, got ${describe(value)}.`);
  }
  const pattern =
    format === "base64"
      ? /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
      : /^[A-Za-z0-9_-]*$/;
  if (!pattern.test(value)) {
    fail(path, `Expected a valid ${format} string.`);
  }
  if (format === "base64url" && value.length % 4 === 1) {
    fail(path, "Expected a valid base64url string length.");
  }
  const base64 = format === "base64url" ? base64UrlToBase64(value) : value;
  const canonical =
    format === "base64url"
      ? base64ToBase64Url(uint8ArrayToBase64(base64ToUint8Array(base64)))
      : uint8ArrayToBase64(base64ToUint8Array(base64));
  if (canonical !== value) {
    fail(path, `Expected a canonical ${format} string.`);
  }
  return value;
}

function uint8ArrayToBase64(value: Uint8Array): string {
  const chunks: string[] = [];
  const chunkSize = 0x8000;
  for (let offset = 0; offset < value.length; offset += chunkSize) {
    chunks.push(String.fromCharCode(...value.subarray(offset, offset + chunkSize)));
  }
  return btoa(chunks.join(""));
}

function base64ToUint8Array(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function base64ToBase64Url(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBase64(base64url: string): string {
  const padded = base64url + "=".repeat((4 - (base64url.length % 4)) % 4);
  return padded.replace(/-/g, "+").replace(/_/g, "/");
}

function describe(value: unknown): string {
  if (value instanceof Date) return "Date";
  if (value instanceof Uint8Array) return "Uint8Array";
  return value === null ? "null" : typeof value;
}

function fail(path: readonly string[], message: string): never {
  const location = path.length > 0 ? path.join(".") : "<value>";
  throw new TypeError(`Invalid encoded value at '${location}': ${message}`);
}
