// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "buffer";
import { types as rheaTypes, type Typed } from "rhea-promise";

/**
 * An application property value with an explicit AMQP scalar type.
 *
 * Use this type when the AMQP type cannot be inferred unambiguously from a
 * JavaScript value, or when a received message must be resent without changing
 * the original AMQP type.
 */
export type AmqpApplicationProperty =
  | { readonly type: "null"; readonly value: null }
  | { readonly type: "boolean"; readonly value: boolean }
  | { readonly type: "ubyte"; readonly value: number }
  | { readonly type: "ushort"; readonly value: number }
  | { readonly type: "uint"; readonly value: number }
  | { readonly type: "ulong"; readonly value: bigint }
  | { readonly type: "byte"; readonly value: number }
  | { readonly type: "short"; readonly value: number }
  | { readonly type: "int"; readonly value: number }
  | { readonly type: "long"; readonly value: bigint }
  | { readonly type: "float"; readonly value: number }
  | { readonly type: "double"; readonly value: number }
  | { readonly type: "decimal32"; readonly value: Uint8Array }
  | { readonly type: "decimal64"; readonly value: Uint8Array }
  | { readonly type: "decimal128"; readonly value: Uint8Array }
  | { readonly type: "char"; readonly value: string }
  | { readonly type: "timestamp"; readonly value: Date }
  | { readonly type: "uuid"; readonly value: string }
  | { readonly type: "binary"; readonly value: Uint8Array }
  | { readonly type: "string"; readonly value: string }
  | { readonly type: "symbol"; readonly value: string };

const applicationPropertiesWithTypesSymbol = Symbol.for(
  "@azure/core-amqp.applicationPropertiesWithTypes",
);
const unwrapMapPatchedSymbol = Symbol.for("@azure/core-amqp.unwrapMapSimplePatched");

/**
 * @internal
 */
export type _ApplicationPropertiesWithTypes = Readonly<Record<string, AmqpApplicationProperty>>;
type RheaTypesWithPatchMarker = typeof rheaTypes & {
  [unwrapMapPatchedSymbol]?: boolean;
};
type RheaTypesWithDecimalConstructors = typeof rheaTypes & {
  Decimal32(value: Buffer): Typed;
  Decimal64(value: Buffer): Typed;
  Decimal128(value: Buffer): Typed;
};

/**
 * Gets the explicitly typed AMQP values retained while decoding application properties.
 *
 * @internal
 */
export function _getApplicationPropertiesWithAmqpTypes(
  applicationProperties: Record<string, unknown> | undefined,
): _ApplicationPropertiesWithTypes | undefined {
  return (
    applicationProperties as
      | (Record<string, unknown> & {
          [applicationPropertiesWithTypesSymbol]?: _ApplicationPropertiesWithTypes;
        })
      | undefined
  )?.[applicationPropertiesWithTypesSymbol] as _ApplicationPropertiesWithTypes | undefined;
}

/**
 * Converts public application property values to values understood by Rhea.
 *
 * @internal
 */
export function _toRheaApplicationProperties(
  applicationProperties: Record<string, unknown> | undefined,
  applicationPropertiesWithTypes?: _ApplicationPropertiesWithTypes,
): Record<string, unknown> | undefined {
  if (applicationProperties == null && applicationPropertiesWithTypes == null) {
    return undefined;
  }

  const result: Record<string, unknown> = { ...applicationProperties };
  const preservedTypes =
    applicationPropertiesWithTypes ?? _getApplicationPropertiesWithAmqpTypes(applicationProperties);

  if (preservedTypes != null) {
    for (const [key, value] of Object.entries(preservedTypes)) {
      if (!(key in result) || isAmqpApplicationProperty(result[key])) {
        continue;
      }
      result[key] = toRheaTyped(withValue(value, result[key]));
    }
  }

  for (const [key, value] of Object.entries(result)) {
    if (isAmqpApplicationProperty(value)) {
      result[key] = toRheaTyped(value);
    }
  }

  return result;
}

function withValue(property: AmqpApplicationProperty, value: unknown): AmqpApplicationProperty {
  switch (property.type) {
    case "null":
      if (value !== null) {
        throw new TypeError("AMQP null application properties must contain null.");
      }
      return property;
    case "boolean":
      return { type: property.type, value: requireType(property.type, value, "boolean") };
    case "ubyte":
    case "ushort":
    case "uint":
    case "byte":
    case "short":
    case "int":
    case "float":
    case "double":
      return { type: property.type, value: requireType(property.type, value, "number") };
    case "ulong":
    case "long":
      return { type: property.type, value: toBigInt(property.type, value) };
    case "decimal32":
    case "decimal64":
    case "decimal128":
    case "binary":
      if (!(value instanceof Uint8Array)) {
        throw new TypeError(`AMQP ${property.type} application properties must contain bytes.`);
      }
      return { type: property.type, value };
    case "char":
      if (typeof value === "number") {
        return { type: property.type, value: String.fromCodePoint(value) };
      }
      return { type: property.type, value: requireType(property.type, value, "string") };
    case "timestamp":
      if (value instanceof Date) {
        return { type: property.type, value };
      }
      if (typeof value === "number") {
        return { type: property.type, value: new Date(value) };
      }
      throw new TypeError("AMQP timestamp application properties must contain a Date or number.");
    case "uuid":
      if (value instanceof Uint8Array) {
        return { type: property.type, value: bufferToUuid(Buffer.from(value)) };
      }
      return { type: property.type, value: requireType(property.type, value, "string") };
    case "string":
    case "symbol":
      return { type: property.type, value: requireType(property.type, value, "string") };
  }
}

