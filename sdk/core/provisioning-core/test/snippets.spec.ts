// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  asDiscriminator,
  ParameterCollection,
  Resource,
  ResourceGroup,
  Stack,
  fn,
  type ExpressionOrValue,
} from "../src/index.js";
import { describe, expect, expectTypeOf, it } from "vitest";

type RuleInput =
  | {
      kind: "cache";
      cacheKind: ExpressionOrValue<"long" | "short">;
      days: ExpressionOrValue<number>;
    }
  | {
      kind: "redirect";
      url: ExpressionOrValue<string>;
    };

describe("documentation snippets", () => {
  
  it("ReadmeCreateStack", () => {
    const stack = new Stack("application");

    const resourceGroup = new ResourceGroup(stack, {
          name: fn.concat("rg-", fn.uniqueString("application")),
          location: "eastus",
    });

    new Resource(resourceGroup, {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2026-04-01",
        name: "stbasemodeltest",
        location: "eastus",
        kind: "StorageV2",
        sku: { name: "Standard_LRS" },
        properties: {
          supportsHttpsTrafficOnly: true,
        },
      });
  });

  it("ReadmeGeneralResource", () => {
    const stack = new Stack("keyvault-deployment");
    const resourceGroup = new ResourceGroup(stack, {
      name: "rg-keyvault",
      location: "eastus",
    });

    new Resource(resourceGroup, {
      type: "Microsoft.KeyVault/vaults",
      apiVersion: "2024-11-01",
      name: fn.concat("kv-", fn.uniqueString(resourceGroup.id)),
      location: resourceGroup.location,
      properties: {
        tenantId: "00000000-0000-0000-0000-000000000000",
        sku: { family: "A", name: "standard" },
      },
    });
  });

  const kindParam = new ParameterCollection().add("ruleKind", "string", {
    allowed: ["cache"],
  });

  it("AsDiscriminator", () => {
    type Rule =
      | { kind: "cache"; cacheKind: "long" | "short"; days: number }
      | { kind: "redirect"; url: string };

    const stack = new Stack("discriminator-example");
    const ruleKind = stack.parameters.add("ruleKind", "string", {
      allowed: ["cache"],
    });
    const widget: { properties: { primaryRule?: Rule } } = {
      properties: {},
    };

    widget.properties.primaryRule = {
      kind: asDiscriminator(ruleKind),
      cacheKind: "long",
      days: 7,
    };
  });

  it("preserves the expression and checks the selected variant", () => {
    expect(asDiscriminator(kindParam)).toBe(kindParam);
    expectTypeOf(asDiscriminator(kindParam)).toEqualTypeOf<"cache">();

    const rule: RuleInput = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      days: 7,
    };
    expectTypeOf(rule.kind).toEqualTypeOf<"cache">();
    expectTypeOf(rule.days).toEqualTypeOf<ExpressionOrValue<number>>();
    // @ts-expect-error The redirect variant's property is not available.
    expect(rule.url).toBeUndefined();

    const invalidVariant: RuleInput = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      days: 7,
      // @ts-expect-error Redirect properties cannot be assigned to a cache rule.
      url: "https://example.com",
    };
    const invalidDays: RuleInput = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      // @ts-expect-error Cache rule days must be numeric.
      days: "seven",
    };
    const invalidCacheKind: RuleInput = {
      kind: asDiscriminator(kindParam),
      // @ts-expect-error The selected variant retains its literal property type.
      cacheKind: "forever",
      days: 7,
    };
    expect(invalidVariant.kind).toBe(kindParam);
    expect(invalidDays.kind).toBe(kindParam);
    expect(invalidCacheKind.kind).toBe(kindParam);
  });
});
