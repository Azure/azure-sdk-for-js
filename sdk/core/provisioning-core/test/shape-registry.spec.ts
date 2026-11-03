// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { createFlatModelShape } from "../src/shape/shape.js";
import { getShape, registerShape } from "../src/shape/shape-registry.js";

describe("resource shape registry variants", () => {
  const apiVersion = "2026-01-01";
  const kind = { jsName: "kind", armName: "wireKind" };
  const breed = { jsName: "breed", armName: "wireBreed" };
  const cat = createFlatModelShape({
    meow: { armPath: ["meow"], value: { kind: "any" } },
  });
  const siamese = createFlatModelShape({
    points: { armPath: ["points"], value: { kind: "any" } },
  });
  const dog = createFlatModelShape({
    bark: { armPath: ["bark"], value: { kind: "any" } },
  });

  registerShape("Contoso.Shapes/animals", apiVersion, cat, [
    { discriminator: kind, value: "cat" },
    { discriminator: breed, value: "persian" },
  ]);
  registerShape("Contoso.Shapes/animals", apiVersion, siamese, [
    { discriminator: kind, value: "cat" },
    { discriminator: breed, value: "siamese" },
  ]);
  registerShape("Contoso.Shapes/animals", apiVersion, dog, [{ discriminator: kind, value: "dog" }]);

  it("resolves simple and nested paths under JS names", () => {
    expect(getShape("Contoso.Shapes/animals", apiVersion, { kind: "dog" })).toBe(dog);
    expect(
      getShape("Contoso.Shapes/animals", apiVersion, {
        kind: "cat",
        breed: "siamese",
      }),
    ).toBe(siamese);
  });

  it("resolves paths under ARM names", () => {
    expect(
      getShape(
        "Contoso.Shapes/animals",
        apiVersion,
        { wireKind: "cat", wireBreed: "siamese" },
        { valueKeyedBy: "arm" },
      ),
    ).toBe(siamese);
  });

  it("does not infer a variant when a discriminator is not exact", () => {
    expect(
      getShape("Contoso.Shapes/animals", apiVersion, {
        kind: "cat",
        breed: { expression: true },
        points: 12,
      }),
    ).toBeUndefined();
  });

  it("rejects flat and variant registration for the same resource key", () => {
    const type = "Contoso.Shapes/mixed";
    registerShape(type, apiVersion, cat);
    expect(() =>
      registerShape(type, apiVersion, dog, [{ discriminator: kind, value: "dog" }]),
    ).toThrow(/a flat target is already registered/);
  });

  it("uses API-version fallback only when requested", () => {
    const type = "Contoso.Shapes/versioned";
    const oldShape = createFlatModelShape({
      old: { armPath: ["old"], value: { kind: "any" } },
    });
    const newShape = createFlatModelShape({
      current: { armPath: ["current"], value: { kind: "any" } },
    });
    registerShape(type, "2024-01-01", oldShape);
    registerShape(type, "2025-01-01", newShape);

    expect(getShape(type, "2099-01-01", {})).toBeUndefined();
    expect(getShape(type, "2099-01-01", {}, { strict: false })).toBe(newShape);
  });
});
