// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import pluralizeLib from "./pluralize-config.js";
import type { ProvisioningComponent } from "../../constructs/provisioning-component.js";
import type { ParameterMetadata } from "../../constructs/parameter.js";
import type { VariableMetadata } from "../../constructs/variable.js";
import type { OutputMetadata } from "../../constructs/output.js";
import type { Stack } from "../../constructs/stack.js";
import type { Resource, ResourceDeclaration } from "../../constructs/resource/resource.js";
import { ResourceGroup } from "../../constructs/built-in-resources/resource-group.js";
import {
  STATE_PARENT_INDEX,
  unwrapResourceHandle,
} from "../../constructs/resource/resource-proxy.js";
import { definedProps } from "../../util.js";
import { getShape } from "../../shape/shape-registry.js";
import { isExpression, unwrapExpression } from "../../expression/expressions.js";
import { isExpressionNode } from "../../expression/ast-nodes.js";
import {
  isResource,
  isResourceDeclaration,
  isLoopedResource,
} from "../../constructs/resource/resource-utils.js";
import type {
  DeclarableBodyNode,
  DecoratorsNode,
  ExpressionNode,
  InfraNode,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  ResourceDeclarationNode,
  SerializationDocument,
  VariableDeclarationNode,
} from "../contract/index.js";
import { sanitizeIdentifier } from "./util.js";
import { lowerState } from "./lower.js";
import {
  serializeDefinedObjectEntries,
  serializeExpression,
  type SerializableValue,
  type SerializationSymbolMap,
} from "./expression.js";

const RESOURCE_RESERVED_KEYS = new Set<string>([
  "apiVersion",
  "existing",
  "id",
  "name",
  "scope",
  "type",
  "condition",
  "dependsOn",
  STATE_PARENT_INDEX,
]);

function hasNestedResourceHandle(value: unknown): boolean {
  if (isExpression(value) || isExpressionNode(value)) {
    return false;
  }

  if (isResource(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasNestedResourceHandle(item));
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).some((item) => hasNestedResourceHandle(item));
  }

  return false;
}

function createSymbolMap(
  resources: readonly ResourceDeclaration[],
  stack: Stack,
): SerializationSymbolMap {
  const symbolMap: SerializationSymbolMap = new Map();
  const counts = new Map<string, number>();
  const usedNames = new Set<string>();

  function allocateName(stem: string): string {
    let count = counts.get(stem) ?? 0;
    let identifier: string;
    do {
      count++;
      identifier = count === 1 ? stem : `${stem}${count}`;
    } while (usedNames.has(identifier));
    counts.set(stem, count);
    usedNames.add(identifier);
    return identifier;
  }

  for (const parameter of stack.parameters.listMetadata()) {
    const identifier = allocateName(parameter.name);
    symbolMap.set(parameter, identifier);
    symbolMap.set(unwrapExpression(stack.parameters.get(parameter.name)!), identifier);
  }
  for (const variable of stack.variables.listMetadata()) {
    const identifier = allocateName(variable.name);
    symbolMap.set(variable, identifier);
    symbolMap.set(unwrapExpression(stack.variables.get(variable.name)!), identifier);
  }
  for (const resource of resources) {
    const typeName = resource.type.split("/").at(-1) ?? "resource";
    const stem = sanitizeIdentifier(pluralizeLib.singular(typeName));
    symbolMap.set(resource, allocateName(stem));
  }

  // Outputs have a separate Bicep namespace and are not same-stack expression
  // targets, so they keep their authored names outside this symbol map.
  return symbolMap;
}

/**
 * Returns the nearest Resource ancestor whose type/scope makes it a Bicep
 * `parent:` target. This includes both:
 *
 *   - True ARM nested children (e.g. vault → secret), where the renderer
 *     emits `parent: vault`
 *   - Extension resources (e.g. storage → diagnosticSetting), where the
 *     renderer downgrades to `scope: storage`
 *
 * The renderer (`render.ts`) decides between `parent:` and `scope:` by
 * checking ARM type nesting. The file-layout uses this relationship to
 * co-locate related resources in the same Bicep file.
 *
 * Excludes deployment-scope boundaries like `ResourceGroup` (it's a parent
 * ProvisioningComponent but not an ARM nesting/extension target — child resources are
 * deployed *into* the resource group, expressed as `scope: rg` only when
 * the deployment crosses the RG boundary).
 */
