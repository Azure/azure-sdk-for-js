// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6e0Tcy:
  // "Converting every numeric-looking property name to a number breaks records with numeric string keys. For example, reading resource.tags[\"0\"] produces a numeric array-access node (tags[0]) instead of the string-key access (tags['0']). Use the current shape/container kind to convert indices only while navigating arrays."
  it("preserves numeric string keys in records", () => {
    const root = new Stack("infra", { namingPolicy: namingRequiredPolicy });
    const r = resource(root, {
      name: "res",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      metadata: { "0": "zero" },
    });

    const node = unwrapExpression(r.metadata!["0"] as Expression<unknown>);
    expect(node).toMatchObject({ kind: "array-access", index: "0" });
    expect(deref(r.metadata!["0"])).toBe("zero");
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6eW0C7:
  // "Nested writes follow inherited properties. A path such as properties.__proto__.polluted therefore descends into Object.prototype and mutates it globally. Traverse only own properties and define new/terminal keys without invoking prototype setters."
  it("does not follow inherited properties during nested writes", () => {
    const root = new Stack("infra", { namingPolicy: namingRequiredPolicy });
    const r = resource(root, {
      name: "res",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
    });

    (r as any).properties.__proto__.polluted = true;

    expect((Object.prototype as any).polluted).toBeUndefined();
    expect(deref((r as any).properties.__proto__.polluted)).toBe(true);
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6eW0DE:
  // "Normalizing a record into {} makes a legitimate __proto__ key invoke the legacy prototype setter rather than become an own property. This can silently drop that ARM field and attach attacker-controlled inherited state; use a null-prototype result map."
  it("normalizes __proto__ as an own record property", () => {
    const input = Object.create(null) as Record<string, unknown>;
    input.__proto__ = { retained: true };

    const normalized = normalizeAssignedValue(input) as Record<string, unknown>;

    expect(Object.getPrototypeOf(normalized)).toBeNull();
    expect(Object.prototype.hasOwnProperty.call(normalized, "__proto__")).toBe(true);
    expect(normalized.__proto__).toEqual({ retained: true });
  });
});
