// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * End-to-end coverage for the ARM-shape serialization pipeline
 * (Phases 3-6). Hand-crafted ModelShapes stand in for emitter
 * output so these tests are independent of `@azure-tools/typespec-ts-provisioning`.
 *
 * We assert three contracts:
 *
 *   1. Serialize a Resource whose `(armType, apiVersion)` is registered
 *      in the global shape registry and the emitted Bicep uses ARM-wire
 *      keys (rename + flatten).
 *   2. Property-access expressions through that resource serialize to
 *      the wire path (stamped access lowering).
 *   3. Round-trip: deserialize a JSON doc produced by (1) back into a
 *      Stack and re-serialize — output is identical.
 */

import { describe, expect, it } from "vitest";

import { fn, namingRequiredPolicy, Resource, Stack } from "../../../src/index.js";
import {
  createFlatModelShape as createModelShape,
  createDeferredShape,
  type FlatModelShape,
  type ResourceProps,
  renderBicepFiles,
} from "../../../src/internal.js";
import { resource as createTestResource } from "../../support.js";
import { serialize } from "../../../src/serialization/json/serialize.js";
import { deserialize } from "../../../src/serialization/json/deserialize.js";
import { registerShape } from "../../../src/shape/shape-registry.js";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const widgetPropertiesShape: FlatModelShape = createModelShape({
  // Simple client-name rename inside properties:
  displayName: { armPath: ["display_name"], value: { kind: "any" } },
  enabled: { armPath: ["enabled"], value: { kind: "any" } },
});

/**
 * The resource-level descriptor mixes:
 *   - A client-name rename on a scalar leaf (`widgetName` → `name`).
 *   - A nested model with its own renames (`properties`).
 *   - A flattened-property two-hop hoist (`tierName` → `sku.tier.name`).
 */
const widgetShape: FlatModelShape = createModelShape({
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => widgetPropertiesShape),
  },
  tierName: { armPath: ["sku", "tier", "name"], value: { kind: "any" } },
});

const WIDGET_TYPE = "Contoso.Widgets/widgets";
const WIDGET_API = "2024-01-01";

// Register once so deserialize can look it up.
registerShape(WIDGET_TYPE, WIDGET_API, widgetShape);

const RULE_TYPE = "Contoso.Widgets/rules";
const RULE_API = "2026-01-01";
const ruleKind = { jsName: "ruleKind", armName: "kind" };

const customRuleShape = createModelShape({
  ruleKind: { armPath: ["kind"], value: { kind: "any" } },
  customLabel: { armPath: ["custom_label"], value: { kind: "any" } },
});
const defaultRuleShape = createModelShape({
  ruleKind: { armPath: ["kind"], value: { kind: "any" } },
  defaultPriority: { armPath: ["default_priority"], value: { kind: "any" } },
});

class CustomRule extends Resource<typeof RULE_TYPE> {
  static readonly resourceType = RULE_TYPE;
  static apiVersion = RULE_API;
  static {
    const path = [{ discriminator: ruleKind, value: "Custom" }];
    this.registerShape(customRuleShape, path);
    this.register(path);
  }

  constructor(context: Stack, props: { name: string; ruleKind: "Custom"; customLabel: string }) {
    super(context, {
      ...props,
      type: CustomRule.resourceType,
      apiVersion: CustomRule.apiVersion,
    });
  }
}

class DefaultRule extends Resource<typeof RULE_TYPE> {
  static readonly resourceType = RULE_TYPE;
  static apiVersion = RULE_API;
  static {
    const path = [{ discriminator: ruleKind, value: "Default" }];
    this.registerShape(defaultRuleShape, path);
    this.register(path);
  }

  constructor(
    context: Stack,
    props: {
      name: string;
      ruleKind: "Default";
      defaultPriority: number;
    },
  ) {
    super(context, {
      ...props,
      type: DefaultRule.resourceType,
      apiVersion: DefaultRule.apiVersion,
    });
  }
}

