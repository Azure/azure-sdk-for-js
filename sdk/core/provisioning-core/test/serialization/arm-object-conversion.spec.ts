// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  createArrayShape,
  createDiscriminatedModelShape,
  type FlatModelShape,
  createFlatModelShape as createModelShape,
  createBooleanLiteralShape,
  createBooleanShape,
  createDateShape,
  createNumberLiteralShape,
  createNumberShape,
  createStringShape,
  createRecordShape,
  createTupleShape,
  createDeferredShape,
} from "../../src/internal.js";
import {
  convertToArmObject,
  convertFromArmObject,
} from "../../src/serialization/arm-object-conversion.js";
import { symbolicValueExpressionNode } from "../../src/expression/ast-nodes.js";
import { isExpression, wrapExpression } from "../../src/expression/expressions.js";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const innerShape: FlatModelShape = createModelShape({
  foo: { armPath: ["fooArm"], value: { kind: "any" } },
});

const propsShape: FlatModelShape = createModelShape({
  inner: {
    armPath: ["inner"],
    value: createDeferredShape(() => innerShape),
  },
  // Flattened: JS `enabled` lives on wire as properties.enabled
  enabled: { armPath: ["enabled"], value: { kind: "any" } },
});

const descriptor: FlatModelShape = createModelShape({
  props: {
    armPath: ["properties"],
    value: createDeferredShape(() => propsShape),
  },
  tier: { armPath: ["sku", "tier"], value: { kind: "any" } }, // flattened
  items: {
    armPath: ["itemsArm"],
    value: createArrayShape(createDeferredShape(() => innerShape)),
  },
  byKey: {
    armPath: ["byKeyArm"],
    value: createRecordShape(createDeferredShape(() => innerShape)),
  },
});

// ---------------------------------------------------------------------------
// convertToArmObject
// ---------------------------------------------------------------------------

