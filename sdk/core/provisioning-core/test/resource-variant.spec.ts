// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  resolveFlatVariant,
  flatVariantSelectorKey,
  type FlatVariantRegistryEntry,
} from "../src/constructs/resource/resource-type-registry.js";

describe("resource variant selectors", () => {
  const kind = { jsName: "kind", armName: "kind" };
  const breed = { jsName: "breedName", armName: "breed" };

  it("resolves a single discriminator", () => {
    const entries = [
      { selector: [{ discriminator: kind, value: "cat" }], target: "Cat" },
      { selector: [{ discriminator: kind, value: "dog" }], target: "Dog" },
    ];

    expect(resolveFlatVariant(entries, { kind: "dog" }, "js")).toBe("Dog");
  });

  it("returns the first target when multiple selectors match", () => {
    const entries = [
      { selector: [{ discriminator: kind, value: "cat" }], target: "Cat" },
      {
        selector: [
          { discriminator: kind, value: "cat" },
          { discriminator: breed, value: "siamese" },
        ],
        target: "Siamese",
      },
    ];

    expect(resolveFlatVariant(entries, { kind: "cat", breedName: "siamese" }, "js")).toBe("Cat");
  });

  it("reads renamed discriminators from the requested naming", () => {
    const entries = [
      {
        selector: [
          { discriminator: kind, value: "cat" },
          { discriminator: breed, value: "siamese" },
        ],
        target: "Siamese",
      },
    ];

    expect(resolveFlatVariant(entries, { kind: "cat", breed: "siamese" }, "arm")).toBe("Siamese");
    expect(resolveFlatVariant(entries, { kind: "cat", breed: "siamese" }, "js")).toBeUndefined();
  });

  it("allows several selectors to select the same target", () => {
    const entries: FlatVariantRegistryEntry<string>[] = [
      {
        selector: [{ discriminator: kind, value: "rewrite" }],
        target: "Rewrite",
      },
      {
        selector: [{ discriminator: kind, value: "reroute" }],
        target: "Rewrite",
      },
    ];

    expect(resolveFlatVariant(entries, { kind: "reroute" }, "js")).toBe("Rewrite");
  });

  it("keys discriminator names and values without delimiter ambiguity", () => {
    expect(
      flatVariantSelectorKey([
        {
          discriminator: { jsName: "kind", armName: "wire-kind" },
          value: "a@b",
        },
      ]),
    ).toBe('[["kind","wire-kind","a@b"]]');
  });

  it("canonicalizes selector keys independently of pin order", () => {
    const outerThenInner = flatVariantSelectorKey([
      { discriminator: kind, value: "cat" },
      { discriminator: breed, value: "siamese" },
    ]);
    const innerThenOuter = flatVariantSelectorKey([
      { discriminator: breed, value: "siamese" },
      { discriminator: kind, value: "cat" },
    ]);

    expect(outerThenInner).toBe(innerThenOuter);
  });
});
