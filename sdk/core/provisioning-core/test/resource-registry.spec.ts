// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";

import { ResourceGroup, Resource, Stack, namingRequiredPolicy } from "../src/index.js";
import {
  registerResource,
  resolveResource,
  type ResourceCtor,
} from "../src/constructs/resource/resource-registry.js";
import {
  ResourceTypeRegistry,
  type FlatVariantSelector,
} from "../src/constructs/resource/resource-type-registry.js";

const singletonSelector = (name: string) => [
  {
    discriminator: { jsName: "name", armName: "name" },
    value: name,
  },
];

// Compile-time canary: `ResourceGroup` is the only built-in subclass that
// lives next to the registry, so we use it as a representative for the
// contract. If `Resource`'s constructor ever grows a required parameter
// that subclasses can no longer satisfy with the registry's 2-arg call
// shape, this assignment will fail to compile — flagging the drift before
// any deserializer fixture runs.
const _conformance: ResourceCtor = ResourceGroup;
void _conformance;

describe("resource registry contract", () => {
  beforeEach(() => {
    Stack.clearRoots();
  });

  it("ResourceGroup is registered under its (resourceType, apiVersion)", () => {
    const Ctor = resolveResource(ResourceGroup.resourceType, ResourceGroup.apiVersion);
    expect(Ctor).toBe(ResourceGroup);
  });

  it("can be constructed via the deserializer's exact call shape", () => {
    // Mirrors `deserialize.ts`: resolve the ctor from the registry, then
    // invoke it with `(context, classProps)`. If the deserializer's call
    // shape ever diverges from what `ResourceCtor` declares, this test
    // breaks together with the type-system check above.
    const stack = new Stack("registry-canary", {
      targetScope: "subscription",
      namingPolicy: namingRequiredPolicy,
    });
    const Ctor = resolveResource(ResourceGroup.resourceType, ResourceGroup.apiVersion)!;
    const rg = new Ctor(stack, { name: "rg-canary", location: "eastus" });
    expect(rg).toBeInstanceOf(ResourceGroup);
  });
});

describe("resource type registration", () => {
  const resourceType = "Contoso.Test/registration";
  const version = "2024-01-01";
  const otherVersion = "2025-01-01";
  const selector: FlatVariantSelector = [
    { discriminator: { jsName: "kind", armName: "kind" }, value: "Custom" },
  ];

  it.each([
    { first: "flat", second: "variant", secondVersion: version },
    { first: "variant", second: "flat", secondVersion: version },
    { first: "flat", second: "variant", secondVersion: otherVersion },
    { first: "variant", second: "flat", secondVersion: otherVersion },
  ] as const)(
    "rejects $second registration after $first at $secondVersion",
    ({ first, second, secondVersion }) => {
      const registry = new ResourceTypeRegistry<string>();
      registry.register(
        resourceType,
        version,
        "original",
        first === "variant" ? selector : undefined,
      );

      expect(() =>
        registry.register(
          resourceType,
          secondVersion,
          "other",
          second === "variant" ? selector : undefined,
        ),
      ).toThrow(`Cannot register ${second} target`);
      expect(
        registry.resolve(
          resourceType,
          version,
          { kind: "Custom" },
          { strict: true, valueKeyedBy: "js" },
        ),
      ).toBe("original");
      if (secondVersion !== version) {
        expect(
          registry.resolve(
            resourceType,
            secondVersion,
            { kind: "Custom" },
            { strict: true, valueKeyedBy: "js" },
          ),
        ).toBeUndefined();
      }
    },
  );

  it.each([
    { kind: "flat", selector: undefined, error: "Conflicting flat target" },
    { kind: "variant", selector, error: "Conflicting variant target" },
  ])(
    "allows duplicate $kind registrations only for the same target",
    ({ selector: caseSelector, error }) => {
      const registry = new ResourceTypeRegistry<string>();
      registry.register(resourceType, version, "original", caseSelector);
      expect(() =>
        registry.register(resourceType, version, "original", caseSelector),
      ).not.toThrow();
      expect(() => registry.register(resourceType, version, "other", caseSelector)).toThrow(error);
      expect(
        registry.resolve(
          resourceType,
          version,
          { kind: "Custom" },
          { strict: true, valueKeyedBy: "js" },
        ),
      ).toBe("original");
    },
  );
});

// ---------------------------------------------------------------------------
// Best-effort vs. strict resolution
// ---------------------------------------------------------------------------