function getArmParent(resource: ResourceDeclaration): ResourceDeclaration | undefined {
  const p = resource.parent;
  if (p === undefined || !isResourceDeclaration(p)) {
    return undefined;
  }
  // Exclude ResourceGroup (deployment scope boundary, not an ARM parent).
  if (p.type === ResourceGroup.resourceType) return undefined;
  return p;
}

/**
 * Walk a resource's ProvisioningComponent-tree ancestor chain to find the nearest
 * `ResourceGroup` component, if any. Used by the serializer to emit a
 * synthetic `scope: rgSymbol` field on regular resources whose deployment
 * scope is a `ResourceGroup` component rather than the stack's `targetScope`.
 *
 * The file-layout pass consumes this signal to split the resource into a
 * child Bicep module scoped to the ResourceGroup; the per-resource `scope:`
 * is stripped at that point because inside the child module the resource is
 * implicitly at the right scope.
 *
 * Returns `undefined` when the resource has no ResourceGroup ancestor (i.e.
 * the stack itself is the nearest scope-providing component).
 */
function getResourceGroupAncestor(resource: ResourceDeclaration): ResourceGroup | undefined {
  let current = resource.parent;
  while (current !== undefined) {
    if (isResourceDeclaration(current) && current.type === ResourceGroup.resourceType) {
      return current as ResourceGroup;
    }
    current = current.parent;
  }
  return undefined;
}

function collectAllResources(root: ProvisioningComponent): ResourceDeclaration[] {
  const result: ResourceDeclaration[] = [];
  root.visit((node) => {
    if (isResourceDeclaration(node)) {
      result.push(node.self as ResourceDeclaration);
    }
  });
  return result;
}

function serializeResourceProperties(
  resource: ResourceDeclaration,
  symbolMap: SerializationSymbolMap,
): Record<string, ExpressionNode> {
  const rawResource = unwrapResourceHandle(resource as unknown as Resource);
  const properties: Record<string, ExpressionNode> = {
    name: serializeExpression(rawResource.name, symbolMap),
  };

  const armParent = getArmParent(resource);
  if (armParent !== undefined) {
    const parentId = symbolMap.get(armParent);

    if (parentId === undefined) {
      throw new Error(`Missing parent symbol for resource type ${rawResource.type}.`);
    }

    const parentNode: ExpressionNode = { kind: "identifier", id: parentId };
    // Explicit parent index recorded by `Resource`'s constructor when a
    // child is created with `parent.at(i)` / `parent.current()` as its
    // context. When the child is created under a looped parent without an
    // explicit index (only reachable by unwrapping the raw handle out of a
    // `LoopedResource` — not part of the user-facing API), we emit
    // `parent: parentSym` unchanged; Bicep rejects the resulting
    // `parent: parents` (an array) at validation, producing a loud failure
    // instead of a silently-guessed index variable.
    const parentIndex = (rawResource as unknown as Record<string, unknown>)[STATE_PARENT_INDEX];

    if (parentIndex !== undefined) {
      properties.parent = {
        kind: "array-access",
        base: parentNode,
        index: serializeExpression(parentIndex as SerializableValue, symbolMap),
        nullish: false,
        fromEnd: false,
      };
    } else {
      properties.parent = parentNode;
    }
  }

  // Existing resources may carry an explicit scope expression for cross-RG
  // / cross-sub / cross-MG / cross-tenant lookups. Read from state directly;
  // non-existing resources never have `scope` on state.
  const scopeValue = (rawResource as unknown as Record<string, unknown>).scope;
  if (scopeValue !== undefined) {
    properties.scope = serializeExpression(scopeValue as SerializableValue, symbolMap);
  } else if (armParent === undefined) {
    const rgAncestor = getResourceGroupAncestor(resource);
    if (rgAncestor !== undefined) {
      const groupId = symbolMap.get(rgAncestor);
      if (groupId === undefined) {
        throw new Error("Resource group not found in symbol map.");
      }
      properties.scope = {
        kind: "identifier",
        id: groupId,
      };
    }
  }

  const dependsOn = (rawResource as unknown as Record<string, unknown>)["dependsOn"] as
    readonly ResourceDeclaration[] | undefined;
  if (dependsOn !== undefined) {
    properties.dependsOn = {
      kind: "array",
      items: dependsOn.map((dependency) => {
        const identifier = symbolMap.get(dependency);
        if (identifier === undefined) {
          throw new Error(
            "Dependency not found in symbol map. Ensure it belongs to the same stack.",
          );
        }
        return { kind: "identifier", id: identifier };
      }),
    };
  }

  // Build the per-resource custom property bag first, applying ARM-
  // shape lowering (rename/flatten/encode) when a shape is
  // registered for `(type, apiVersion)`. The registry resolves
  // discriminated variants from the instance state. No-op when no
  // shape is registered for this resource type.
  const descriptor =
    typeof rawResource.type === "string" && typeof rawResource.apiVersion === "string"
      ? getShape(
          rawResource.type,
          rawResource.apiVersion,
          rawResource as unknown as Record<string, unknown>,
        )
      : undefined;

  const userProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rawResource)) {
    if (rawResource.existing) continue;
    if (value === undefined || RESOURCE_RESERVED_KEYS.has(key) || hasNestedResourceHandle(value)) {
      continue;
    }
    userProps[key] = value;
  }

  const loweredUserProps = descriptor ? lowerState(userProps, descriptor) : userProps;

  for (const key of Object.keys(loweredUserProps).sort()) {
    properties[key] = serializeExpression(loweredUserProps[key] as SerializableValue, symbolMap);
  }

  return properties;
}