function requireType<T extends "boolean" | "number" | "string">(
  amqpType: AmqpApplicationProperty["type"],
  value: unknown,
  expectedType: T,
): T extends "boolean" ? boolean : T extends "number" ? number : string {
  if (typeof value !== expectedType) {
    throw new TypeError(`AMQP ${amqpType} application properties must contain a ${expectedType}.`);
  }
  return value as T extends "boolean" ? boolean : T extends "number" ? number : string;
}

function toBigInt(amqpType: "long" | "ulong", value: unknown): bigint {
  if (typeof value === "bigint") {
    return value;
  }
  if (typeof value === "number" && Number.isSafeInteger(value)) {
    return BigInt(value);
  }
  if (value instanceof Uint8Array && value.byteLength === 8) {
    const buffer = Buffer.from(value);
    return amqpType === "long" ? buffer.readBigInt64BE() : buffer.readBigUInt64BE();
  }
  throw new TypeError(
    `AMQP ${amqpType} application properties must contain a bigint, safe integer, or 8-byte value.`,
  );
}

function isAmqpApplicationProperty(value: unknown): value is AmqpApplicationProperty {
  if (value == null || typeof value !== "object" || !("type" in value) || !("value" in value)) {
    return false;
  }

  return [
    "null",
    "boolean",
    "ubyte",
    "ushort",
    "uint",
    "ulong",
    "byte",
    "short",
    "int",
    "long",
    "float",
    "double",
    "decimal32",
    "decimal64",
    "decimal128",
    "char",
    "timestamp",
    "uuid",
    "binary",
    "string",
    "symbol",
  ].includes((value as { type?: unknown }).type as string);
}

function toRheaTyped(property: AmqpApplicationProperty): Typed {
  const rheaTypesWithDecimals = rheaTypes as RheaTypesWithDecimalConstructors;
  switch (property.type) {
    case "null":
      return rheaTypes.wrap(null);
    case "boolean":
      return rheaTypes.wrap_boolean(property.value);
    case "ubyte":
      validateInteger(property, 0, 0xff);
      return rheaTypes.wrap_ubyte(property.value);
    case "ushort":
      validateInteger(property, 0, 0xffff);
      return rheaTypes.wrap_ushort(property.value);
    case "uint":
      validateInteger(property, 0, 0xffffffff);
      return rheaTypes.wrap_uint(property.value);
    case "ulong":
      return rheaTypes.wrap_ulong(bigIntToBuffer(property.value, false));
    case "byte":
      validateInteger(property, -0x80, 0x7f);
      return rheaTypes.wrap_byte(property.value);
    case "short":
      validateInteger(property, -0x8000, 0x7fff);
      return rheaTypes.wrap_short(property.value);
    case "int":
      validateInteger(property, -0x80000000, 0x7fffffff);
      return rheaTypes.wrap_int(property.value);
    case "long":
      return rheaTypes.wrap_long(bigIntToBuffer(property.value, true));
    case "float":
      return rheaTypes.wrap_float(property.value);
    case "double":
      return rheaTypes.wrap_double(property.value);
    case "decimal32":
      return rheaTypesWithDecimals.Decimal32(validateByteLength(property, 4));
    case "decimal64":
      return rheaTypesWithDecimals.Decimal64(validateByteLength(property, 8));
    case "decimal128":
      return rheaTypesWithDecimals.Decimal128(validateByteLength(property, 16));
    case "char": {
      const codePoints = Array.from(property.value);
      if (codePoints.length !== 1) {
        throw new TypeError("AMQP char application properties must contain one Unicode character.");
      }
      return rheaTypes.wrap_char(codePoints[0].codePointAt(0));
    }
    case "timestamp":
      if (Number.isNaN(property.value.getTime())) {
        throw new TypeError("AMQP timestamp application properties must contain a valid Date.");
      }
      return rheaTypes.wrap_timestamp(property.value);
    case "uuid":
      return rheaTypes.wrap_uuid(uuidToBuffer(property.value));
    case "binary":
      return rheaTypes.wrap_binary(Buffer.from(property.value));
    case "string":
      return rheaTypes.wrap_string(property.value);
    case "symbol":
      return rheaTypes.wrap_symbol(property.value);
  }
}

function validateInteger(
  property: Extract<AmqpApplicationProperty, { value: number }>,
  minimum: number,
  maximum: number,
): void {
  if (!Number.isInteger(property.value) || property.value < minimum || property.value > maximum) {
    throw new RangeError(
      `AMQP ${property.type} application properties must be integers between ${minimum} and ${maximum}.`,
    );
  }
}

