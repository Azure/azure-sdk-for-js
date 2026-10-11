// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const INTEGER_SCALAR_NAMES = [
  "integer",
  "safeint",
  "int8",
  "int16",
  "int32",
  "int64",
  "uint8",
  "uint16",
  "uint32",
  "uint64",
] as const;

export type IntegerScalarName = (typeof INTEGER_SCALAR_NAMES)[number];

export const NUMERIC_SCALAR_NAMES = [
  ...INTEGER_SCALAR_NAMES,
  "numeric",
  "decimal",
  "decimal128",
  "float",
  "float32",
  "float64",
] as const;

export type NumericScalarName = (typeof NUMERIC_SCALAR_NAMES)[number];

const integerScalarNames: ReadonlySet<string> = new Set(INTEGER_SCALAR_NAMES);
const numericScalarNames: ReadonlySet<string> = new Set(NUMERIC_SCALAR_NAMES);

export function isIntegerScalarName(name: string): name is IntegerScalarName {
  return integerScalarNames.has(name);
}

export function isNumericScalarName(name: string): name is NumericScalarName {
  return numericScalarNames.has(name);
}

export interface DateTimeTextEncodingDescriptor {
  readonly kind: "date-time-text";
  readonly source: "utcDateTime" | "offsetDateTime";
  readonly format: "rfc3339" | "rfc7231";
  readonly clientMode: "client" | "wire";
  readonly wire: { readonly kind: "string" };
}

export interface UnixTimestampEncodingDescriptor {
  readonly kind: "unix-timestamp";
  readonly source: "utcDateTime";
  readonly unit: "seconds";
  readonly clientMode: "client" | "wire";
  readonly wire: {
    readonly kind: "integer";
    readonly scalar: IntegerScalarName;
  };
}

export interface DurationIso8601EncodingDescriptor {
  readonly kind: "duration-iso8601";
  readonly source: "duration";
  readonly clientMode: "wire";
  readonly wire: { readonly kind: "string" };
}

export interface DurationNumericEncodingDescriptor {
  readonly kind: "duration-numeric";
  readonly source: "duration";
  readonly unit: "seconds" | "milliseconds";
  readonly clientMode: "wire";
  readonly wire: {
    readonly kind: "integer";
    readonly scalar: IntegerScalarName;
  };
}

export interface BytesEncodingDescriptor {
  readonly kind: "bytes";
  readonly source: "bytes";
  readonly format: "base64" | "base64url";
  readonly clientMode: "client" | "wire";
  readonly wire: { readonly kind: "string" };
}

export interface PlainDateEncodingDescriptor {
  readonly kind: "plain-date";
  readonly source: "plainDate";
  readonly clientMode: "client" | "wire";
  readonly wire: { readonly kind: "string" };
}

export interface NumericStringEncodingDescriptor {
  readonly kind: "numeric-string";
  readonly source: "integer" | "number";
  readonly sourceScalar: NumericScalarName;
  readonly clientMode: "wire";
  readonly wire: { readonly kind: "string" };
}

export interface BooleanStringEncodingDescriptor {
  readonly kind: "boolean-string";
  readonly source: "boolean";
  readonly clientMode: "client" | "wire";
  readonly wire: { readonly kind: "string" };
}

export type ValueEncodingDescriptor =
  | DateTimeTextEncodingDescriptor
  | UnixTimestampEncodingDescriptor
  | DurationIso8601EncodingDescriptor
  | DurationNumericEncodingDescriptor
  | BytesEncodingDescriptor
  | PlainDateEncodingDescriptor
  | NumericStringEncodingDescriptor
  | BooleanStringEncodingDescriptor;

/**
 * Encodings whose client-side value is a JavaScript `string`.
 *
 * The source TypeSpec scalar can be a date/time, duration, byte sequence,
 * numeric value, or boolean. `clientMode: "wire"` is the important invariant:
 * it means the generated TypeScript API exposes the encoded string itself.
 */
export type StringValueEncodingDescriptor =
  | (DateTimeTextEncodingDescriptor & { readonly clientMode: "wire" })
  | DurationIso8601EncodingDescriptor
  | (BytesEncodingDescriptor & { readonly clientMode: "wire" })
  | (PlainDateEncodingDescriptor & { readonly clientMode: "wire" })
  | NumericStringEncodingDescriptor
  | (BooleanStringEncodingDescriptor & { readonly clientMode: "wire" });

/** Encoding supported by a client-side JavaScript `boolean`. */
export type BooleanValueEncodingDescriptor = BooleanStringEncodingDescriptor & {
  readonly clientMode: "client";
};

/** Encodings whose client-side value is a JavaScript `number`. */
export type NumberValueEncodingDescriptor =
  | (UnixTimestampEncodingDescriptor & { readonly clientMode: "wire" })
  | DurationNumericEncodingDescriptor;

/** Encoding supported by a client-side JavaScript `Uint8Array`. */
export type BytesValueEncodingDescriptor = BytesEncodingDescriptor & {
  readonly clientMode: "client";
};

/**
 * Encodings whose client-side value is a JavaScript `Date`.
 *
 * `offsetDateTime` is intentionally absent: the emitter exposes it as a
 * string so the original offset is not erased.
 */
export type DateValueEncodingDescriptor =
  | (DateTimeTextEncodingDescriptor & {
      readonly source: "utcDateTime";
      readonly clientMode: "client";
    })
  | (UnixTimestampEncodingDescriptor & { readonly clientMode: "client" })
  | (PlainDateEncodingDescriptor & { readonly clientMode: "client" });