/**
 * Each best-effort scenario uses a unique ARM type string so tests never
 * collide with real registered classes (KeyVault etc.) or with each other.
 * The classes are minimal `Resource` subclasses carrying only the static
 * `resourceType` / `apiVersion` needed to satisfy `ResourceCtor` — they
 * self-register on module load, and `beforeEach` in the earlier `describe`
 * does not affect the global registry (only `Stack.clearRoots()`).
 */

// Flat-mode type with multiple registered versions.
class FlatV1 extends Resource<"Contoso.Test/flatType"> {
  static resourceType = "Contoso.Test/flatType" as const;
  static apiVersion = "2024-01-01";
  static {
    registerResource(this);
  }
}
class FlatV2 extends Resource<"Contoso.Test/flatType"> {
  static resourceType = "Contoso.Test/flatType" as const;
  static apiVersion = "2025-06-01";
  static {
    registerResource(this);
  }
}
class FlatPreview extends Resource<"Contoso.Test/flatType"> {
  static resourceType = "Contoso.Test/flatType" as const;
  static apiVersion = "2025-06-01-preview";
  static {
    registerResource(this);
  }
}

// Singleton-mode type where different singleton names peak at different
// versions:
//   - "signin"     registered at v1 and v2
//   - "signup"     registered at v1 only
//   - "delegation" registered at v2 only
class SigninV1 extends Resource<"Contoso.Test/singleType"> {
  static resourceType = "Contoso.Test/singleType" as const;
  static apiVersion = "2024-01-01";
  static {
    registerResource(this, singletonSelector("signin"));
  }
}
class SignupV1 extends Resource<"Contoso.Test/singleType"> {
  static resourceType = "Contoso.Test/singleType" as const;
  static apiVersion = "2024-01-01";
  static {
    registerResource(this, singletonSelector("signup"));
  }
}
class SigninV2 extends Resource<"Contoso.Test/singleType"> {
  static resourceType = "Contoso.Test/singleType" as const;
  static apiVersion = "2025-06-01";
  static {
    registerResource(this, singletonSelector("signin"));
  }
}
class DelegationV2 extends Resource<"Contoso.Test/singleType"> {
  static resourceType = "Contoso.Test/singleType" as const;
  static apiVersion = "2025-06-01";
  static {
    registerResource(this, singletonSelector("delegation"));
  }
}

const ruleSelector = (value: string): FlatVariantSelector => [
  {
    discriminator: { jsName: "ruleKind", armName: "kind" },
    value,
  },
];

class CustomRuleV1 extends Resource<"Contoso.Test/rules"> {
  static resourceType = "Contoso.Test/rules" as const;
  static apiVersion = "2024-01-01";
  static {
    registerResource(this, ruleSelector("Custom"));
  }
}
class DefaultRuleV1 extends Resource<"Contoso.Test/rules"> {
  static resourceType = "Contoso.Test/rules" as const;
  static apiVersion = "2024-01-01";
  static {
    registerResource(this, ruleSelector("Default"));
  }
}
class CustomRuleV2 extends Resource<"Contoso.Test/rules"> {
  static resourceType = "Contoso.Test/rules" as const;
  static apiVersion = "2025-01-01";
  static {
    registerResource(this, ruleSelector("Custom"));
  }
}

const animalSelector = (kind: string, breed: string): FlatVariantSelector => [
  {
    discriminator: { jsName: "animalKind", armName: "kind" },
    value: kind,
  },
  {
    discriminator: { jsName: "breedName", armName: "breed" },
    value: breed,
  },
];

class Siamese extends Resource<"Contoso.Test/animals"> {
  static resourceType = "Contoso.Test/animals" as const;
  static apiVersion = "2025-01-01";
  static {
    registerResource(this, animalSelector("cat", "siamese"));
  }
}

class RewriteRule extends Resource<"Contoso.Test/aliases"> {
  static resourceType = "Contoso.Test/aliases" as const;
  static apiVersion = "2025-01-01";
  static {
    registerResource(this, ruleSelector("rewrite"));
    registerResource(this, ruleSelector("reroute"));
  }
}