function makeStack(build: (root: Stack) => void, name = "widget-infra"): Stack {
  const root = new Stack(name, {
    targetScope: "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });
  build(root);
  return root;
}

function bicepOf(stack: Stack): string {
  return renderBicepFiles(stack)
    .map((file) => file.contents)
    .join("\n");
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ARM-shape e2e", () => {
  it("round-trips resource discriminator variants with concrete classes", () => {
    const stack = makeStack((root) => {
      new CustomRule(root, {
        name: "custom",
        ruleKind: "Custom",
        customLabel: "one",
      });
      new DefaultRule(root, {
        name: "default",
        ruleKind: "Default",
        defaultPriority: 7,
      });
    }, "resource-variants");

    const firstDocument = serialize(stack);
    const firstJson = JSON.stringify(firstDocument);
    expect(firstJson).toContain("custom_label");
    expect(firstJson).toContain("default_priority");
    expect(firstJson).not.toContain("customLabel");
    expect(firstJson).not.toContain("defaultPriority");

    const [roundTripped] = deserialize(firstJson);
    const resources = roundTripped!.getResources();
    expect(resources.some((resource) => resource instanceof CustomRule)).toBe(true);
    expect(resources.some((resource) => resource instanceof DefaultRule)).toBe(true);
    expect(renderBicepFiles(roundTripped!)).toEqual(renderBicepFiles(stack));
  });

  it("lowers JS-shape state into ARM wire keys in the emitted Bicep", () => {
    const stack = makeStack((root) => {
      createTestResource(root, {
        name: "w1",
        type: WIDGET_TYPE,
        apiVersion: WIDGET_API,
        properties: {
          displayName: "Widget One",
          enabled: true,
        },
        tierName: "Standard",
      } as ResourceProps<string> & Record<string, unknown>);
    });

    const bicep = bicepOf(stack);

    // Rename applied inside `properties`.
    expect(bicep).toContain("display_name:");
    expect(bicep).not.toContain("displayName:");

    // Flatten applied: `tierName` -> nested `sku: { tier: { name: ... } }`.
    expect(bicep).toMatch(/sku:\s*\{[\s\S]*tier:\s*\{[\s\S]*name:\s*'Standard'/);
    expect(bicep).not.toContain("tierName:");
  });

  it("lowers stamped property-access expressions to the ARM wire path", () => {
    const stack = makeStack((root) => {
      const w = createTestResource(root, {
        name: "w1",
        type: WIDGET_TYPE,
        apiVersion: WIDGET_API,
        properties: { displayName: "Widget One", enabled: true },
      } as ResourceProps<string> & Record<string, unknown>);

      // Reference the renamed JS property via a function call expression.
      // Both resources are registered, so state + expression
      // lowering fire end-to-end.
      createTestResource(root, {
        name: "w2",
        type: WIDGET_TYPE,
        apiVersion: WIDGET_API,
        properties: {
          displayName: fn.concat(
            (w as unknown as { id: string }).id,
            "-child",
          ) as unknown as string,
        },
      } as ResourceProps<string> & Record<string, unknown>);
    });

    const bicep = bicepOf(stack);
    // Second resource's displayName must be emitted under the ARM key.
    expect(bicep).toContain("display_name:");
    expect(bicep).not.toContain("displayName:");
  });

  it("round-trips deserialize → re-serialize preserving wire output", () => {
    const stack = makeStack((root) => {
      createTestResource(root, {
        name: "w1",
        type: WIDGET_TYPE,
        apiVersion: WIDGET_API,
        properties: { displayName: "Widget One", enabled: true },
        tierName: "Premium",
      } as ResourceProps<string> & Record<string, unknown>);
    });

    const firstDocument = serialize(stack);
    const roundTripped = deserialize(JSON.stringify(firstDocument));
    const secondDocument = renderBicepFiles(roundTripped[0]!);

    // Deployment equivalence: the imported resource's descriptor
    // comes from the global registry, so re-serialization re-lowers
    // identically.
    expect(secondDocument).toEqual(renderBicepFiles(stack));
  });

  it("passes unknown user-authored keys through unchanged (escape hatch)", () => {
    const stack = makeStack((root) => {
      createTestResource(root, {
        name: "w1",
        type: WIDGET_TYPE,
        apiVersion: WIDGET_API,
        properties: { displayName: "X", enabled: true },
        // Key not present in descriptor — must survive as-is.
        extraField: { nested: 42 },
      } as ResourceProps<string> & Record<string, unknown>);
    });

    const bicep = bicepOf(stack);
    expect(bicep).toContain("extraField:");
    expect(bicep).toMatch(/nested:\s*42/);
  });
});
