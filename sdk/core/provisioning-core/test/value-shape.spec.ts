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
  type ValueShape,
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
  it("constructs every terminal client value category", () => {
    const shapes: ValueShape[] = [
      createAnyShape(),
      createStringShape(stringEncoding),
      createBooleanShape(booleanEncoding),
      createNumberShape(numberEncoding),
      createBytesShape(bytesEncoding),
      createDateShape(dateEncoding),
      createStringLiteralShape(),
      createNumberLiteralShape(stringEncoding),
      createBooleanLiteralShape(booleanEncoding),
      createEnumShape(),
      createUnionShape(),
      createNullShape(),
    ];

    expect(shapes.map((shape) => shape.kind)).toEqual([
      "any",
      "string",
      "boolean",
      "number",
      "bytes",
      "date",
      "stringLiteral",
      "numberLiteral",
      "booleanLiteral",
      "enum",
      "union",
      "null",
    ]);
  });
});

// These assignments are compile-time contract tests. Non-scalar TypeSpec
// categories expose encoding only when TypeSpec permits it, and every factory
// accepts only descriptors compatible with its emitted client representation.
function assertEncodingTypeContracts(): void {
  const anyShape = createAnyShape();
  const stringLiteralShape = createStringLiteralShape();
  const numberLiteralShape = createNumberLiteralShape(stringEncoding);
  const booleanLiteralShape = createBooleanLiteralShape(booleanEncoding);
  const enumShape = createEnumShape();
  const unionShape = createUnionShape();

  // @ts-expect-error TypeSpec unknown/TypeScript any cannot be encoded.
  void anyShape.encoding;
  // @ts-expect-error TypeSpec string literals cannot be encoded.
  void stringLiteralShape.encoding;
  void numberLiteralShape.encoding;
  void booleanLiteralShape.encoding;
  // @ts-expect-error TypeSpec enums cannot be encoded.
  void enumShape.encoding;
  // @ts-expect-error TypeSpec unions cannot be encoded by this emitter.
  void unionShape.encoding;

  // @ts-expect-error A semantic boolean encoding cannot decorate a string shape.
  createStringShape(booleanEncoding);
  // @ts-expect-error A wire-string numeric encoding cannot decorate a number shape.
  createNumberShape(stringEncoding);
  // @ts-expect-error A semantic Date encoding cannot decorate a byte shape.
  createBytesShape(dateEncoding);
  // @ts-expect-error A semantic byte encoding cannot decorate a Date shape.
  createDateShape(bytesEncoding);
  // @ts-expect-error A boolean encoding cannot decorate a numeric literal.
  createNumberLiteralShape(booleanEncoding);
  // @ts-expect-error A numeric encoding cannot decorate a boolean literal.
  createBooleanLiteralShape(stringEncoding);
  // @ts-expect-error A wire-mode boolean descriptor requires a string shape.
  createBooleanLiteralShape(wireBooleanEncoding);
  createStringShape(wireBooleanEncoding);

  void anyShape;
  void stringLiteralShape;
  void numberLiteralShape;
  void booleanLiteralShape;
  void enumShape;
  void unionShape;
}
void assertEncodingTypeContracts;