describe("resolveResource — best-effort fallback", () => {
  describe("flat types", () => {
    it("returns the exact class when apiVersion matches", () => {
      expect(
        resolveResource("Contoso.Test/flatType", "2024-01-01", {
          name: "anything",
        }),
      ).toBe(FlatV1);
    });

    it("falls back to the highest registered version when apiVersion is unknown", () => {
      // 2025-06-01 > 2025-06-01-preview > 2024-01-01 lexicographically.
      // Stable outranks preview at the same base date (ASCII `-` < digits).
      expect(
        resolveResource("Contoso.Test/flatType", "2099-01-01", {
          name: "anything",
        }),
      ).toBe(FlatV2);
    });

    it("falls back for an older-than-registered apiVersion too", () => {
      expect(
        resolveResource("Contoso.Test/flatType", "1999-01-01", {
          name: "anything",
        }),
      ).toBe(FlatV2);
    });

    it("returns undefined for an unknown apiVersion when strict:true", () => {
      expect(
        resolveResource(
          "Contoso.Test/flatType",
          "2099-01-01",
          { name: "anything" },
          { strict: true },
        ),
      ).toBeUndefined();
    });

    it("still returns the exact class under strict when apiVersion matches", () => {
      expect(
        resolveResource(
          "Contoso.Test/flatType",
          "2024-01-01",
          { name: "anything" },
          { strict: true },
        ),
      ).toBe(FlatV1);
    });
  });

  describe("singleton types", () => {
    it("returns the exact singleton when both apiVersion and name match", () => {
      expect(
        resolveResource("Contoso.Test/singleType", "2024-01-01", {
          name: "signin",
        }),
      ).toBe(SigninV1);
    });

    it("falls back to the highest version registered for the SAME singleton name", () => {
      // signin exists at v1 and v2 — should pick v2 for an unknown version.
      expect(
        resolveResource("Contoso.Test/singleType", "2099-01-01", {
          name: "signin",
        }),
      ).toBe(SigninV2);
    });

    it("picks the right version per singleton independently", () => {
      // signup only exists at v1; delegation only at v2. An unknown wire
      // apiVersion should map each name to its own newest registered
      // version.
      expect(
        resolveResource("Contoso.Test/singleType", "2099-01-01", {
          name: "signup",
        }),
      ).toBe(SignupV1);
      expect(
        resolveResource("Contoso.Test/singleType", "2099-01-01", {
          name: "delegation",
        }),
      ).toBe(DelegationV2);
    });

    it("returns undefined when the singleton name has never been registered (even in best-effort)", () => {
      expect(
        resolveResource("Contoso.Test/singleType", "2099-01-01", {
          name: "unheard-of-variant",
        }),
      ).toBeUndefined();
    });

    it("returns undefined for a mismatched singleton name under strict:true", () => {
      // signup doesn't exist at v2 — strict should return undefined.
      expect(
        resolveResource(
          "Contoso.Test/singleType",
          "2025-06-01",
          { name: "signup" },
          { strict: true },
        ),
      ).toBeUndefined();
    });
  });

  describe("model-discriminated types", () => {
    it("resolves renamed discriminator fields from ARM state", () => {
      expect(
        resolveResource("Contoso.Test/rules", "2024-01-01", {
          kind: "Default",
        }),
      ).toBe(DefaultRuleV1);
      expect(
        resolveResource("Contoso.Test/rules", "2024-01-01", {
          ruleKind: "Default",
        }),
      ).toBeUndefined();
    });

    it("resolves an ordered nested discriminator path", () => {
      expect(
        resolveResource("Contoso.Test/animals", "2025-01-01", {
          kind: "cat",
          breed: "siamese",
        }),
      ).toBe(Siamese);
    });

    it("allows multiple values to resolve to one class", () => {
      expect(
        resolveResource("Contoso.Test/aliases", "2025-01-01", {
          kind: "reroute",
        }),
      ).toBe(RewriteRule);
    });

    it("falls back to the highest version for the matched path", () => {
      expect(
        resolveResource("Contoso.Test/rules", "2099-01-01", {
          kind: "Custom",
        }),
      ).toBe(CustomRuleV2);
      expect(
        resolveResource("Contoso.Test/rules", "2099-01-01", {
          kind: "Default",
        }),
      ).toBe(DefaultRuleV1);
      expect(CustomRuleV1).not.toBe(CustomRuleV2);
    });
  });

  describe("unknown type", () => {
    it("returns undefined regardless of strict mode", () => {
      expect(
        resolveResource("Contoso.Test/neverRegistered", "2024-01-01", {
          name: "x",
        }),
      ).toBeUndefined();
      expect(
        resolveResource(
          "Contoso.Test/neverRegistered",
          "2024-01-01",
          { name: "x" },
          { strict: true },
        ),
      ).toBeUndefined();
    });
  });
});