function validateByteLength(
  property: Extract<AmqpApplicationProperty, { type: "decimal32" | "decimal64" | "decimal128" }>,
  length: number,
): Buffer {
  if (property.value.byteLength !== length) {
    throw new RangeError(
      `AMQP ${property.type} application properties must contain exactly ${length} bytes.`,
    );
  }
  return Buffer.from(property.value);
}

function bigIntToBuffer(value: bigint, signed: boolean): Buffer {
  const minimum = signed ? -(1n << 63n) : 0n;
  const maximum = signed ? (1n << 63n) - 1n : (1n << 64n) - 1n;
  if (value < minimum || value > maximum) {
    throw new RangeError(
      `AMQP ${signed ? "long" : "ulong"} application properties must be between ${minimum} and ${maximum}.`,
    );
  }

  const buffer = Buffer.alloc(8);
  if (signed) {
    buffer.writeBigInt64BE(value);
  } else {
    buffer.writeBigUInt64BE(value);
  }
  return buffer;
}

function uuidToBuffer(value: string): Buffer {
  const normalized = value.replace(/-/g, "");
  if (!/^[0-9a-fA-F]{32}$/.test(normalized)) {
    throw new TypeError("AMQP uuid application properties must contain a valid UUID.");
  }
  return Buffer.from(normalized, "hex");
}

function fromRheaTyped(value: Typed): AmqpApplicationProperty | undefined {
  switch (value.type.name) {
    case "Null":
      return { type: "null", value: null };
    case "Boolean":
    case "True":
    case "False":
      return { type: "boolean", value: Boolean(rheaTypes.unwrap(value)) };
    case "Ubyte":
      return { type: "ubyte", value: value.value };
    case "Ushort":
      return { type: "ushort", value: value.value };
    case "Uint":
    case "SmallUint":
    case "Uint0":
      return { type: "uint", value: value.value };
    case "Ulong":
    case "SmallUlong":
    case "Ulong0":
      return { type: "ulong", value: rheaIntegerToBigInt(value.value, false) };
    case "Byte":
      return { type: "byte", value: value.value };
    case "Short":
      return { type: "short", value: value.value };
    case "Int":
    case "SmallInt":
      return { type: "int", value: value.value };
    case "Long":
    case "SmallLong":
      return { type: "long", value: rheaIntegerToBigInt(value.value, true) };
    case "Float":
      return { type: "float", value: value.value };
    case "Double":
      return { type: "double", value: value.value };
    case "Decimal32":
      return { type: "decimal32", value: Uint8Array.from(value.value) };
    case "Decimal64":
      return { type: "decimal64", value: Uint8Array.from(value.value) };
    case "Decimal128":
      return { type: "decimal128", value: Uint8Array.from(value.value) };
    case "CharUTF32":
      return { type: "char", value: String.fromCodePoint(value.value) };
    case "Timestamp":
      return { type: "timestamp", value: value.value };
    case "Uuid":
      return { type: "uuid", value: bufferToUuid(value.value) };
    case "Vbin8":
    case "Vbin32":
      return { type: "binary", value: Uint8Array.from(value.value) };
    case "Str8":
    case "Str32":
      return { type: "string", value: value.value };
    case "Sym8":
    case "Sym32":
      return { type: "symbol", value: value.value };
    default:
      return undefined;
  }
}

function rheaIntegerToBigInt(value: number | Buffer, signed: boolean): bigint {
  if (typeof value === "number") {
    return BigInt(value);
  }
  return signed ? value.readBigInt64BE() : value.readBigUInt64BE();
}

function bufferToUuid(value: Buffer): string {
  const hex = value.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(
    16,
    20,
  )}-${hex.slice(20)}`;
}

function installTypedApplicationPropertyDecoder(): void {
  const typesWithMarker = rheaTypes as RheaTypesWithPatchMarker;
  if (typesWithMarker[unwrapMapPatchedSymbol]) {
    return;
  }

  const unwrapMapSimple = rheaTypes.unwrap_map_simple.bind(rheaTypes);
  rheaTypes.unwrap_map_simple = (map: { value: Typed[] }): Record<string, unknown> => {
    const unwrapped = unwrapMapSimple(map) as Record<string, unknown>;
    const propertiesWithTypes: Record<string, AmqpApplicationProperty> = {};

    for (let index = 0; index + 1 < map.value.length; index += 2) {
      const key = String(rheaTypes.unwrap(map.value[index], true));
      const property = fromRheaTyped(map.value[index + 1]);
      if (property != null) {
        propertiesWithTypes[key] = property;
      }
    }

    Object.defineProperty(unwrapped, applicationPropertiesWithTypesSymbol, {
      configurable: false,
      enumerable: false,
      value: Object.freeze(propertiesWithTypes),
      writable: false,
    });
    return unwrapped;
  };
  Object.defineProperty(typesWithMarker, unwrapMapPatchedSymbol, {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false,
  });
}

installTypedApplicationPropertyDecoder();