function serializeResource(
  resource: ResourceDeclaration,
  symbolMap: SerializationSymbolMap,
): [string, ResourceDeclarationNode] {
  const resourceId = symbolMap.get(resource);

  if (resourceId === undefined) {
    throw new Error(`Missing synthesized symbol for resource type ${resource.type}.`);
  }

  const properties = serializeResourceProperties(resource, symbolMap);
  const rawResource = unwrapResourceHandle(resource as unknown as Resource) as unknown as Record<
    string,
    unknown
  >;

  const condition =
    rawResource["condition"] !== undefined
      ? serializeExpression(rawResource["condition"] as SerializableValue, symbolMap)
      : undefined;

  // Loop metadata lives on `LoopedResource.loop` — a public field on the
  // wrapper subclass. Scalar `Resource` instances don't have one.
  const loopCtx = isLoopedResource(resource) ? resource.loop : undefined;

  // Build decorators for the resource (currently only batchSize from forEach)
  const batchSize = loopCtx?.batchSize;
  const decorators = batchSize !== undefined ? { batchSize } : undefined;

  // Wrap `value` in `if-condition` / `for-expression` when the resource is
  // guarded / looped. Bicep source order is `for` outer, `if` inner —
  // `[for item in coll: if (cond) { ... }]` — so wrap if-condition first,
  // then for-expression around it.
  let wireValue: DeclarableBodyNode = { kind: "object", value: properties };
  if (condition !== undefined) {
    wireValue = { kind: "if-condition", condition, body: wireValue };
  }
  if (loopCtx !== undefined) {
    wireValue = {
      kind: "for-expression",
      itemVariable: loopCtx.itemVariable,
      ...(loopCtx.indexVariable !== undefined ? { indexVariable: loopCtx.indexVariable } : {}),
      collection: serializeExpression(loopCtx.collection as SerializableValue, symbolMap),
      body: wireValue,
    };
  }

  const node: ResourceDeclarationNode = {
    bicepIdentifier: resourceId,
    type: resource.type,
    apiVersion: resource.apiVersion,
    existing: resource.existing ?? false,
    value: wireValue,
    ...(decorators !== undefined ? { decorators } : {}),
  };

  return [resourceId, node];
}

function buildDecorators(
  decl: ParameterMetadata | VariableMetadata | OutputMetadata,
  symbolMap: SerializationSymbolMap,
): DecoratorsNode | undefined {
  const d: Record<string, unknown> = {};

  if (decl.description !== undefined) d.description = decl.description;
  if ("secure" in decl && decl.secure) d.secure = true;
  if ("minValue" in decl && decl.minValue !== undefined) {
    d.minValue = decl.minValue;
  }
  if ("maxValue" in decl && decl.maxValue !== undefined) {
    d.maxValue = decl.maxValue;
  }
  if ("minLength" in decl && decl.minLength !== undefined) {
    d.minLength = decl.minLength;
  }
  if ("maxLength" in decl && decl.maxLength !== undefined) {
    d.maxLength = decl.maxLength;
  }
  if ("metadata" in decl && decl.metadata !== undefined) {
    d.metadata = serializeDefinedObjectEntries(
      decl.metadata as {
        readonly [key: string]: SerializableValue | undefined;
      },
      symbolMap,
    );
  }
  if ("allowed" in decl && decl.allowed !== undefined) {
    d.allowed = decl.allowed.map((v) => serializeExpression(v as SerializableValue, symbolMap));
  }
  if ("discriminator" in decl && decl.discriminator !== undefined) {
    d.discriminator = decl.discriminator;
  }
  if ("sealed" in decl && decl.sealed) d.sealed = true;
  if ("export" in decl && decl.export) d.export = true;

  return Object.keys(d).length > 0 ? (d as DecoratorsNode) : undefined;
}

