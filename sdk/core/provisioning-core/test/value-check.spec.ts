// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import { Stack } from "../src/constructs/stack.js";
import { assertValueAssignableToType } from "../src/util.js";

describe("assertValueAssignableToType", () => {
  it("passes matching literals", () => {
    expect(() => assertValueAssignableToType("hi", "string")).not.toThrow();
    expect(() => assertValueAssignableToType(3, "int")).not.toThrow();
    expect(() => assertValueAssignableToType(true, "bool")).not.toThrow();
    expect(() => assertValueAssignableToType({ a: 1 }, "object")).not.toThrow();
    expect(() => assertValueAssignableToType([1, 2], "array")).not.toThrow();
  });

  it("throws on mismatched literals", () => {
    expect(() => assertValueAssignableToType(5, "string")).toThrow(
      /expected type "string" but got number/,
    );
    expect(() => assertValueAssignableToType("x", "int")).toThrow(
      /expected type "int" but got string/,
    );
    expect(() => assertValueAssignableToType(1.5, "int")).toThrow(/non-integer number/);
    expect(() => assertValueAssignableToType([], "object")).toThrow(/but got array/);
    expect(() => assertValueAssignableToType("no", "bool")).toThrow(/expected type "bool"/);
  });

  it("includes the label in the message", () => {
    expect(() => assertValueAssignableToType(5, "string", 'Deployment parameter "p"')).toThrow(
      'Deployment parameter "p" expected type "string" but got number.',
    );
  });

  it("skips undefined", () => {
    expect(() => assertValueAssignableToType(undefined, "string")).not.toThrow();
  });

  it("skips expressions and resource views (deferred to the type system)", () => {
    const stack = new Stack("t");
    const env = stack.parameters.add("env", "string");
    // An expression of the 'wrong' type is not validated at runtime.
    expect(() => assertValueAssignableToType(env, "int")).not.toThrow();
  });

  it("'any' type performs no check", () => {
    expect(() => assertValueAssignableToType({ x: 1 }, "any")).not.toThrow();
    expect(() => assertValueAssignableToType("anything", "any")).not.toThrow();
  });
});

describe("collections validate literal values", () => {
  it("parameter rejects a default of the wrong type", () => {
    const stack = new Stack("t");
    expect(() =>
      // Cast bypasses the compile-time check to exercise the runtime guard.
      stack.parameters.add("port", "int", {
        defaultValue: "80" as never,
      }),
    ).toThrow(/Deployment parameter "port" expected type "int"/);
  });

  it("parameter accepts an expression default", () => {
    const stack = new Stack("t");
    const a = stack.parameters.add("a", "string");
    expect(() => stack.parameters.add("b", "string", { defaultValue: a })).not.toThrow();
  });

  it("output rejects a literal of the wrong primitive type", () => {
    const stack = new Stack("t");
    expect(() => stack.outputs.add("ok", "bool", "yes" as never)).toThrow(
      /Deployment output "ok" expected type "bool"/,
    );
  });

  it("output accepts an expression value", () => {
    const stack = new Stack("t");
    const a = stack.parameters.add("a", "string");
    expect(() => stack.outputs.add("o", "string", a)).not.toThrow();
  });
});