describe("convertToArmObject", () => {
  it("passes through unknown keys unchanged", () => {
    const out = convertToArmObject({ other: 1 }, descriptor);
    expect(out).toEqual({ other: 1 });
  });

  it("keeps JS keys for empty ARM paths while lowering nested values", () => {
    const shape = createModelShape({
      value: { armPath: [], value: { kind: "any" } },
      nested: {
        armPath: [],
        value: createDeferredShape(() => innerShape),
      },
    });

    expect(convertToArmObject({ value: 1, nested: { foo: 2 } }, shape)).toEqual({
      value: 1,
      nested: { fooArm: 2 },
    });
  });

  it("applies single-segment renames", () => {
    const out = convertToArmObject({ items: [] }, descriptor);
    expect(out).toEqual({ itemsArm: [] });
  });

  it("re-nests multi-segment paths (flatten)", () => {
    const out = convertToArmObject({ tier: "Standard" }, descriptor);
    expect(out).toEqual({ sku: { tier: "Standard" } });
  });

  it("recurses into nested models with lowered keys", () => {
    const out = convertToArmObject({ props: { inner: { foo: 1 }, enabled: true } }, descriptor);
    expect(out).toEqual({
      properties: { inner: { fooArm: 1 }, enabled: true },
    });
  });

  it("recurses into arrays of models", () => {
    const out = convertToArmObject({ items: [{ foo: 1 }, { foo: 2 }] }, descriptor);
    expect(out).toEqual({ itemsArm: [{ fooArm: 1 }, { fooArm: 2 }] });
  });

  it("recurses into records of models", () => {
    const out = convertToArmObject({ byKey: { a: { foo: 1 } } }, descriptor);
    expect(out).toEqual({ byKeyArm: { a: { fooArm: 1 } } });
  });

  it("deep-merges compatible flattens", () => {
    const mergeDesc: FlatModelShape = createModelShape({
      tier: { armPath: ["sku", "tier"], value: { kind: "any" } },
      family: { armPath: ["sku", "family"], value: { kind: "any" } },
    });
    const out = convertToArmObject({ tier: "Standard", family: "C" }, mergeDesc);
    expect(out).toEqual({ sku: { tier: "Standard", family: "C" } });
  });

  it("throws on non-object/object collision", () => {
    const badDesc: FlatModelShape = createModelShape({
      tier: { armPath: ["sku", "tier"], value: { kind: "any" } },
      sku: { armPath: ["sku"], value: { kind: "any" } },
    });
    expect(() => convertToArmObject({ tier: "Standard", sku: "flat" }, badDesc)).toThrow(
      /collision/,
    );
  });

  it("detects cycles", () => {
    const recursive: FlatModelShape = createModelShape({
      self: {
        armPath: ["selfArm"],
        value: createDeferredShape(() => recursive),
      },
    });
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(() => convertToArmObject(cyclic, recursive)).toThrow(/[Cc]ycle/);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6iDhro:
  // "visited is never cleared after a recursive branch returns, so it tracks every previously seen object rather than the active recursion stack. Reusing one acyclic nested object in two properties or array elements consequently throws Cycle detected while lowering ARM state. Remove each object from the set after finishing that branch (while retaining detection for active ancestors)."
  it("allows a shared acyclic object in separate branches", () => {
    const shared = { foo: 1 };
    expect(convertToArmObject({ items: [shared, shared] }, descriptor)).toEqual({
      itemsArm: [{ fooArm: 1 }, { fooArm: 1 }],
    });
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kYqHR:
  // "These ordinary-object lookups and assignments do not guard __proto__ (or use null-prototype dictionaries). A user-supplied record key with that name can traverse or mutate Object.prototype during lowering, and the value will not serialize as intended. Use own-key checks and safe dictionaries/definitions for path construction and merges."
  it("preserves __proto__ as an own lowered record key", () => {
    const byKey = Object.create(null) as Record<string, unknown>;
    byKey.__proto__ = { foo: 1 };

    const lowered = convertToArmObject({ byKey }, descriptor);
    const loweredRecord = lowered.byKeyArm as Record<string, unknown>;

    expect(Object.getPrototypeOf(loweredRecord)).toBeNull();
    expect(Object.prototype.hasOwnProperty.call(loweredRecord, "__proto__")).toBe(true);
    expect(loweredRecord.__proto__).toEqual({ fooArm: 1 });
  });
});

// ---------------------------------------------------------------------------
// convertToArmObject with discriminated nested models
// ---------------------------------------------------------------------------

describe("convertToArmObject with a discriminated nested model", () => {
  // Two variants that rename differently, so a wrong (or missing)
  // variant selection is observable in the output.
  const urlSigningKeyShape: FlatModelShape = createModelShape({
    type: { armPath: ["type"], value: { kind: "any" } },
    keyId: { armPath: ["keyIdArm"], value: { kind: "any" } },
    shared: { armPath: ["sharedArm"], value: { kind: "any" } },
  });

  const managedCertShape: FlatModelShape = createModelShape({
    type: { armPath: ["type"], value: { kind: "any" } },
    certName: { armPath: ["certNameArm"], value: { kind: "any" } },
    shared: { armPath: ["sharedArm"], value: { kind: "any" } },
  });

  // The merged, variant-agnostic view is derived from the variants at
  // runtime: `shared` is declared by both and they agree, `keyId` /
  // `certName` are each declared by exactly one variant so they carry
  // over verbatim.
  const secretShape = createDiscriminatedModelShape("type", {
    UrlSigningKey: urlSigningKeyShape,
    ManagedCertificate: createDeferredShape(() => managedCertShape),
  });

  const secretPropsShape: FlatModelShape = createModelShape({
    parameters: {
      armPath: ["parameters"],
      value: createDeferredShape(() => secretShape),
    },
  });

  it("selects the variant shape from the discriminator value", () => {
    const out = convertToArmObject(
      { parameters: { type: "UrlSigningKey", keyId: "k", shared: "s" } },
      secretPropsShape,
    );
    expect(out).toEqual({
      parameters: { type: "UrlSigningKey", keyIdArm: "k", sharedArm: "s" },
    });
  });

  it("dereferences a deferred variant entry", () => {
    const out = convertToArmObject(
      { parameters: { type: "ManagedCertificate", certName: "c" } },
      secretPropsShape,
    );
    expect(out).toEqual({
      parameters: { type: "ManagedCertificate", certNameArm: "c" },
    });
  });

  it("infers the variant when the discriminator is an expression", () => {
    // An `Expression<SecretType>` arrives as an object, so no variant
    // can be selected by value. `keyId` is declared by only one
    // variant, which identifies it.
    const expr = { kind: "identifier" };
    const out = convertToArmObject(
      { parameters: { type: expr, keyId: "k", shared: "s" } },
      secretPropsShape,
    );
    expect(out).toEqual({
      parameters: { type: expr, keyIdArm: "k", sharedArm: "s" },
    });
  });

  it("infers the other variant from its own distinguishing key", () => {
    const expr = { kind: "identifier" };
    const out = convertToArmObject({ parameters: { type: expr, certName: "c" } }, secretPropsShape);
    expect(out).toEqual({ parameters: { type: expr, certNameArm: "c" } });
  });

  it("round-trips a wire object whose discriminator is an ARM expression", () => {
    const wire = {
      parameters: { type: "[parameters('t')]", keyIdArm: "k", sharedArm: "s" },
    };
    const raised = convertFromArmObject(wire, secretPropsShape);
    expect(raised).toEqual({
      parameters: { type: "[parameters('t')]", keyId: "k", shared: "s" },
    });
    expect(convertToArmObject(raised, secretPropsShape)).toEqual(wire);
  });

  it("resolves a nested group keyed on a different field", () => {
    const siameseShape: FlatModelShape = createModelShape({
      kind: { armPath: ["kind"], value: { kind: "any" } },
      breed: { armPath: ["breed"], value: { kind: "any" } },
      meow: { armPath: ["meowArm"], value: { kind: "any" } },
    });
    const catShape = createDiscriminatedModelShape("breed", {
      siamese: siameseShape,
    });
    const petShape = createDiscriminatedModelShape("kind", { cat: catShape });
    const ownerShape: FlatModelShape = createModelShape({
      pet: { armPath: ["pet"], value: createDeferredShape(() => petShape) },
    });

    const out = convertToArmObject({ pet: { kind: "cat", breed: "siamese", meow: 3 } }, ownerShape);
    expect(out).toEqual({
      pet: { kind: "cat", breed: "siamese", meowArm: 3 },
    });
  });
});

// ---------------------------------------------------------------------------
// convertFromArmObject (inverse of convertToArmObject)
// ---------------------------------------------------------------------------

describe("convertFromArmObject", () => {
  // Anchor: current contract is *passthrough* for unconsumed wire keys.
  // If convertFromArmObject is ever tightened to reject unknown wire keys
  // (see plan item C2), these two tests are the trip-wires — they must
  // be updated together with the behavior change so residue-handling
  // semantics remain explicit.
  it("passes through unknown keys unchanged", () => {
    const out = convertFromArmObject({ other: 1 }, descriptor);
    expect(out).toEqual({ other: 1 });
  });

  it("inverts a single-segment rename", () => {
    const out = convertFromArmObject({ itemsArm: [] }, descriptor);
    expect(out).toEqual({ items: [] });
  });

  it("keeps JS keys for empty ARM paths while raising nested values", () => {
    const shape = createModelShape({
      value: { armPath: [], value: { kind: "any" } },
      nested: {
        armPath: [],
        value: createDeferredShape(() => innerShape),
      },
      missing: { armPath: [], value: { kind: "any" } },
    });

    expect(convertFromArmObject({ value: 1, nested: { fooArm: 2 }, other: 3 }, shape)).toEqual({
      value: 1,
      nested: { foo: 2 },
      other: 3,
    });
  });

  it("inverts a flatten (multi-segment path)", () => {
    const out = convertFromArmObject({ sku: { tier: "Standard" } }, descriptor);
    expect(out).toEqual({ tier: "Standard" });
  });

  it("round-trips through convertToArmObject", () => {
    const js = {
      props: { inner: { foo: 1 }, enabled: true },
      items: [{ foo: 2 }],
      byKey: { a: { foo: 3 } },
      tier: "Standard",
    };
    const wire = convertToArmObject(js, descriptor);
    const raised = convertFromArmObject(wire, descriptor);
    expect(raised).toEqual(js);
  });

  it("leaves ARM-shape residue under its original key when not covered", () => {
    // `sku.family` isn't in descriptor; `tier` flattens to `sku.tier`.
    // After raising, `tier` is lifted out and `sku.family` should
    // remain under `sku`.
    const out = convertFromArmObject({ sku: { tier: "Standard", family: "C" } }, descriptor);
    expect(out).toEqual({ tier: "Standard", sku: { family: "C" } });
  });

  it("does not mutate its input", () => {
    const input = { sku: { tier: "Standard" }, itemsArm: [{ fooArm: 1 }] };
    const snapshot = JSON.parse(JSON.stringify(input));
    convertFromArmObject(input, descriptor);
    expect(input).toEqual(snapshot);
  });

  it("detects cycles", () => {
    const recursive: FlatModelShape = createModelShape({
      self: {
        armPath: ["selfArm"],
        value: createDeferredShape(() => recursive),
      },
    });
    const cyclic: Record<string, unknown> = {};
    cyclic.selfArm = cyclic;
    expect(() => convertFromArmObject(cyclic, recursive)).toThrow(/[Cc]ycle/);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kYqH9:
  // "As in convertToArmObject, this WeakSet is never unwound, so a shared nested object is falsely reported as a cycle when raised a second time. Ensure state is removed on both the early !flat return and the normal return (preferably with try/finally)."
  it("allows a shared acyclic wire object in separate branches", () => {
    const shared = { fooArm: 1 };
    expect(convertFromArmObject({ itemsArm: [shared, shared] }, descriptor)).toEqual({
      items: [{ foo: 1 }, { foo: 1 }],
    });
  });
});

// ---------------------------------------------------------------------------
// @encode wire encoding
// ---------------------------------------------------------------------------

describe("@encode encoding/decoding", () => {
  const encDescriptor: FlatModelShape = createModelShape({
    createdAt: {
      armPath: ["createdAt"],
      value: {
        kind: "date",
        encoding: {
          kind: "date-time-text",
          source: "utcDateTime",
          format: "rfc3339",
          clientMode: "client",
          wire: { kind: "string" },
        },
      },
    },
    ts: {
      armPath: ["ts"],
      value: {
        kind: "date",
        encoding: {
          kind: "unix-timestamp",
          source: "utcDateTime",
          unit: "seconds",
          clientMode: "client",
          wire: { kind: "integer", scalar: "int32" },
        },
      },
    },
    thumbprint: {
      armPath: ["thumbprint"],
      value: {
        kind: "bytes",
        encoding: {
          kind: "bytes",
          source: "bytes",
          format: "base64url",
          clientMode: "client",
          wire: { kind: "string" },
        },
      },
    },
    retention: {
      armPath: ["retention"],
      value: {
        kind: "number",
        encoding: {
          kind: "duration-numeric",
          source: "duration",
          unit: "seconds",
          clientMode: "wire",
          wire: { kind: "integer", scalar: "int32" },
        },
      },
    },
    observedAt: {
      armPath: ["observedAt"],
      value: createStringShape({
        kind: "date-time-text",
        source: "offsetDateTime",
        format: "rfc3339",
        clientMode: "wire",
        wire: { kind: "string" },
      }),
    },
    localDate: {
      armPath: ["localDate"],
      value: createDateShape({
        kind: "plain-date",
        source: "plainDate",
        clientMode: "client",
        wire: { kind: "string" },
      }),
    },
    encodedCount: {
      armPath: ["encodedCount"],
      value: createStringShape({
        kind: "numeric-string",
        source: "integer",
        sourceScalar: "int32",
        clientMode: "wire",
        wire: { kind: "string" },
      }),
    },
    decimal128Text: {
      armPath: ["decimal128Text"],
      value: createStringShape({
        kind: "numeric-string",
        source: "number",
        sourceScalar: "decimal128",
        clientMode: "wire",
        wire: { kind: "string" },
      }),
    },
    enabled: {
      armPath: ["enabled"],
      value: createBooleanShape({
        kind: "boolean-string",
        source: "boolean",
        clientMode: "client",
        wire: { kind: "string" },
      }),
    },
    timestamps: {
      armPath: ["timestamps"],
      value: createArrayShape(
        createDateShape({
          kind: "unix-timestamp",
          source: "utcDateTime",
          unit: "seconds",
          clientMode: "client",
          wire: { kind: "integer", scalar: "int32" },
        }),
      ),
    },
    timestampsByName: {
      armPath: ["timestampsByName"],
      value: createRecordShape(
        createDateShape({
          kind: "unix-timestamp",
          source: "utcDateTime",
          unit: "seconds",
          clientMode: "client",
          wire: { kind: "integer", scalar: "int32" },
        }),
      ),
    },
    tuple: {
      armPath: ["tuple"],
      value: createTupleShape([
        createDateShape({
          kind: "date-time-text",
          source: "utcDateTime",
          format: "rfc3339",
          clientMode: "client",
          wire: { kind: "string" },
        }),
        createBooleanShape({
          kind: "boolean-string",
          source: "boolean",
          clientMode: "client",
          wire: { kind: "string" },
        }),
      ]),
    },
  });

  const wireClientDescriptor: FlatModelShape = createModelShape({
    timestamp: {
      armPath: ["timestamp"],
      value: createNumberShape({
        kind: "unix-timestamp",
        source: "utcDateTime",
        unit: "seconds",
        clientMode: "wire",
        wire: { kind: "integer", scalar: "int64" },
      }),
    },
    payload: {
      armPath: ["payload"],
      value: createStringShape({
        kind: "bytes",
        source: "bytes",
        format: "base64url",
        clientMode: "wire",
        wire: { kind: "string" },
      }),
    },
    localDate: {
      armPath: ["localDate"],
      value: createStringShape({
        kind: "plain-date",
        source: "plainDate",
        clientMode: "wire",
        wire: { kind: "string" },
      }),
    },
    enabled: {
      armPath: ["enabled"],
      value: createStringShape({
        kind: "boolean-string",
        source: "boolean",
        clientMode: "wire",
        wire: { kind: "string" },
      }),
    },
  });

  it("convertToArmObject: Date → rfc3339 ISO string", () => {
    const d = new Date(Date.UTC(2024, 0, 2, 3, 4, 5));
    const out = convertToArmObject({ createdAt: d }, encDescriptor);
    expect(out).toEqual({ createdAt: d.toISOString() });
  });

  it("convertToArmObject: Date → unixTimestamp seconds (int)", () => {
    const d = new Date(Date.UTC(2024, 0, 2, 3, 4, 5));
    const out = convertToArmObject({ ts: d }, encDescriptor);
    expect(out).toEqual({ ts: Math.floor(d.getTime() / 1000) });
  });

  it("preserves wire-mode client representations", () => {
    const wireValue = {
      timestamp: 1_893_456_000,
      payload: "-_8-",
      localDate: "2030-01-01",
      enabled: "false",
    };

    expect(convertToArmObject(wireValue, wireClientDescriptor)).toEqual(wireValue);
    expect(convertFromArmObject(wireValue, wireClientDescriptor)).toEqual(wireValue);
  });

  it("lowers and raises tuple values using their positional shapes", () => {
    const date = new Date(Date.UTC(2024, 0, 2, 3, 4, 5));
    const lowered = convertToArmObject({ tuple: [date, true] }, encDescriptor);
    expect(lowered).toEqual({ tuple: [date.toISOString(), "true"] });
    expect(convertFromArmObject(lowered, encDescriptor)).toEqual({
      tuple: [date, true],
    });
  });

  it("rejects Unix timestamp precision loss", () => {
    expect(() =>
      convertToArmObject({ ts: new Date("2024-01-02T03:04:05.123Z") }, encDescriptor),
    ).toThrow(/lose millisecond precision/);
  });

  it("convertToArmObject: Uint8Array → base64url", () => {
    const bytes = new Uint8Array([0xfb, 0xff, 0x3e]); // base64 = "+/8+", base64url = "-_8-"
    const out = convertToArmObject({ thumbprint: bytes }, encDescriptor);
    expect(out).toEqual({ thumbprint: "-_8-" });
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6kZZ86:
  // "This loop repeatedly appends each chunk to the accumulated string, which can copy the entire prefix on every iteration and make base64 conversion quadratic for large byte arrays. Accumulate chunk strings and join once before calling btoa."
  it("encodes byte arrays spanning multiple chunks", () => {
    const bytes = new Uint8Array(0x10001).fill(0xff);
    const out = convertToArmObject({ thumbprint: bytes }, encDescriptor);
    expect(out.thumbprint).toBe(`${"_".repeat(87382)}8`);
  });

  it("convertToArmObject: numeric duration passes through unchanged", () => {
    const out = convertToArmObject({ retention: 3600 }, encDescriptor);
    expect(out).toEqual({ retention: 3600 });
  });

  it("validates offsetDateTime and numeric-string wire clients", () => {
    expect(
      convertToArmObject(
        {
          observedAt: "2026-09-16T10:00:00+02:00",
          encodedCount: "42",
        },
        encDescriptor,
      ),
    ).toEqual({
      observedAt: "2026-09-16T10:00:00+02:00",
      encodedCount: "42",
    });
    expect(() => convertToArmObject({ encodedCount: 42 }, encDescriptor)).toThrow(
      /canonical numeric string/,
    );
    expect(() => convertToArmObject({ encodedCount: "1.5" }, encDescriptor)).toThrow(
      /canonical numeric string/,
    );
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6komHu:
  // "For string-encoded decimal, decimal128, and numeric values, converting to JavaScript Number rejects valid finite wire values outside the Number exponent range (for example, decimal128 values above 1e308). This wire-string mode is intended to preserve ranges that JavaScript numbers cannot represent; validate against the declared scalar's range without converting through Number."
  it("accepts decimal128 strings outside the JavaScript Number range", () => {
    expect(convertToArmObject({ decimal128Text: "1e6144" }, encDescriptor)).toEqual({
      decimal128Text: "1e6144",
    });
    expect(() => convertToArmObject({ decimal128Text: "1e6145" }, encDescriptor)).toThrow(
      /outside 'decimal128' range/,
    );
  });

  it("round-trips boolean-to-string encoding", () => {
    const wire = convertToArmObject({ enabled: true }, encDescriptor);
    expect(wire).toEqual({ enabled: "true" });
    expect(convertFromArmObject({ enabled: "true" }, encDescriptor)).toEqual({
      enabled: true,
    });
    expect(() => convertFromArmObject({ enabled: "TRUE" }, encDescriptor)).toThrow(
      /'true' or 'false'/,
    );
  });

  it("round-trips encoded nullable scalars and numeric/boolean literals", () => {
    const booleanEncoding = {
      kind: "boolean-string",
      source: "boolean",
      clientMode: "client",
      wire: { kind: "string" },
    } as const;
    const numericEncoding = {
      kind: "numeric-string",
      source: "integer",
      sourceScalar: "integer",
      clientMode: "wire",
      wire: { kind: "string" },
    } as const;
    const shape = createModelShape({
      nullableBoolean: {
        armPath: ["nullableBoolean"],
        value: createBooleanShape(booleanEncoding),
      },
      nullableNumber: {
        armPath: ["nullableNumber"],
        value: createStringShape(numericEncoding),
      },
      fixedBoolean: {
        armPath: ["fixedBoolean"],
        value: createBooleanLiteralShape(booleanEncoding),
      },
      fixedNumber: {
        armPath: ["fixedNumber"],
        value: createNumberLiteralShape(numericEncoding),
      },
    });

    const client = {
      nullableBoolean: true,
      nullableNumber: "41",
      fixedBoolean: true,
      fixedNumber: "42",
    };
    const wire = {
      nullableBoolean: "true",
      nullableNumber: "41",
      fixedBoolean: "true",
      fixedNumber: "42",
    };

    expect(convertToArmObject(client, shape)).toEqual(wire);
    expect(convertFromArmObject(wire, shape)).toEqual(client);
    expect(convertToArmObject({ nullableBoolean: null, nullableNumber: null }, shape)).toEqual({
      nullableBoolean: null,
      nullableNumber: null,
    });
  });

  it("rejects malformed date and base64 text", () => {
    expect(() => convertToArmObject({ observedAt: "2024-02-30T00:00:00Z" }, encDescriptor)).toThrow(
      /rfc3339/,
    );
    expect(() => convertToArmObject({ observedAt: "2024-01-01T24:00:00Z" }, encDescriptor)).toThrow(
      /rfc3339/,
    );
    expect(() => convertToArmObject({ localDate: new Date("invalid") }, encDescriptor)).toThrow(
      /valid Date/,
    );
    expect(() => convertFromArmObject({ thumbprint: "AB" }, encDescriptor)).toThrow(
      /canonical base64url/,
    );
  });

  it("accepts valid RFC3339 representations when restoring UTC dates", () => {
    expect(convertFromArmObject({ createdAt: "2024-01-01T00:00:00Z" }, encDescriptor)).toEqual({
      createdAt: new Date("2024-01-01T00:00:00Z"),
    });
    expect(convertFromArmObject({ createdAt: "2024-01-01T02:00:00+02:00" }, encDescriptor)).toEqual(
      {
        createdAt: new Date("2024-01-01T00:00:00Z"),
      },
    );
  });

  it("rejects RFC7231 millisecond precision loss", () => {
    const shape = createModelShape({
      createdAt: {
        armPath: ["createdAt"],
        value: createDateShape({
          kind: "date-time-text",
          source: "utcDateTime",
          format: "rfc7231",
          clientMode: "client",
          wire: { kind: "string" },
        }),
      },
    });
    expect(() =>
      convertToArmObject({ createdAt: new Date("2024-01-01T00:00:00.001Z") }, shape),
    ).toThrow(/lose millisecond precision/);
  });

  it("converts offsetDateTime strings between RFC3339 and RFC7231", () => {
    const shape = createModelShape({
      observedAt: {
        armPath: ["observedAt"],
        value: createStringShape({
          kind: "date-time-text",
          source: "offsetDateTime",
          format: "rfc7231",
          clientMode: "wire",
          wire: { kind: "string" },
        }),
      },
    });
    const client = "2026-09-16T07:00:00+02:00";
    const wire = convertToArmObject({ observedAt: client }, shape);
    expect(wire).toEqual({
      observedAt: "Wed, 16 Sep 2026 05:00:00 GMT",
    });
    expect(convertFromArmObject(wire, shape)).toEqual({
      observedAt: "2026-09-16T05:00:00.000Z",
    });
    expect(() =>
      convertToArmObject({ observedAt: "Wed, 16 Sep 2026 05:00:00 GMT" }, shape),
    ).toThrow(/rfc3339/);
    expect(() =>
      convertToArmObject({ observedAt: "2026-09-16T07:00:00.001+02:00" }, shape),
    ).toThrow(/lose subsecond precision/);
  });

  it("accepts full int64 numeric strings without Number coercion", () => {
    const shape = createModelShape({
      value: {
        armPath: ["value"],
        value: createStringShape({
          kind: "numeric-string",
          source: "integer",
          sourceScalar: "int64",
          clientMode: "wire",
          wire: { kind: "string" },
        }),
      },
    });
    expect(convertToArmObject({ value: "9223372036854775807" }, shape)).toEqual({
      value: "9223372036854775807",
    });
  });

  it("rejects Unix timestamps outside the JavaScript Date range", () => {
    const shape = createModelShape({
      ts: {
        armPath: ["ts"],
        value: createDateShape({
          kind: "unix-timestamp",
          source: "utcDateTime",
          unit: "seconds",
          clientMode: "client",
          wire: { kind: "integer", scalar: "int64" },
        }),
      },
    });
    expect(() => convertFromArmObject({ ts: Number.MAX_SAFE_INTEGER }, shape)).toThrow(
      /Date range/,
    );
  });

  it("round-trips plainDate through YYYY-MM-DD", () => {
    const date = new Date("2026-09-16T00:00:00.000Z");
    const wire = convertToArmObject({ localDate: date }, encDescriptor);
    expect(wire).toEqual({ localDate: "2026-09-16" });
    const restored = convertFromArmObject(wire, encDescriptor);
    expect((restored.localDate as Date).toISOString()).toBe("2026-09-16T00:00:00.000Z");
    expect(() =>
      convertToArmObject({ localDate: new Date("2026-09-16T12:00:00.000Z") }, encDescriptor),
    ).toThrow(/UTC midnight/);
  });

  it("recursively encodes arrays and records at their declared leaves", () => {
    const date = new Date(Date.UTC(2024, 0, 2, 3, 4, 5));
    const seconds = date.getTime() / 1000;
    expect(
      convertToArmObject(
        {
          timestamps: [date],
          timestampsByName: { first: date },
        },
        encDescriptor,
      ),
    ).toEqual({
      timestamps: [seconds],
      timestampsByName: { first: seconds },
    });
  });

  it("preserves expression proxies in encoded leaves", () => {
    const expression = wrapExpression<Date>(symbolicValueExpressionNode<Date, string>("timestamp"));
    const lowered = convertToArmObject(
      {
        timestamps: [expression],
        timestampsByName: { first: expression },
      },
      encDescriptor,
    );
    expect(isExpression((lowered.timestamps as unknown[])[0])).toBe(true);
    expect(isExpression((lowered.timestampsByName as Record<string, unknown>).first)).toBe(true);
  });

  it("preserves raw expression nodes in encoded leaves", () => {
    const expression = symbolicValueExpressionNode<Date, string>("timestamp");
    const lowered = convertToArmObject({ ts: expression }, encDescriptor);
    expect(lowered.ts).toBe(expression);
    expect(convertFromArmObject(lowered, encDescriptor).ts).toBe(expression);
  });

  it("convertToArmObject rejects pre-encoded semantic values", () => {
    expect(() =>
      convertToArmObject({ createdAt: "2024-01-02T03:04:05.000Z" }, encDescriptor),
    ).toThrow(/Expected a valid Date/);
  });

  it("convertFromArmObject: rfc3339 string → Date", () => {
    const iso = "2024-01-02T03:04:05.000Z";
    const out = convertFromArmObject({ createdAt: iso }, encDescriptor);
    expect(out.createdAt).toBeInstanceOf(Date);
    expect((out.createdAt as Date).toISOString()).toBe(iso);
  });

  it("convertFromArmObject: unixTimestamp number → Date", () => {
    const seconds = 1704164645;
    const out = convertFromArmObject({ ts: seconds }, encDescriptor);
    expect(out.ts).toBeInstanceOf(Date);
    expect((out.ts as Date).getTime()).toBe(seconds * 1000);
  });

  it("convertFromArmObject: base64url → Uint8Array", () => {
    const out = convertFromArmObject({ thumbprint: "-_8-" }, encDescriptor);
    expect(out.thumbprint).toBeInstanceOf(Uint8Array);
    expect(Array.from(out.thumbprint as Uint8Array)).toEqual([0xfb, 0xff, 0x3e]);
  });

  it("round-trips Date through convertToArmObject → convertFromArmObject", () => {
    const d = new Date(Date.UTC(2024, 0, 2, 3, 4, 5));
    const wire = convertToArmObject({ createdAt: d }, encDescriptor);
    const back = convertFromArmObject(wire, encDescriptor);
    expect((back.createdAt as Date).toISOString()).toBe(d.toISOString());
  });

  it("round-trips an encoded property with an empty ARM path", () => {
    const shape = createModelShape({
      createdAt: {
        ...encDescriptor.byJsName.createdAt!,
        armPath: [],
      },
    });
    const date = new Date(Date.UTC(2024, 0, 2, 3, 4, 5));
    const wire = convertToArmObject({ createdAt: date }, shape);

    expect(wire).toEqual({ createdAt: date.toISOString() });
    expect(convertFromArmObject(wire, shape)).toEqual({ createdAt: date });
  });
});
