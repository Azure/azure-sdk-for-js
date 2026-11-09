// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { unwrapExpression, wrapExpression } from "../src/expression/expressions.js";
import type {
  ExpressionNode,
  PropertyAccessExpressionNode,
  ArrayAccessExpressionNode,
} from "../src/expression/ast-nodes.js";
import {
  createArrayShape,
  type FlatModelShape,
  createFlatModelShape,
  createRecordShape,
  createTupleShape,
  createDeferredShape,
} from "../src/shape/shape.js";

// Build a handful of hand-written descriptors used by the tests below.
// These mirror the structure the emitter generates but are small enough
// to reason about.

// Simple rename: .foo -> "fooArm"
const renameDescriptor: FlatModelShape = createFlatModelShape({
  foo: {
    armPath: ["fooArm"],
    value: { kind: "any" },
  },
});

// Flatten: .name hoisted through "properties" on the wire.
const flattenDescriptor: FlatModelShape = createFlatModelShape({
  name: { armPath: ["properties", "name"], value: { kind: "any" } },
});

// Nested: .props.inner.name where each hop is a model.
const innerShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["nameArm"], value: { kind: "any" } },
});

const propsShape: FlatModelShape = createFlatModelShape({
  inner: {
    armPath: ["inner"],
    value: createDeferredShape(() => innerShape),
  },
});

const nestedDescriptor: FlatModelShape = createFlatModelShape({
  props: {
    armPath: ["properties"],
    value: createDeferredShape(() => propsShape),
  },
});

// Array of models: items[0].name
const arrayDescriptor: FlatModelShape = createFlatModelShape({
  items: {
    armPath: ["itemsArm"],
    value: createArrayShape(createDeferredShape(() => innerShape)),
  },
});

// Record of models: byKey["x"].name
const recordDescriptor: FlatModelShape = createFlatModelShape({
  byKey: {
    armPath: ["byKeyArm"],
    value: createRecordShape(createDeferredShape(() => innerShape)),
  },
});

const tupleDescriptor: FlatModelShape = createFlatModelShape({
  pair: {
    armPath: ["pairArm"],
    value: createTupleShape([{ kind: "any" }, createDeferredShape(() => innerShape)]),
  },
});

function asPropertyAccess(node: ExpressionNode): PropertyAccessExpressionNode {
  if (node.kind !== "property-access") {
    throw new Error(`Expected property access, got ${node.kind}`);
  }
  return node;
}

function asArrayAccess(node: ExpressionNode): ArrayAccessExpressionNode {
  if (node.kind !== "array-access") {
    throw new Error(`Expected array access, got ${node.kind}`);
  }
  return node as ArrayAccessExpressionNode;
}

describe("wrapExpression shape stamping", () => {
  const base: ExpressionNode = { kind: "identifier", name: "r" } as any;

  it("stamps a simple property access", () => {
    const proxy = wrapExpression<any>(base, renameDescriptor);
    const node = unwrapExpression((proxy as any).foo);
    const pa = asPropertyAccess(node);
    expect(pa.property).toBe("foo");
    expect(pa.armPath).toEqual(["fooArm"]);
  });

  it("leaves unknown properties unstamped (passthrough)", () => {
    const proxy = wrapExpression<any>(base, renameDescriptor);
    const node = unwrapExpression((proxy as any).unknown);
    const pa = asPropertyAccess(node);
    expect(pa.property).toBe("unknown");
    expect(pa.armPath).toBeUndefined();
  });

  it("stamps flatten paths with multi-segment armPath", () => {
    const proxy = wrapExpression<any>(base, flattenDescriptor);
    const node = unwrapExpression((proxy as any).name);
    const pa = asPropertyAccess(node);
    expect(pa.armPath).toEqual(["properties", "name"]);
  });

  it("threads stamps through nested models", () => {
    const proxy = wrapExpression<any>(base, nestedDescriptor);
    const node = unwrapExpression((proxy as any).props.inner.name);
    const inner = asPropertyAccess(node);
    expect(inner.armPath).toEqual(["nameArm"]);
    const mid = asPropertyAccess(inner.base);
    expect(mid.armPath).toEqual(["inner"]);
    const outer = asPropertyAccess(mid.base);
    expect(outer.armPath).toEqual(["properties"]);
  });

  it("peels arrays through index access", () => {
    const proxy = wrapExpression<any>(base, arrayDescriptor);
    const node = unwrapExpression((proxy as any).items[0].name);
    const nameAccess = asPropertyAccess(node);
    expect(nameAccess.armPath).toEqual(["nameArm"]);
    const idxAccess = asArrayAccess(nameAccess.base);
    expect(idxAccess.index).toBe(0);
    const itemsAccess = asPropertyAccess(idxAccess.base);
    expect(itemsAccess.armPath).toEqual(["itemsArm"]);
  });

  it("selects tuple shapes by index", () => {
    const proxy = wrapExpression<any>(base, tupleDescriptor);
    const node = unwrapExpression((proxy as any).pair[1].name);
    const nameAccess = asPropertyAccess(node);
    expect(nameAccess.armPath).toEqual(["nameArm"]);
    const indexAccess = asArrayAccess(nameAccess.base);
    expect(indexAccess.index).toBe(1);
  });

  it("peels records through key access", () => {
    const proxy = wrapExpression<any>(base, recordDescriptor);
    const node = unwrapExpression((proxy as any).byKey["x"].name);
    // String key yields property-access for valid identifiers ("x").
    const nameAccess = asPropertyAccess(node);
    expect(nameAccess.armPath).toEqual(["nameArm"]);
  });

  it("treats accesses below an untyped point as passthrough", () => {
    const proxy = wrapExpression<any>(base, renameDescriptor);
    // `.foo` is stamped; `.foo.bar` is below a terminal value so
    // the next `.bar` is passthrough.
    const node = unwrapExpression((proxy as any).foo.bar);
    const bar = asPropertyAccess(node);
    expect(bar.armPath).toBeUndefined();
    const foo = asPropertyAccess(bar.base);
    expect(foo.armPath).toEqual(["fooArm"]);
  });
});
