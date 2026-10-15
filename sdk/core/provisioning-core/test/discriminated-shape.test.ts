// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  createArrayShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createFlatModelShape,
  navigateShape,
  resolveModelShape,
  type DiscriminatedModelShape,
  type FlatModelShape,
} from "../src/shape/shape.js";

// ---------------------------------------------------------------------------
// Fixtures
//
// Modelled on the two shapes ARM actually produces:
//
//  - `secret` — a single-level `@discriminator("type")` group, like
//    CDN's `SecretParameters`. This is also the shape a hierarchy with
//    abstract intermediates collapses to (A <- B <- C all keyed on the
//    same field), since the emitter flattens those to one level.
//
//  - `pet` — a two-level group where a variant is itself a
//    discriminated base on a *different* field, i.e. TypeSpec's
//    "Nested Discriminator" form:
//      @discriminator("kind")  model Pet
//      @discriminator("breed") model Cat extends Pet { kind: "cat" }
//                              model Siamese extends Cat { breed: "siamese" }
//
// Variants rename differently, so a wrong or missing variant selection
// is observable rather than coincidentally correct.
// ---------------------------------------------------------------------------

const urlSigningKeyShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"], value: { kind: "any" } },
  keyId: { armPath: ["keyIdArm"], value: { kind: "any" } },
  shared: { armPath: ["sharedArm"], value: { kind: "any" } },
});

const managedCertShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"], value: { kind: "any" } },
  certName: { armPath: ["certNameArm"], value: { kind: "any" } },
  shared: { armPath: ["sharedArm"], value: { kind: "any" } },
});

const secretShape: DiscriminatedModelShape = createDiscriminatedModelShape("type", {
  UrlSigningKey: urlSigningKeyShape,
  // Deferred entry — the emitter uses these to survive cyclic /
  // out-of-order module evaluation.
  ManagedCertificate: createDeferredShape(() => managedCertShape),
});

const siameseShape: FlatModelShape = createFlatModelShape({
  kind: { armPath: ["kind"], value: { kind: "any" } },
  breed: { armPath: ["breed"], value: { kind: "any" } },
  meow: { armPath: ["meowArm"], value: { kind: "any" } },
});

const catShape: DiscriminatedModelShape = createDiscriminatedModelShape("breed", {
  siamese: createDeferredShape(() => siameseShape),
});

const dogShape: FlatModelShape = createFlatModelShape({
  kind: { armPath: ["kind"], value: { kind: "any" } },
  bark: { armPath: ["barkArm"], value: { kind: "any" } },
});

const petShape: DiscriminatedModelShape = createDiscriminatedModelShape("kind", {
  cat: catShape,
  dog: dogShape,
});

// ---------------------------------------------------------------------------
// resolveModelShape — discriminator present
// ---------------------------------------------------------------------------

