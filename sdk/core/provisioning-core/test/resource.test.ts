import { describe, expect, it } from "vitest";

import { Stack } from "../src/constructs/stack.js";
import { isExpression, unwrapExpression, type Expression } from "../src/expression/expressions.js";
import { isExpressionNode } from "../src/expression/ast-nodes.js";
import { deref, normalizeAssignedValue } from "../src/constructs/resource/resource-proxy.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";
import { resource } from "./support.js";

// Test helper: assert that a value represents a property-access expression,
// whether it arrives as a wrapped `Expression<T>` proxy or as a raw
// `ExpressionNode` (e.g. directly from `normalizeAssignedValue`).
function isPropertyAccessProxy(value: unknown): boolean {
  const node = isExpression(value) ? unwrapExpression(value as Expression<unknown>) : value;
  return isExpressionNode(node) && node.kind === "property-access";
}

describe("resource property proxying", () => {
  it("returns symbolic member expressions by default and dereferences raw assigned values", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const source = resource(root, {
      name: "source-a",
      type: "Contoso.Test/sources",
      apiVersion: "2024-01-01",
      sku: {
        name: "Standard_LRS",
        tier: "Standard",
      },
    });

    expect(isPropertyAccessProxy(source.sku.name)).toBe(true);
    expect(deref(source.sku.name)).toBe("Standard_LRS");

    expect(isPropertyAccessProxy(source.sku.tier)).toBe(true);
    expect(deref(source.sku.tier)).toBe("Standard");

    expect(isPropertyAccessProxy(source.id)).toBe(true);
  });

  it("id and name are expression proxies that serialize as symbolic references", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const storage = resource(root, {
      name: "my-storage",
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
    });

    // Both id and name should be expression proxies
    expect(isPropertyAccessProxy(storage.id)).toBe(true);
    expect(isPropertyAccessProxy(storage.name)).toBe(true);
    expect(isExpression(storage.id)).toBe(true);
    expect(isExpression(storage.name)).toBe(true);

    // name deref returns the raw stored value
    expect(deref(storage.name)).toBe("my-storage");

    // id is not stored in state — deref returns undefined
    expect(deref(storage.id)).toBeUndefined();
  });

  it("assigning resource.id to another resource property creates a symbolic reference", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const source = resource(root, {
      name: "source",
      type: "Contoso.Test/sources",
      apiVersion: "2024-01-01",
    });
    const target = resource(root, {
      name: "target",
      type: "Contoso.Test/targets",
      apiVersion: "2024-01-01",
    });

    // Assign source.id to target — should normalize to a property access expression
    const normalized = normalizeAssignedValue(source.id, target);
    expect(isPropertyAccessProxy(normalized)).toBe(true);

    // Assign source.name similarly
    const normalizedName = normalizeAssignedValue(source.name, source);
    // Same-resource deref inlines the raw value
    expect(normalizedName).toBe("source");
  });

  it("self-spread inlines raw values instead of creating expression refs", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const r = resource(root, {
      name: "res",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      metadata: { env: "prod", team: "platform" },
    });

    // Spread own metadata + add new key — no deref needed
    (r as any).metadata = { ...r.metadata, resourceKind: "storage" } as any;

    const rawMetadata = deref(r.metadata) as Record<string, unknown>;
    expect(rawMetadata).toEqual({
      env: "prod",
      team: "platform",
      resourceKind: "storage",
    });
    // Values should be plain strings, not expression refs
    expect(typeof rawMetadata!.env).toBe("string");
    expect(typeof rawMetadata!.resourceKind).toBe("string");
  });

  it("cross-resource spread creates individual property refs", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const storage = resource(root, {
      name: "sa",
      type: "Microsoft.Storage/storageAccounts",
      apiVersion: "2024-01-01",
      metadata: { env: "prod", team: "platform" },
    });
    const vault = resource(root, {
      name: "kv",
      type: "Microsoft.KeyVault/vaults",
      apiVersion: "2024-01-01",
    });

    // Spread from another resource — each property becomes a ref
    (vault as any).metadata = { ...storage.metadata, extra: "secret" } as any;

    const rawMetadata = deref((vault as any).metadata) as any;
    // extra should be a plain string
    expect(rawMetadata.extra).toBe("secret");
    // Cross-resource properties should be resource-ref expression nodes
    expect(isPropertyAccessProxy(rawMetadata.env)).toBe(true);
    expect(isPropertyAccessProxy(rawMetadata.team)).toBe(true);
  });

  it("property access on record props still returns expression proxy", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const r = resource(root, {
      name: "res",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      metadata: { env: "prod" },
    });

    // r.metadata.env should be an expression proxy (for deploy-time refs)
    expect(isPropertyAccessProxy(r.metadata!.env)).toBe(true);
    // But deref gives the raw value
    expect(deref(r.metadata!.env)).toBe("prod");
  });
});
