// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  createAnyShape,
  createBooleanLiteralShape,
  createBooleanShape,
  createBytesShape,
  createDateShape,
  createEnumShape,
  createNullShape,
  createNumberLiteralShape,
  createNumberShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
} from "../src/shape/shape.js";
import type {
  BooleanValueEncodingDescriptor,
  BytesValueEncodingDescriptor,
  DateValueEncodingDescriptor,
  NumberValueEncodingDescriptor,
  StringValueEncodingDescriptor,
} from "../src/shape/value-encoding.js";

const booleanEncoding = {
  kind: "boolean-string",
  source: "boolean",
  clientMode: "client",
  wire: { kind: "string" },
} as const satisfies BooleanValueEncodingDescriptor;

const wireBooleanEncoding = {
  kind: "boolean-string",
  source: "boolean",
  clientMode: "wire",
  wire: { kind: "string" },
} as const satisfies StringValueEncodingDescriptor;

const bytesEncoding = {
  kind: "bytes",
  source: "bytes",
  format: "base64url",
  clientMode: "client",
  wire: { kind: "string" },
} as const satisfies BytesValueEncodingDescriptor;

const dateEncoding = {
  kind: "unix-timestamp",
  source: "utcDateTime",
  unit: "seconds",
  clientMode: "client",
  wire: { kind: "integer", scalar: "int64" },
} as const satisfies DateValueEncodingDescriptor;

const numberEncoding = {
  kind: "duration-numeric",
  source: "duration",
  unit: "milliseconds",
  clientMode: "wire",
  wire: { kind: "integer", scalar: "int32" },
} as const satisfies NumberValueEncodingDescriptor;

const stringEncoding = {
  kind: "numeric-string",
  source: "integer",
  sourceScalar: "int64",
  clientMode: "wire",
  wire: { kind: "string" },
} as const satisfies StringValueEncodingDescriptor;

describe("concrete value shapes", () => {
  it.each([
    { kind: "any", create: createAnyShape },
    { kind: "string", create: createStringShape },
    { kind: "boolean", create: createBooleanShape },
    { kind: "number", create: createNumberShape },
    { kind: "bytes", create: createBytesShape },
    { kind: "date", create: createDateShape },
    { kind: "stringLiteral", create: createStringLiteralShape },
    { kind: "numberLiteral", create: createNumberLiteralShape },
    { kind: "booleanLiteral", create: createBooleanLiteralShape },
    { kind: "enum", create: createEnumShape },
    { kind: "union", create: createUnionShape },
    { kind: "null", create: createNullShape },
  ])("constructs a $kind shape without encoding metadata", ({ kind, create }) => {
    expect(create()).toStrictEqual({ kind });
  });

  it.each([
    {
      kind: "string",
      create: () => createStringShape(stringEncoding),
      encoding: stringEncoding,
    },
    {
      kind: "string",
      create: () => createStringShape(wireBooleanEncoding),
      encoding: wireBooleanEncoding,
    },
    {
      kind: "boolean",
      create: () => createBooleanShape(booleanEncoding),
      encoding: booleanEncoding,
    },
    {
      kind: "number",
      create: () => createNumberShape(numberEncoding),
      encoding: numberEncoding,
    },
    {
      kind: "bytes",
      create: () => createBytesShape(bytesEncoding),
      encoding: bytesEncoding,
    },
    {
      kind: "date",
      create: () => createDateShape(dateEncoding),
      encoding: dateEncoding,
    },
    {
      kind: "numberLiteral",
      create: () => createNumberLiteralShape(stringEncoding),
      encoding: stringEncoding,
    },
    {
      kind: "booleanLiteral",
      create: () => createBooleanLiteralShape(booleanEncoding),
      encoding: booleanEncoding,
    },
  ])(
    "preserves $encoding.kind encoding metadata on a $kind shape",
    ({ kind, create, encoding }) => {
      expect(create()).toStrictEqual({ kind, encoding });
    },
  );
});