describe("resolveModelShape", () => {
  it("returns undefined for an undefined shape", () => {
    expect(resolveModelShape(undefined, {})).toBeUndefined();
  });

  it("returns a flat shape as-is", () => {
    expect(resolveModelShape(urlSigningKeyShape, {})).toBe(urlSigningKeyShape);
  });

  it("selects a variant by discriminator value", () => {
    expect(resolveModelShape(secretShape, { type: "UrlSigningKey" })).toBe(urlSigningKeyShape);
  });

  it("dereferences a deferred variant entry", () => {
    expect(resolveModelShape(secretShape, { type: "ManagedCertificate" })).toBe(managedCertShape);
  });

  it("resolves through a nested group keyed on a different field", () => {
    expect(resolveModelShape(petShape, { kind: "cat", breed: "siamese" })).toBe(siameseShape);
  });

  it("resolves a single-hop variant in a nested group", () => {
    expect(resolveModelShape(petShape, { kind: "dog" })).toBe(dogShape);
  });

  it("returns undefined when there is no value to work from", () => {
    expect(resolveModelShape(secretShape, undefined)).toBeUndefined();
  });

  it("reads a renamed discriminator under each side's own naming", () => {
    // `@clientName("petKind") kind: string` — state holds `petKind`,
    // wire JSON holds `kind`, and one shape has to serve both.
    const catShapeFlat = createFlatModelShape({
      petKind: { armPath: ["kind"], value: { kind: "any" } },
      meow: { armPath: ["meowArm"], value: { kind: "any" } },
    });
    const renamed = createDiscriminatedModelShape(
      { jsName: "petKind", armName: "kind" },
      { cat: catShapeFlat },
    );

    expect(resolveModelShape(renamed, { petKind: "cat" }, "js")).toBe(catShapeFlat);
    expect(resolveModelShape(renamed, { kind: "cat" }, "arm")).toBe(catShapeFlat);
  });

  it("terminates on a cyclic byValue graph", () => {
    const a: DiscriminatedModelShape = createDiscriminatedModelShape("kind", {
      loop: createDeferredShape(() => b),
    });
    const b: DiscriminatedModelShape = createDiscriminatedModelShape("kind", {
      loop: createDeferredShape(() => a),
    });
    expect(() => resolveModelShape(a, { kind: "loop" })).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// resolveModelShape — discriminator unusable, variant inferred
// ---------------------------------------------------------------------------

describe("resolveModelShape variant inference", () => {
  it("infers from a distinguishing key when the discriminator is an expression", () => {
    // An `Expression<SecretType>` reaches the serializer as an object,
    // never a string literal. `keyId` is declared by only one variant.
    const expr = { __brand: "expression" };
    expect(resolveModelShape(secretShape, { type: expr, keyId: "k", shared: "s" })).toBe(
      urlSigningKeyShape,
    );
    expect(
      resolveModelShape(secretShape, {
        type: expr,
        certName: "c",
        shared: "s",
      }),
    ).toBe(managedCertShape);
  });

  it("infers when the discriminator names an unknown variant", () => {
    expect(resolveModelShape(secretShape, { type: "SomethingNew", keyId: "k" })).toBe(
      urlSigningKeyShape,
    );
  });

  it("infers when the discriminator is absent entirely", () => {
    expect(resolveModelShape(secretShape, { certName: "c" })).toBe(managedCertShape);
  });

  it("infers through a nested group when the inner discriminator is unusable", () => {
    // `kind` resolves to Cat; `breed` does not, so Cat's own variants
    // are inferred from the payload.
    expect(resolveModelShape(petShape, { kind: "cat", meow: 3 })).toBe(siameseShape);
  });

  it("scores recursively to break a top-level tie", () => {
    // Both variants declare exactly { name, parameters } — the CDN
    // delivery-rule case. Only the nested keys tell them apart.
    const redirectParams = createFlatModelShape({
      redirectType: { armPath: ["redirectTypeArm"], value: { kind: "any" } },
    });
    const rewriteParams = createFlatModelShape({
      sourcePattern: { armPath: ["sourcePatternArm"], value: { kind: "any" } },
    });
    const redirect = createFlatModelShape({
      name: { armPath: ["name"], value: { kind: "any" } },
      parameters: {
        armPath: ["parameters"],
        value: createDeferredShape(() => redirectParams),
      },
    });
    const rewrite = createFlatModelShape({
      name: { armPath: ["name"], value: { kind: "any" } },
      parameters: {
        armPath: ["parameters"],
        value: createDeferredShape(() => rewriteParams),
      },
    });
    const action = createDiscriminatedModelShape("name", {
      UrlRedirect: redirect,
      UrlRewrite: rewrite,
    });

    const expr = { __brand: "expression" };
    expect(
      resolveModelShape(action, {
        name: expr,
        parameters: { sourcePattern: "/a" },
      }),
    ).toBe(rewrite);
  });

  it("scores through array elements", () => {
    const aItem = createFlatModelShape({
      onlyA: { armPath: ["onlyAArm"], value: { kind: "any" } },
    });
    const bItem = createFlatModelShape({
      onlyB: { armPath: ["onlyBArm"], value: { kind: "any" } },
    });
    const a = createFlatModelShape({
      items: {
        armPath: ["items"],
        value: createArrayShape(createDeferredShape(() => aItem)),
      },
    });
    const b = createFlatModelShape({
      items: {
        armPath: ["items"],
        value: createArrayShape(createDeferredShape(() => bItem)),
      },
    });
    const group = createDiscriminatedModelShape("kind", { a, b });

    expect(resolveModelShape(group, { items: [{ onlyB: 1 }] })).toBe(b);
  });

  it("keeps the first variant when nothing distinguishes them", () => {
    const a = createFlatModelShape({
      shared: { armPath: ["sharedArm"], value: { kind: "any" } },
    });
    const b = createFlatModelShape({
      shared: { armPath: ["sharedArm"], value: { kind: "any" } },
    });
    const group = createDiscriminatedModelShape("kind", { a, b });
    expect(resolveModelShape(group, { shared: "s" })).toBe(a);
  });

  it("matches ARM-side keys when the value is keyed by arm names", () => {
    // Same data, wire-shaped: `keyIdArm` rather than `keyId`.
    expect(
      resolveModelShape(secretShape, { type: "[parameters('t')]", keyIdArm: "k" }, "arm"),
    ).toBe(urlSigningKeyShape);
    expect(
      resolveModelShape(secretShape, { type: "[parameters('t')]", certNameArm: "c" }, "arm"),
    ).toBe(managedCertShape);
  });

  it("does not confuse the two namings", () => {
    // JS keys read as if they were ARM names match nothing
    // distinguishing, so the first variant wins rather than the
    // correct one.
    expect(resolveModelShape(secretShape, { certName: "c" }, "arm")).toBe(urlSigningKeyShape);
  });
});

// ---------------------------------------------------------------------------
// navigateShape
// ---------------------------------------------------------------------------

describe("navigateShape with a discriminated target", () => {
  const rootShape: FlatModelShape = createFlatModelShape({
    parameters: {
      armPath: ["parameters"],
      value: createDeferredShape(() => secretShape),
    },
  });

  it("selects the variant from the threaded value", () => {
    const value = { parameters: { type: "UrlSigningKey", keyId: "k" } };
    const step = navigateShape(rootShape, "parameters", value);
    expect(step.stamp?.armPath).toEqual(["parameters"]);
    expect(step.next).toBe(secretShape);

    const inner = navigateShape(step.next, "keyId", value.parameters);
    expect(inner.stamp?.armPath).toEqual(["keyIdArm"]);
  });

  it("infers the variant when the discriminator is an expression", () => {
    const parameters = { type: { __brand: "expr" }, keyId: "k" };
    const inner = navigateShape(secretShape, "keyId", parameters);
    expect(inner.stamp?.armPath).toEqual(["keyIdArm"]);
  });

  it("passes through when no value is available", () => {
    // `Expression<T>` navigation has nothing to infer from.
    const inner = navigateShape(secretShape, "keyId");
    expect(inner.stamp).toBeUndefined();
    expect(inner.next).toBeUndefined();
  });
});