function serializeParameters(
  stack: Stack,
  symbolMap: SerializationSymbolMap,
): Record<string, ParameterDeclarationNode> | undefined {
  if (stack.parameters.size === 0) return undefined;
  return Object.fromEntries(
    stack.parameters.listMetadata().map((p) => {
      const identifier = symbolMap.get(p)!;
      const node: ParameterDeclarationNode = definedProps({
        bicepIdentifier: identifier,
        valueType: { kind: "primitive-type" as const, name: p.type },
        defaultValue:
          p.defaultValue !== undefined
            ? serializeExpression(p.defaultValue as SerializableValue, symbolMap)
            : undefined,
        decorators: buildDecorators(p, symbolMap),
      });
      return [identifier, node];
    }),
  );
}

function serializeVariables(
  stack: Stack,
  symbolMap: SerializationSymbolMap,
): Record<string, VariableDeclarationNode> | undefined {
  if (stack.variables.size === 0) return undefined;
  return Object.fromEntries(
    stack.variables.listMetadata().map((v) => {
      const identifier = symbolMap.get(v)!;
      const node: VariableDeclarationNode = definedProps({
        bicepIdentifier: identifier,
        value: serializeExpression(v.value as SerializableValue, symbolMap),
        decorators: buildDecorators(v, symbolMap),
      });
      return [identifier, node];
    }),
  );
}

function serializeOutputs(
  stack: Stack,
  symbolMap: SerializationSymbolMap,
): Record<string, OutputDeclarationNode> | undefined {
  if (stack.outputs.size === 0) return undefined;
  return Object.fromEntries(
    stack.outputs.list().map((o) => {
      let value: ExpressionNode;
      if (isResource(o.value)) {
        const symbol = symbolMap.get(o.value);
        if (symbol === undefined) {
          throw new Error(`Resource not found in symbol map. Ensure it belongs to the same stack.`);
        }
        value = { kind: "identifier", id: symbol };
      } else {
        value = serializeExpression(o.value as SerializableValue, symbolMap);
      }

      const node: OutputDeclarationNode = definedProps({
        bicepIdentifier: o.name,
        valueType: { kind: "primitive-type" as const, name: o.type },
        value,
        decorators: buildDecorators(o, symbolMap),
      });
      return [o.name, node];
    }),
  );
}

function serializeFile(
  stack: Stack,
  resources: readonly ResourceDeclaration[],
  symbolMap: SerializationSymbolMap,
): InfraNode {
  return {
    ...(stack.targetScope !== "resourceGroup" ? { targetScope: stack.targetScope } : {}),
    fileName: `${stack.name}.bicep`,
    ...definedProps({
      parameters: serializeParameters(stack, symbolMap),
      variables: serializeVariables(stack, symbolMap),
      resources:
        resources.length === 0
          ? undefined
          : Object.fromEntries(resources.map((resource) => serializeResource(resource, symbolMap))),
      outputs: serializeOutputs(stack, symbolMap),
    }),
  };
}

/**
 * Serializes a stack or a nonempty array of stacks into a JSON-compatible
 * {@link SerializationDocument} with one `infras` entry per stack.
 *
 * The document preserves declarations and symbolic expressions for rendering
 * or restoration. Pass `JSON.stringify(serialize(stack))` to {@link deserialize}
 * to reconstruct the authored stack; this does not deploy any resources.
 */
export function serialize(input: Stack | readonly Stack[]): SerializationDocument {
  const stacks = Array.isArray(input) ? input : [input];
  if (stacks.length === 0) {
    throw new Error("Cannot serialize an empty stack collection.");
  }

  return {
    infras: stacks.map((stack) => {
      const resources = collectAllResources(stack);
      const symbolMap = createSymbolMap(resources, stack);
      return serializeFile(stack, resources, symbolMap);
    }),
  };
}
